const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var multer  = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');

//var fs = require("fs");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json')

//var urlencodedParser = bodyParser.urlencoded({ extended: false });
//rotas para acesso!
const indexRouter = require("./routes/index");
const promoterRouter = require("./routes/promoters");
const adminRouter = require("./routes/admins");
const eventRouter = require("./routes/events");
const locationRouter = require("./routes/locations");
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const { log } = require("console");


mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true,useUnifiedTopology: true })
  .then(()=> console.log(' connected to DB!'))
  .catch(()=> console.log(' error connecting to DB!'))

const app = express();


var storage = multer.diskStorage({
  /*destination: function(req, file, cb) {
    cb(null, 'tmp/');
  },*/
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

/*app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());*/

// view engine setup
//pasta views
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(upload.single('file'));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());


app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//pasta public
//app.use(express.static(path.join(__dirname, "public"))); //é preciso?
//pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRouter);

app.use("/events", eventRouter);
app.use("/locations", locationRouter);
app.use("/promoters", promoterRouter);
app.use("/admins", adminRouter);
app.use("/users", usersRouter);

app.use("/", indexRouter);

//app.use('/users', usersRouter);
//app.use('/criar', criarRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
