const express = require("express");
const bodyParser = require ('body-parser')
const userRoutes = require('./routes/user.route')
const cors = require("cors")
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/user', userRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`listning on ${PORT}`);
});
