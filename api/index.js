const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const attachPublicRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
attachPublicRoutes(app);

// app.use(express.static(__dirname + '/client/dist'));
// app.use('/assets', express.static(__dirname + '/client/src/assets'));

app.listen(port, () => console.log(`Listening on ${port}!`)) 