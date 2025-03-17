const bcrypt = require("bcryptjs");
const User = require("../models/user");

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password , salt);
}

const comparePassword = async(enterdPassword , storedHashedPassword) => {
 return await bcrypt.compare(enterdPassword ,storedHashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
}