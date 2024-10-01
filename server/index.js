import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import getDoc from "./routes/doctor_route.js";
import singUp from "./routes/login/SignUp_route.js"
import appoint from "./routes/Appointment_Route.js"
import patient from "./routes/Patient.js"
dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'my-uploads')));

// const upload = multer({dest:"/signup"})
// app.post("/signup", upload.single("profileImage"), (req, res)=>{
//   console.log(req.body);
//   console.log(req.file);
// }) 



// const PORT = process.env.PORT || 8000;
const URI = process.env.URI;


app.get("/", (req, res)=>{
  res.send("Helllo bro's")
  console.log("hey bro");
})


try {
  mongoose.connect(URI).then(()=>{
    console.log("Mongoose Should be connected👌👌");
    app.listen(5000, ()=>{console.log("Server Should be connected👍👍👍")
    })
  })

} catch (error) {
  console.log("message :" + error );

}

app.use("/doctor", getDoc );
app.use("/signup", singUp );
app.use("/appoint", appoint)
app.use("/patient", patient)
