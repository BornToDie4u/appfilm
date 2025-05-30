const jwt = require("jsonwebtoken");
const axios = require("axios");

async function user_auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ err: "token undefined" });
    }
    const decoded = jwt.verify(token, "adityapurohit2525");
    console.log(decoded);

    const response = await axios.get("http://localhost:4004/profile", {
      headers: {
        Cookie: `token=${token}`, // pass token cookie manually
      },
    });
    const user = response.data.user;// why because i am sending the responce as res.json({user : user})
    console.log(user);
    if (!user) {
      return res.json({ err: "user not foiund" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { user_auth };
