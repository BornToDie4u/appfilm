const express = require('express')
const router = express.Router();

const {handleregisterrequest,VerifyEmail,handleloginrequest,handlelogoutRequest,handleprofileRequest} = require('../controller/usercontroller')
const {checkauth} = require('../middlewares/usermiddleware')


router.post('/register' , handleregisterrequest);

router.post('/login' , handleloginrequest);

router.get("/logout" , handlelogoutRequest);

router.get("/profile",handleprofileRequest)

router .post ("/verifyEmail" ,VerifyEmail )
module.exports = router


