const mongoose = require("mongoose");

const URI = process.env.DBCONNECTION;

const DBconnection = () =>{
    mongoose.connect(URI).then(()=>console.log("connection successfully"))
    .catch(()=>console.log("connection dismiss"))
}

module.exports = DBconnection;