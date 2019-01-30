const express = require('express');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// Set the view engine to be HBS with views in the `/views` folder
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Everything inside `/public` is accessible
app.use(express.static(path.join(__dirname, 'public')));


// Route: GET /
app.get('/', (req, res, next) => {
  res.render('index');
})

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => { // beers is an array of objects
      res.render('beers', {
        beers: beers
      })
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => { // beers is an array with 1 object (yes,it's stupid)
      console.log('DEBUG beers', beers)
      res.render('random-beer', {
        beer: beers[0]
      });
    })
    .catch(error => {
      console.log(error)
    })
})



app.listen(3000);
