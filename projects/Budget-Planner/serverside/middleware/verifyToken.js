import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { ACCESS_TOKEN } = process.env;

const verifyToken = (req, res, next) => {
  // get token from req header
  const authHeader = req.headers.token;


  if (authHeader) {
    const token = authHeader.split(" ")[1];
      
    jwt.verify(token, ACCESS_TOKEN, (err, user) => {
      if(err) 
     return res.status(403).json("Token is not valid!");
      req.user = user;
  console.log(user)
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export default verifyToken;