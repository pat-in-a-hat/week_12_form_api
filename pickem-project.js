//Montana Code School Week 12 Project
//Author: Patrick Warner
//10/22

let formValidator = () => {
    let food = document.getElementById('food-input')//food submission text box
    let msg = document.getElementById('msg')//alert message that posts
    let time = document.getElementById('time')//time input
    let volume = document.getElementById('volume')//selector to list how much you ate in cups
    let notes = document.getElementById('notes')//extra text box for additional notes
    if(food.value === '') {
        msg.className = "alert alert-danger text-center"
        msg.textContent = 'You must list what you ate!'
        console.log('food text input failure')
        return false
    } else {
        console.log('food submission success')
        msg.className = 'mb-3 text-center'
        msg.textContent = ''
        return true
    }
}

//get all the data
// GET ALL DATA:
const getAllFoods = async () => {

    const url = 'https://634f6de2df22c2af7b512858.mockapi.io/pickem/foodlist';
     
    try {
        const response = await fetch(url);
        const foods = await response.json()
        console.log('got all the data from API'); 
        tableBuilder(foods) //pass the retrieved data into our table builder function
     } catch (error) {
        console.log(error)
     }
}
getAllFoods();

//sending to API (POST)
const createFood = async (foodinput, volumeinput, timeinput, notesinput) => {

    const  url = 'https://634f6de2df22c2af7b512858.mockapi.io/pickem/foodlist';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            food: foodinput,
            volume: volumeinput,
            time: timeinput,
            notes: notesinput
        }),
        headers: {
         'Content-type': 'application/json; charset=UTF-8',
        },
      });      
      const food = await response.json();
      console.log(food + 'created')
    } catch (error) {
      return error;
    }
  }

//delete data in API
const deleteFood = async (data_id) => {

    const url = `https://634f6de2df22c2af7b512858.mockapi.io/pickem/foodlist/${data_id}`;
    console.log(url)

    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });   
      const food = await response.json();
      console.log(food + 'deleted')
      /*.then (() => {
        getAllFoods();
      })*/
    } catch (error) {
      return error;
    }
    document.getElementById('table-body').replaceChildren();
    getAllFoods()
  }

//get a piece of data to then update
const getFood = async (data_id) => {

    const url = `https://634f6de2df22c2af7b512858.mockapi.io/pickem/foodlist/${data_id}`;
     
    try {
        const response = await fetch(url);
        const food = await response.json()
        build
     } catch (error) {
        console.log(error)
     }
  }


//update data in API (PUT)
const editFood = async (data_id) => {

    const url = `https://634f6de2df22c2af7b512858.mockapi.io/pickem/foodlist/${data_id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            food: foodinput,
            volume: volumeinput,
            time: timeinput,
            notes: notesinput,
        }),
        headers: {
         'Content-type': 'application/json; charset=UTF-8',
        },
      });      
      const food = await response.json();
      console.log(food + 'updated')
    } catch (error) {
      return error;
    }
  }

function tableBuilder(list) {
    //console.log(list)
    for (let i of list){
        let tr = document.createElement('tr')
        let th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = list.indexOf(i)

        let td_food = document.createElement('td')
        let td_volume = document.createElement('td')
        let td_time = document.createElement('td')
        let td_notes = document.createElement('td')

        let td_edit_btn = document.createElement('td')
        let td_delete_btn = document.createElement('td')

        let edit_btn = document.createElement('button')
        let delete_btn = document.createElement('button')
        edit_btn.setAttribute('type', 'button')
        edit_btn.setAttribute('data-bs-toggle', 'modal')
        edit_btn.setAttribute('data-bs-target', '#editModal')
        //edit_btn.addEventListener('click', () => modalTime(i.id))
        edit_btn.textContent = 'Edit'
        edit_btn.className = 'btn btn-success'

        delete_btn.setAttribute('type', 'button')
        delete_btn.addEventListener('click', () => deleteFood(i.id))
        delete_btn.textContent = 'Delete'
        delete_btn.className = 'btn btn-secondary'

        td_food.textContent = i.food
        td_volume.textContent = i.volume + ' cups'
        td_time.textContent = i.time
        td_notes.textContent = i.notes

        td_edit_btn.appendChild(edit_btn)
        td_delete_btn.appendChild(delete_btn)

        tr.appendChild(th)
        tr.appendChild(td_food)
        tr.appendChild(td_volume)
        tr.appendChild(td_time)
        tr.appendChild(td_notes)

        tr.appendChild(td_edit_btn)
        tr.appendChild(td_delete_btn)

        let body = document.getElementById('table-body')
        body.appendChild(tr)
    }
}

function modalTime(){
    let bigdiv = document.createElement('div')
    bigdiv.className = 'modal fade'
    bigdiv.setAttribute('id', 'editModal')
    bigdiv.setAttribute('tabindex', '-1')
    bigdiv.setAttribute('aria-labelledby', 'editModalLabel')
    bigdiv.setAttribute('aria-hidden', 'true')
    document.querySelector('body').appendChild(bigdiv)

    let nextdiv = document.createElement('div')
    nextdiv.className = 'modal-dialog'
    bigdiv.appendChild(nextdiv)

    let contentdiv = document.createElement('div')
    contentdiv.className = 'modal-content'
    nextdiv.appendChild(contentdiv)

    let headerdiv = document.createElement('div')
    headerdiv.className = 'modal-header'
    contentdiv.appendChild(headerdiv)

    let modalh1 = document.createElement('h1')
    modalh1.className = 'modal-title fs-5'
    modalh1.textContent = 'Edit entry'
    let modalclosebtn = document.createElement('button')
    modalclosebtn.setAttribute('type', 'button')
    modalclosebtn.setAttribute('data-bs-dismiss', 'modal')
    modalclosebtn.setAttribute('aria-label', 'Close')
    modalclosebtn.className = 'btn-close'
    headerdiv.appendChild(modalh1)
    headerdiv.appendChild(modalclosebtn)

    let bodydiv = document.createElement('div')
    bodydiv.className = 'modal-body'
    contentdiv.appendChild(bodydiv)

    let foodLabel = document.createElement('label')
    foodLabel.setAttribute('for', 'foodInput')
    foodLabel.className = 'form-label'
    foodLabel.textContent = 'Food'
    let foodText = document.createElement('input')
    foodText.setAttribute('type','text')
    foodText.className = 'form-control'
    bodydiv.appendChild(foodLabel)
    bodydiv.appendChild(foodText)


    //add in the form inputs here

    let footerdiv = document.createElement('div')
    footerdiv.className = 'modal-footer'
    contentdiv.appendChild(footerdiv)

    let closebtn = document.createElement('button')
    closebtn.setAttribute('type', 'button')
    closebtn.setAttribute('data-bs-dismiss', 'modal')
    closebtn.className = 'btn btn-secondary'
    closebtn.textContent = 'Close'
    footerdiv.appendChild(closebtn)

    let savechangesbtn =  document.createElement('button')
    savechangesbtn.setAttribute('type', 'button')
    savechangesbtn.className = 'btn btn-success'
    savechangesbtn.textContent = 'Save changes'
    footerdiv.appendChild(savechangesbtn)

    const myModal = document.getElementById('edit-modal')
    const myInput = document.getElementById('')

}
modalTime();

function submitButton(){
    let btn = document.getElementById('submit')
    let food = document.getElementById('food-input')//food submission text box
    let time = document.getElementById('time')//time input
    let volume = document.getElementById('volume')//selector to list how much you ate in cups
    let notes = document.getElementById('notes')//extra text box for additional notes
    btn.addEventListener('click', () => {
        createFood(food.value, volume.value, time.value, notes.value)
        /*if (formValidator() === true){
            createFood(food.value, volume.value, time.value, notes.value);
        } else {
            formValidator()
        }*/
    })
}
submitButton();


/*document.querySelector('btn-secondary').addEventListener('click', () => {
    deleteFood(this.id.slice(2))
})

/*form.addEventListener('submit', (btn) => {
    btn.preventDefault()
    formValidator()
})*/


//need to build table that prints from API
//need to build edit and delete buttons