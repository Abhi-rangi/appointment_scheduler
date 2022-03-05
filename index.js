// import sqlite3 from "sqlite3";
import express from "express";
import { bookAppointment ,Accept,Reject,Reschedule,GetHNI} from "./database.js";
var app = express();
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
let appno = 1;
const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
    console.log("http://localhost:"+HTTP_PORT+"/");
});
app.get("/", (req,res) => {
    res.json({"message":"Ok"})
});
app.post("/bookAppointment",async(req,res)=>{
    req.body.appno = appno;
    appno++;
    let book = await bookAppointment(req.body) ;
    res.send(book);
});
app.post("/accept",async(req,res)=>{
    let accept = await Accept(req.body) ;
    res.send(accept);
});
app.post("/reject",async(req,res)=>{
    let reject = await Reject(req.body) ;
    res.send(reject);
});
app.post("/reschedule",async(req,res)=>{
    let reschedule = await Reschedule(req.body) ;
    res.send(reschedule);
});
app.get('/getHNI',async(req,res)=>{
    let getHNI = await GetHNI() ;
    res.send(getHNI);
});



// app.get("/HNI/accept",(req,res)=>{
//     const result = book
//     res.send(response);
// });