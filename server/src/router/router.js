const express = require("express");
const { createUser, getAllUsers, getSingleData, updateUser, deleteUser, searchUser, userPage } = require("../controllers/users");
const upload = require("../multer/multer");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("welcome to router")
})

router.post("/createUser",upload,createUser);

router.get("/getuser",getAllUsers);

router.get("/getuser/:userid",getSingleData);

router.put("/updateuser/:userid",upload,updateUser);

router.delete("/deleteuser/:userid",deleteUser);

//search user
router.get("/searchuser",searchUser);

//pagination route
router.get("/userpage",userPage);

module.exports = router;