const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use('/', express.static('client/src/assets'));
app.use('/:city', express.static('client/src/assets'));
app.use('/', express.static('client/dist'));
app.use('/:city', express.static('client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:city', (req, res) => {
  const city = req.params.city;

  console.log(city);
});

app.listen(PORT, () => {console.log(`Listening on ${PORT}!`)})