import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
// model imports
import UserModel from "../models/user.js"
import RecordModel from "../models/record.js"

dotenv.config();

const { CLIENT_URL, SECRET_KEY, ACCESS_TOKEN, ACTIVATION_TOKEN_SECRET } = process.env
console.log(SECRET_KEY)
// -> controllers
// signUp
export const signUp = async (req, res) => {
    // req seperation
    const { name:fullname, email, password } = req.body
    console.log(req.body)
    try {
        // check if req is empty
        if(!fullname || !email || !password) return res.status(400).json({ msg: "Please fill in all fields." })
        // check if email adress is valid
        if(!validateEmailAdress(email)) return res.status(400).json({ msg: "Invalid email adress." });
        // check password length
        if(password.length < 8) return res.status(400).json({ msg: "Password must be at least 8 characters." })
        // check if the email is exist
        const existUser = await UserModel.findOne({ email })
        if (existUser) { return res.status(400).json({ msg: "An user has already registered with this email." })}
        else { 
        const cryptedPassword = await CryptoJS.AES.encrypt(
          password,
            SECRET_KEY
        ).toString()
        const newUser = new UserModel({
            fullname,
            email,
            password: cryptedPassword,
        })
        await newUser.save().then((user) => {
          const newProfile = new RecordModel({
            user: user._id
          })
          newProfile.save()
          return res.json({
            msg: "You have successfully registered!",
        })
        })
        
        }
    } catch (err) {
      console.log(err)
        return res.status(500).json({ msg: err.message })
    }
}

// signIn
export const signIn = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).json({ msg: "false" }); 
      } else {
        const bytes = CryptoJS.AES.decrypt(user.password, SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password)
          return res.status(401).json({ msg: "false" });
        const accessToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          ACCESS_TOKEN,
          { expiresIn: "7d" }
        );
        const { password, __v, createdAt, updatedAt, ...info } = user._doc;
        return res.status(200).json({ ...info, accessToken });
      }
      
    } catch (err) {
      return res.status(500).json({ msg: "false" });
    }
  };
  export const Logout = async (req, res) => {
    try {
      res.clearCookie("jwt");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  export const fetchAnUser = async (req, res) => {
    try {
      const id = req.user.id;
      console.log(id)
      if (id) {
        const user = await UserModel.findOne({ _id: id });
       
        if (user) {
          return res.status(200).json({ msg: user });
        } else {
          console.log("user not found")
          return res.status(400).json({ msg: "This doesnt exist!" });
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  };

const validateEmailAdress = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };