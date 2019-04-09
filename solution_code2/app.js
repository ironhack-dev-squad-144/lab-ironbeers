
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// Configure HBS and the public folder
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


// Route http://localhost:3000
app.get('/', (req, res, next) => {
  res.render('index');
});

// Route http://localhost:3000/beers
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(punkBeers => {
      let data = {
        x: 42, // Give to the view a variable `x` that is 42
        beers: punkBeers
      }
      console.log("DEBUG punkBeers", punkBeers)
      res.render('all-beers', data) // Render "/views/all-beers.hbs" 
    })
    .catch(error => {
      console.log("DEBUG error", error)
    })
});

// Route http://localhost:3000/random-beer
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log("DEBUG beers", beers)
    // Render "views/one-beer.hbs" and give a variable "beer" that is beers[0]
    res.render('one-beer', {
      beer: beers[0]
    })
  })
  .catch(error => {
    console.log(error)
  })
});



// Launch the server on port 3000
app.listen(3000, () => {
  console.log("App running on http://localhost:3000")
});
