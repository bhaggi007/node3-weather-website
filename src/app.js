const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT ||  3000;
//Define path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');



//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    // res.send(`<h1>Hello from express!</h1>`);
    res.render('index', {
        title: "Weather",
        name: "Bhagawati Kishore"
    });
});

app.get('/help', (req, res) => {
    // res.send([{
    //     name: "Bhagawati"
    // },{
    //     name: "Abc"
    // }]);
    res.render('help', {
        title: "Help!!!!!!!!!!!",
        name: "Bhagawati Kishore",
        message: "this provides help information for the weather app"
    })
});

app.get('/about', (req, res) => {
    //res.send(`<h1>About page</h1>`);
    res.render('about', {
        title: "About page",
        name: "Bhagawati Kishore"
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "An address must be provided!"
        })
    }
    geoCode(req.query.address,(err,{longitude,latitude,location} = {}) => {
        if(err) {
            return res.send({
                error: err
            });
        }
        forecast(longitude,latitude,(err,forecastData) => {
            if(err) {
                return res.send({
                    error:err
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });

        });
    });

    
});


app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }
    console.log(req.query.search);
    res.send({ 
        products: []
    })

});

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});