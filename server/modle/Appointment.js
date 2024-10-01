import mongoose, { model } from "mongoose";

 const Appointment = mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  phoneNo:{
    type:Number,
    require:true
  },
  doctor:{
    type:String,
    require:true
  },
  appointmentDate:{
    type:String,
    require:true
  },
  appointmentTime:{
    type:String,
    require:true
  },
})

const appointment = mongoose.model("appointment", Appointment);
export default  appointment