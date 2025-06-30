"use strict";

const express = require("express");
const app = express();


// 뷰 엔진 설정
app.set("views", "./src/views");
app.set("view engine", "ejs");

// 라우터 설정
const home = require("./src/routes/home");
app.use("/", home);

app.use(express.static(`${__dirname}/src/public`));
// 앱 모듈 내보내기
module.exports = app;
