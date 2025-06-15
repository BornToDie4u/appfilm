const express = require('express')
const router = express.Router();

const {handleregisterrequest,handleOtpRequest,handleloginrequest,handlelogoutRequest,handleprofileRequest} = require('../controller/usercontroller')
const {checkauth} = require('../middlewares/usermiddleware')


router.post('/register' , handleregisterrequest);

router.post('/login' , handleloginrequest);

router.get("/logout" , handlelogoutRequest);

router.get("/profile",handleprofileRequest)
module.exports = router


