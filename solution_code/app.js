const express = require("express");
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

// Route "/" (http://localhost:3000)
app.get("/", (req, res, next) => {
  res.render("index"); // Render /views/index.hbs
});

// Route "/beers" (http://localhost:3000/beers)
app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // Render /views/beers-list.hbs
      res.render("beers-list", {
        beers: beersFromApi
      });
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});


// Route "/random-beer" (http://localhost:3000/random-beer)
app.get("/random-beer", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      // beersFromApi is an array with 1 element (I know it's weird)
      res.render("random-beer", {
        beer: beersFromApi[0]
      });
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});

app.listen(3000, () => {
  console.log("App running on http://localhost:3000");
});
