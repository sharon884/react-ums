const dotenv = require("dotenv")
dotenv.config();
const jwt = require("jsonwebtoken");

const genarateToken = ( res , userId) => {
    const token =  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie ( "jwt" , token , {
      httpOnly : true,                                //prevent js access xss protection       
      secure: process.env.NODE_ENV === "production",  //Use secure cookies in production
      sameSite : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  };
  

module.exports = genarateToken;
