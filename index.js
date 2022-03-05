// import sqlite3 from "sqlite3";
import express from "express";
import { bookAppointment } from "./database";
var app = express();
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
    console.log("http://localhost:"+HTTP_PORT+"/");
});
app.get("/", (req,res) => {
    res.json({"message":"Ok"})
});
app.post("/bookAppointment",(req,res)=>{
    res.send(await bookAppointment(req.body));
});
// app.get("/HNI/accept",(req,res)=>{
//     const result = book
//     res.send(response);
// });