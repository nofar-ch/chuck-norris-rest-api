const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = 4000;
const URL_RANDOM_FACT = "https://api.chucknorris.io/jokes/random?";
const URL_CATEGORIES = "https://api.chucknorris.io/jokes/categories"
const URL_SEARCH = "https://api.chucknorris.io/jokes/search?query="

// tell the request to automatically parse the response's body as JSON if there's no error
let options = {json: true}; 

//GET METHODS
app.get("/categories", (req, resp) => {
    request(URL_CATEGORIES, options, (error, res, body) => {
        if (error) {
            throw error;
        }
        if (!error && res.statusCode == 200) {
           resp.send(res.body)
        }
    });
});

// name & categories
app.get("/randomfact/:name/:cat", (req, resp) =>{
    const cat = req.params.cat;
    const name = req.params.name;
    request(URL_RANDOM_FACT + `name=${name}&category=${cat}`, options, (error, res, body) => {
        if (error) {
            throw error;
        };
        if (!error && res.statusCode == 200) {
            resp.send(res.body)
        };
    })
});

// just name
app.get("/randomfactname/:name", (req, resp) =>{
    const name = req.params.name;
    request(URL_RANDOM_FACT + `name=${name}`, options, (error, res, body) => {
        if (error) {
            throw error;
        };
        if (!error && res.statusCode == 200) {
            resp.send(res.body)
        };
    })
});

// just categories
app.get("/randomfactcat/:cat", (req, resp) =>{
    const cat = req.params.cat;
    request(URL_RANDOM_FACT + `category=${cat}`, options, (error, res, body) => {
        if (error) {
            throw error;
        };
        if (!error && res.statusCode == 200) {
            resp.send(res.body)
        };
    })
});

// search
app.get("/searchFact/:query", (req, resp) =>{
    const query = req.params.query;
    request(URL_SEARCH + query, options, (error, res, body) => {
        if (error) {
            throw error;
        };
        if (!error && res.statusCode == 200) {
            resp.send(res.body)
        };
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});