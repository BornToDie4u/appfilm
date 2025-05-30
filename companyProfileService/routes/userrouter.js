const express = require('express')
const router = express.Router();

const {setprofile,getprofile,updateProfile,uploadProfilePicture} = require('../controller/usercontroller')
const {user_auth} = require('../middlewares/usermiddleware')
const upload = require("../middlewares/multer.upload"); 
const uploadArchive = require("../middlewares/multer.upload.archive")

router.post('/setprofile', user_auth,setprofile )

router.get("/getprofile" ,user_auth, getprofile);

router.put("/update" , user_auth , updateProfile)

router.post("/uploadProfilePicture",user_auth , upload.single("profilePic") , uploadProfilePicture )

//router.post("/uploadArchive",user_auth,uploadArchive.array("archivePics",10),uploadArchiveImages)

//router.get("/get_profesionalProfile",user_auth,get_profesionalProfile)

module.exports = router


