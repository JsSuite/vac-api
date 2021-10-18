const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const vacCentres = {
  "Radin Mas Community Club": {
    nurseCapacity: 10,
    currentSlots: [],
  },
  "Buona Vista Community Club": {
    nurseCapacity: 15,
    currentSlots: [],
  },
  "Potong Pasir Community Club": {
    nurseCapacity: 20,
    currentSlots: [],
  },
  "Raffles City Convention Centre": {
    nurseCapacity: 25,
    currentSlots: [],
  },
};

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const hasId = req.query.hasOwnProperty("id");
  if (!hasId) {
    return res.json(vacCentres);
  }
  res.json(vacCentres[req.query.id]);
});

app.post("/", (req, res) => {
  const id = req.query.id;
  if (vacCentres[id].nurseCapacity >= vacCentres[id].currentSlots.length) {
    res.status(500).json();
  }

  vacCentres[id].currentSlots.push(req.body);
  console.log(vacCentres);
  res.json();
});

app.put("/", (req, res) => {
  const fromId = req.query.fromId;
  const toId = req.query.toId;

  if (toId === fromId) {
    const index = vacCentres[id].currentSlots.findIndex(
      (v) => v.registerBy === req.body.registerBy
    );
    vacCentres[id].currentSlots[index] = req.body;
    console.log(vacCentres);
    res.json();
  } else {
    vacCentres[fromId].currentSlots = vacCentres[fromId].currentSlots.filter(
      (v) => v.registerBy === req.body.username
    );
    vacCentres[toId].currentSlots.push(req.body);
    console.log(vacCentres);
    res.json();
  }
});

app.delete("/", (req, res) => {
  const id = req.query.id;

  vacCentres[id].currentSlots = vacCentres[id].currentSlots.filter(
    (v) => v.registerBy !== req.query.registerBy
  );
  console.log(vacCentres);
  res.json();
});

app.listen(5000, () => {
  console.log("Server is started.");
});
