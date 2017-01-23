import express = require("express");

export interface JwtRequest extends express.Request {
    decoded:any;
}
