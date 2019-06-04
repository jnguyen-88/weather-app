const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express
const pubDirPath =  path.join(__dirname, '../public');
const helpDirPath =  path.join(__dirname, '../public/help.html');
const aboutDirPath =  path.join(__dirname, '../public/about.html');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directories to serve
app.use(express.static(pubDirPath));
app.use(express.static(helpDirPath));
app.use(express.static(aboutDirPath));

// Setup hbs and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather application",
        name: "Justin Nguyen"
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: "Please provide a search term"
        })
    } else {
    console.log(req.query)
    }
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "This is the about page",
        name: "Justin Nguyen"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "Justin Nguyen",
        helpText: "This is some helpful text"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: "Please provide an address"
        })
    } else {
        // { uses es6 Destructuring - takes an object and extracts its values via properties }
        geocode(req.query.address, (err, { latitude, longitude, place_name } = {} ) => {
            if(err){
                res.send({err: err})
            } else {
                forecast(latitude, longitude, (err, forecastData) => {
                    if(err){
                        res.send(console.log("bye"))
                    } else {
                        res.send({
                            forecast: forecastData,
                            address: req.query.address,
                        })
                    }
                })
            }
        })
    }
});

app.get('/help/*', (req, res) => {
    res.send("This help page does not exist")
})

app.get('*', (req, res) => {
    res.render("404", {
        title: "404 error -- page not found",
        name: "Justin Nguyen",
        err: "page cannot be found try again"
    })
})

app.listen(port, () => {
    console.log("App is running")
});

