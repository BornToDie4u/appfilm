const {usermodle} = require('../models/usermodle');
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

    const {name , email , password} = req.body;

    const hashedpassword = await usermodle.hashpassword(password);

     const incaptain_alredy_exist = await usermodle.findOne({email});

    if (incaptain_alredy_exist) {
        return res.status(200).json({msg : 'captain alredy exist'})
    }

    const user = await usermodle.create({
        name : name,
        email : email,
        password : hashedpassword,
    })

    console.log(user);


    const otp = generateOTP();

    await sendEmail(email, otp);
    
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

  res.cookie('token' , token)
  res.json({token : token,user : user});
  
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





module.exports = {handleregisterrequest,handleloginrequest,handlelogoutRequest,handleprofileRequest}