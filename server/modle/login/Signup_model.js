import mongoose from "mongoose";


const SignUp = mongoose.Schema({
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
  password:{
    type:String,
    require:true
  },
  role:{
    type: String,
    default:"user"
  },
  image:{
    type:String,
    require:true
  }
  

 
});

const SignUP = mongoose.model("SingUP", SignUp);
export default SignUP;