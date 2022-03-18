const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res)=>{
  res.status(200).send(res.locals.user._id)
})

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listning on ${PORT}`);
});
