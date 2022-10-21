//Montana Code School Week 12 Project
//Author: Patrick Warner
//10/22

let form = document.getElementById('form')
let food = document.getElementById('food-input')//food submission text box
let time = document.getElementById('time')//time input
let volume = document.getElementById('volume')//selector to list how much you ate in cups
let notes = document.getElementById('notes')//extra text box for additional notes
let msg = document.getElementById('msg')//alert message that posts 
let btn = document.getElementById('submit')

let data = {

}

let formValidator = () => {
    if(food.value === '') {
        msg.className = "alert alert-danger text-center"
        msg.textContent = 'You must list what you ate!'
        console.log('food text input failure')
    } else {
        console.log('food submission success')
        msg.className = 'mb-3 text-center'
        msg.textContent = ''

    }
}

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
      console.log(food)
    } catch (error) {
      return error;
    }
  }

//get all the data
// GET ALL DATA:
const getAllFoods = async () => {

    const url = 'https://634f6de2df22c2af7b512858.mockapi.io/pickem/foodlist';
     
    try {
        const response = await fetch(url);
        const foods = await response.json()
        console.log(foods); // can pass or return data to another function
        //tableBuilder(foods)
     } catch (error) {
        console.log(error)
     }
}


//update data in API
const updateTodo = async (id) => {

    const url = `https://634f6de2df22c2af7b512858.mockapi.io/pickem/foodlist/${id}`;

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
      const todo = await response.json();
      console.log(todo)
    } catch (error) {
      return error;
    }
  }

function tableBuilder(list) {
    console.log(list)
    /*for (let i of itemsList){
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.textContent = i.food
        let body = doucment.getElementById('table-body')
        body.appendChild(tr)
        body.appendChild(td)
    }*/
}

btn.addEventListener('click', () => {
    createFood(food.value, volume.value, time.value, notes.value);
})

form.addEventListener('submit', (btn) => {
    btn.preventDefault()
    formValidator()
})

tableBuilder();


//need to build table that prints from API
//need to build edit and delete buttons