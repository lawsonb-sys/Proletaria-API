const jwt = require("jsonwebtoken");

function creatToken(payload, option) {
  try {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, option);
    return token;
  } catch (error) {
    console.log("err:", error.message);
    return null;
  }
}

module.exports = creatToken;
