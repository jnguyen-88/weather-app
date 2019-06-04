// JS Browser side

const weatherForm = document.querySelector('form');
const search = document.querySelector('input[type=text]');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    const url = `/weather?address=${location}`;

    fetch(url).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                console.log(data.err)
            } else {
                messageOne.textContent = `Weather in ${data.address} is ${data.forecast}`; // this data comes from src/app.js
            }
        })
    })
})