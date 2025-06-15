const {usermodle} = require('../models/usermodle');
const {otpModle} = require("../models/otpHandler")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")


async function sendEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'workfreemail12333@gmail.com',
      pass: 'ftwe kbdd ahdk xxrs' // use Gmail app password
    }
  });

  await transporter.sendMail({
    from: 'workfreemail12333@gmail.com',
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  });
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


async function handleregisterrequest (req,res){

  console.log("Register API hit", req.body)

    const {name , email , password , phonenumber} = req.body;

    const hashedpassword = await usermodle.hashpassword(password);

     const incaptain_alredy_exist = await usermodle.findOne({email});

    if (incaptain_alredy_exist) {
        return res.status(409).json({msg : 'captain alredy exist'})
    }

    const user = await usermodle.create({
        name : name,
        email : email,
        password : hashedpassword,
       
    })

    console.log(user);



    
    
    res.status(201).json({user : user, otp:"otp has been send"});

}


async function handleloginrequest(req,res) {
  const {email , password} = req.body;

  const user = await usermodle.findOne({email : email});
  console.log(user);

  if (!user) {
     return res.json({mssg : "user does not exist"});
  }



  const checkpass = await user.comparepasswords(password);

  if (checkpass == false) {
    return res.json({mssg : "password does not exist"});
  }

  const token = user.generateAuthtoken();
  const otp = generateOTP();
  await sendEmail(email, otp);

  const otpSys = await otpModle.create({
    email : email,
    otp : otp,
  })
  console.log(otpSys);

  res.cookie('token' , token)
  res.status(201).json({token : token,user : user});
  
}


async function handlelogoutRequest(req,res) {

  const token = req.cookies.token || req.headers.authourization.split(" ")[1];

  res.clearCookie('token');
  res.status(200).json({message:"user has logout"})
  
}


async function handleprofileRequest(req,res) {
    const token = req.cookies.token || req.headers.authourization?.split(" ")[1];
    const decoded = jwt.verify(token , "adityapurohit2525");

    const user = await usermodle.findOne({_id : decoded})
    console.log(user);

    res.json({user : user});//sending it this way was an isssuse whwen recalling the data
    

}


async function VerifyEmail(req,res) {

  const {email , otp} = req.body;

  const checkemail = await otpModle.findOne({email : email , otp : otp})
  if(!checkemail){
    return res.status(400).json({error :"OTP didnt matched"})
  }
  console.log("OTP matched successfully", checkemail);
  res.status(200).json({success : "otp found" , creds : checkemail})

}





module.exports = {handleregisterrequest,handleloginrequest,handlelogoutRequest,handleprofileRequest,VerifyEmail}