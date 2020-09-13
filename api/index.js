const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const attachPublicRoutes = require("./routes");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 4001;

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
attachPublicRoutes(app);

app.use((err, req, res, next) => {
  const { statusCode, msg } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    msg,
  });
});

app.listen(port, () => console.log(`Listening on ${port}!`));
