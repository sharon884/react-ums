const { body, validationResult } = require("express-validator");
const STATUS_CODES = require("../constants/statusCode");

const validateSignUp = [
  body("name").notEmpty().withMessage("name is required!"),
  body("email").isEmail().withMessage("valid email is required!"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters required!"),
  body("role")
    .isIn(["user", "admin"])
    .withMessage("Role must be user or admin"),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ errors: error.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("enter a valid email!"),
  body("password").notEmpty().withMessage("enter a valid password!"),

  (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({error: error.array()});
    }
    next();
  }
];

module.exports = {
  validateSignUp,
  validateLogin
} 
