const {usermodle} = require('../models/usermodle');
const jwt = require("jsonwebtoken")




async function handleregisterrequest(req, res) {
    try {
        console.log("Register/Login API hit", req.body);

        const { phonenumber } = req.body;

        if (!phonenumber || phonenumber.length !== 10) {
            return res.status(400).json({ msg: "Invalid phone number" });
        }

        let user = await usermodle.findOne({ phonenumber });

        if (user) {
            //  Login flow
            const token = user.generateAuthtoken();
            return res.status(200).json({
                msg: "User already exists. Logged in.",
                user,
                token,
            });
        }

        //  Register flow
        user = await usermodle.create({ phonenumber });

        const token = user.generateAuthtoken();
        console.log(user)
        res.status(201).json({
            msg: "New user created",
            user,
            token,
        });

    } catch (error) {
        console.error("Error in handleregisterrequest:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}



async function handleloginrequest(req,res) {
  const {phonenumber} = req.body;

  const user = await usermodle.findOne({phonenumber : phonenumber});
  console.log(user);

  if (!user) {
     return res.json({mssg : "user does not exist"});
  }

  const token = user.generateAuthtoken();

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





module.exports = {handleregisterrequest,handleloginrequest,handlelogoutRequest,handleprofileRequest}