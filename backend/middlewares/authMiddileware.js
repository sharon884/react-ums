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
    
        //Find the user in the database using the token's user ID
        req.user = await User.findById(decoded.id).select("-password");
        
        if (!req.user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message : " user not found!"});
        }

        next();
    } catch ( error )  {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message : "invalid token!"});
    }
};

module.exports  = protect;