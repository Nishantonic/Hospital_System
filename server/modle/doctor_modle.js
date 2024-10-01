import mongoose from "mongoose";

const doctorModle = mongoose.Schema({
  name:String,
  email:{
    type: String,
    unique:true
  },
  phoneNo:Number,
  experience:Number,
  speciality:String
});

const docData = mongoose.model("docData", doctorModle);
export default docData;