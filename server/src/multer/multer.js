const multer = require("multer");

const Storage = multer.diskStorage({
    destination:"uploads/images",
    filename:(req,file,cb)=>{
     cb(null,file.originalname)
    }
})

//for storing images
const upload = multer({
    storage:Storage
}).single("profile");

module.exports = upload;