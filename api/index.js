const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const attachPublicRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(urlencoded({extended: true}));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
attachPublicRoutes(app);

app.listen(port, () => console.log(`Listening on ${port}!`)) 