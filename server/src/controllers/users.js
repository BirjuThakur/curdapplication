const User = require("../modals/userSchema");

const createUser = async(req,res) =>{
 try {
    const {name,email,mobileNo} = req.body;
    //for image uploading
    const uploadFile = req.file;
    const profileImage = uploadFile ? uploadFile.filename : "";
    const userData = new User({
        name,email,mobileNo,profileImage  
    });
    const user = await userData.save();
    res.status(201).send({
        success:true,
        message:"user created successfully",
        user
    })
 } catch (error) {
    res.status(401).send({
        success:false,
        message:"user not created",
        error
    })
 }
}

const getAllUsers = async(req,res)=>{
    try {
        const userData = await User.find();
        res.status(200).send({
            success:true,
            message:"user getting",
            userData
        })
    } catch (error) {
        res.status(401).send({
            success:false,
            message:"user not getting",
            error
        })  
    }
}

const getSingleData = async(req,res) =>{
try {
    const {userid} = req.params;
    const userData = await User.findById(userid);
    res.status(200).send({
        success:true,
        message:"user getting",
        userData
    })  
} catch (error) {
    res.status(401).send({
        success:false,
        message:"user not getting",
        error
    })   
}
};

const updateUser = async(req,res)=>{
    try {
        const {userid} = req.params;
        let userData = await User.findById(userid);
        //for image updating 
        const data ={
            name:req.body.name || userData.name,
            email:req.body.email || userData.email,
            mobileNo: req.body.mobileNo || userData.mobileNo,
            profileImage: req.file ? req.file.filename : null || userData.profileImage
        }
        const updateUserData = await User.findByIdAndUpdate(userid,data,{new:true});
            res.status(200).send({
                success:true,
                message:"user updating successfullly",
                updateUserData
            }) 
    } catch (error) {
        res.status(401).send({
            success:false,
            message:"user not updating",
            error
        })   
    }
}

const deleteUser = async (req,res) =>{
    try {
        const {userid} = req.params;
        const deleteUserData = await User.findByIdAndDelete(userid);
        res.status(200).send({
            success:true,
            message:"user deleting successfully",
            deleteUserData
        })  
    } catch (error) {
        res.status(401).send({
            success:false,
            message:"user not deleting",
            error
        })   
    }
}

// search user using name 
const searchUser = async(req,res) =>{
try {
    const {name} = req.query;
    // Use a regular expression to perform case-insensitive search by name
    const regx = new RegExp(name, "i");
    // Find users whose name matches the search query
    const searchData = await User.find({name:regx});
    res.status(200).send({
        success:true,
        message:"getting user who matches",
        searchData
    }) 
} catch (error) {
    res.status(401).send({
        success:false,
        message:"error getting in search",
        error
    })  
}
}

//pagination route
const userPage = async(req,res)=>{
    const {page=1,limit=4} = req.query;
    const skip = (page -1) * limit;
    try {
       const totalRecords = await User.countDocuments();
       const totalPages = Math.ceil(totalRecords/limit);
       const newUsersData = await User.find().skip(skip).limit(parseInt(limit));
       res.status(201).send({
        success:true,
        message:"getting pages",
        newUsersData,
        currentPage:parseInt(page),
        totalPages,
        totalRecords
    }) 
    } catch (error) {
        res.status(401).send({
            success:false,
            message:"error getting in pagination",
            error
        })  
    }
}

module.exports = {createUser,getAllUsers,getSingleData,updateUser,deleteUser,searchUser,userPage};