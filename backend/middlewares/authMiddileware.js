const jwt = require("jsonwebtoken");
const User = require("../models/user");
const STATUS_CODES = require("../constants/statusCode");

const protect = async ( req , res , next) => {
    try {
     console.log(req.cookies);
        const token = req.cookies.jwt;
    
        if ( !token ) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message : "No token, authorization denied!"});        
        }
        //Verify the token using JWT_SECRET
        const decoded = jwt.verify( token , process.env.JWT_SECRET);
    console.log('decoded'+decoded)
        //Find the user in the database using the token's user ID
        req.user = await User.findById(decoded.id).select("-password");
        console.log(req.user);
        if (!req.user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message : " user not found!"});
        }
        console.log("User authenticated:", req.user.email); 
        next();
    } catch ( error )  {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message : "invalid token!"});
    }
};

module.exports  = protect;