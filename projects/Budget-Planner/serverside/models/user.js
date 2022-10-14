import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your name."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
    },
  
  
  });

export default mongoose.model("Users", userSchema)
