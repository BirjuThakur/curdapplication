require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000 ;
const cors = require("cors");
const DBconnection = require("./db/connection");
const router = require("./router/router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users",router);

//for multer file getting 
app.use("/uploads/images",express.static(path.join(__dirname,"../uploads/images")));
console.log(path.join(__dirname,"../uploads/images"))
app.get("/",(req,res)=>{
    res.send("hello birju")
})

app.listen(port,()=>{
    DBconnection();
    console.log(`server is running on port ${port}`)
})