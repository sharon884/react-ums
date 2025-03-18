const STATUS_CODES = require("../constants/statusCode");

const adminAuth =  ( req , res , next ) => {

    if ( !req.user) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ message : "unAuthorized access!"}); 
    }
    
    if ( req.user.role !== "admin") {
        return res.status(STATUS_CODES.FORBIDDEN).json({ message : "Access denied! Admins only."});
    }

    next();
};

module.exports = adminAuth;