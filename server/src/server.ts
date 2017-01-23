"use strict";
import express = require("express");
import cors = require("cors");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import db = require("./common/db");
import TestCtrl  from "./routes/TestCtrl";

db.init();
var app = express();
app.listen(3002, 'localhost', function () {
    console.log("Server is running at port 3002");
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 *  Public Routes:
 * */

TestCtrl.routes(app, "/api/test");

/**
 *  Internal Routes
 * */
