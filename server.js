if (process.env.NODE_ENV !== "production") {
  //for deployment
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts"); // to set the express
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const indexRouter = require("./routes/index"); //requiring the  index.js and importing it
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

app.set("view engine", "ejs"); // to set the view engine
app.set("views", __dirname + "/views"); //to view the views set them and create a folder called views
app.set("layout", "layouts/layout"); //for express layout file, every single file for header a footer
app.use(expressLayouts); //to use the express
app.use(methodOverride("_method"));
app.use(express.static("public")); //to list  all the public files
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); //connecting to database
const db = mongoose.connection;
db.on("error", (error) => console.error(error)); //to check the errors
db.once("open", () => console.log("Connected to Mongoose")); //to check if it is connected properly

app.use("/", indexRouter); //to use the index route
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000);
