const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
const publiDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publiDirectoryPath));
const viewsPath = path.join(__dirname, "../public/tempelates/views");
app.set("views", viewsPath);
const partialsPath = path.join(__dirname, "../public/tempelates/partials");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mihir",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "mihir",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Mihirr",
    title: "help",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    name: "Mihir",
    errorMessage: "Help Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mihir",
    errorMessage: "Page Not Found",
  });
});
app.listen(port, () => {
  console.log("Server is up n port " + port);
});
