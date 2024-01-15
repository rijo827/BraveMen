const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const UserRoutes = require("./routes/UserRoutes");
const AdminRouter = require("./routes/AdminRoutes");
const nocache = require('nocache');
const { v4: uuidv4 } = require('uuid');
const env = require('dotenv');
// const logger=require('morgan')
const cookieParser= require("cookie-parser")
const path = require('path');
const app = express();
const logger= require('morgan')



env.config({ path: './.env' });
app.set('view engine', 'ejs');
app.use(cookieParser());
// app.use(logger("combined"))
app.use(express.json())

app.use(nocache());




app.use(session({
  secret: uuidv4(),
  resave: true,
  saveUninitialized: false,
}));

app.use(express.static(__dirname + "/public/Assets"));
// app.set('views', [
//   path.join(__dirname, 'views', 'UserView'),
//   path.join(__dirname, 'views', 'AdminView')
// ]);

app.use("/", UserRoutes);
app.use("/admin", AdminRouter);

mongoose.set('strictQuery', false);

const connectToDB = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("Database connected", mongoose.connection.host);
  } catch (err) {
    console.log("Database connection error", err);
    process.exit(1);
  }
};

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connectToDB();
  console.log(`It's Working in http://localhost:${port}`);
});
