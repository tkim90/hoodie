const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static(__dirname + '/client/dist'));
app.use('/assets', express.static(__dirname + '/client/src/assets'));

app.post('/api/saveMarker', (req, res) => {
  console.log(`geoJSON: ${JSON.stringify(req.body)}`);
})

app.listen(PORT, () => {console.log(`Listening on ${PORT}!`)})