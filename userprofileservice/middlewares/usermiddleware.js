const jwt = require("jsonwebtoken");
const axios = require("axios");

async function user_auth(req, res, next) {
  try {
   const token = req.cookies.token || req.headers?.authorization.split(' ')[1] ;
    if (!token) {
      return res.status(401).json({ err: "token undefined" });
    }

    const decoded = jwt.verify(token, "adityapurohit2525");
    console.log(decoded);

    // Try getting user from service 1
    let user;
    try {
      const response = await axios.get("http://localhost:4001/profile", {
        headers: { Cookie: `token=${token}` },
      });//"http://localhost:4001/profile"
      user = response.data.user;
    } catch (err) {
      console.log("Service 1 failed, trying service 2");
    }

    // Try fallback if user is not found
    if (!user) {
      try {
        const response = await axios.get("https://appfilm.onrender.com/profile", {
          headers: { Cookie: `token=${token}` },
        });//"http://localhost:4008/profile"
        user = response.data.user;
      } catch (err) {
        console.log("Service 2 also failed.");
        return res.status(401).json({ err: "Unauthorized or user not found" });
      }
    }

    // Attach user and continue
    req.user = user;
    next();

  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal server error" });
  }
}


module.exports = { user_auth };
