// const url = 'http://localhost:3000/weather?address=!';

// fetch(url).then((res) => {
//     res.json().then((data) => {
//         if(data.error) {
//             console.log(data.err)
//         } else {
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input[type=text]');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    const url = `http://localhost:3000/weather?address=${location}`;

    fetch(url).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                console.log(data.err)
            } else {
                messageOne.textContent = `The weather in ${data.address} is and the temperature is ${data.forecast}`;
                console.log(data)
            }
        })
    })
})