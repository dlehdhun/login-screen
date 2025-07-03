"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// 라우터 설정
const home = require("./src/routes/home");

// 뷰 엔진 설정
app.set("views", "./src/views");
app.set("view engine", "ejs");

// 정적 파일 및 body-parser 미들웨어 먼저 등록
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended : true }));


app.use("/", home);

// 앱 모듈 내보내기
module.exports = app;
