import express from "express";
import { signUp , login} from "../../controller/login/SignUp_controler.js";

import { verifyToken, isAdmin } from "../../middleware/AuthMiddleware.js";

import multer from "multer";

const router = express.Router();




router.post("/",  signUp);
router.post("/login", login);


// router.post("/upload", upload.single("profileImage"), (req, res)=>{
//   console.log(req.body);
//   console.log(req.file);
  
// }) 

router.get("/admin", verifyToken, isAdmin, (req, res)=>{
  res.send("Welcome Admin")
})

router.get("/user", verifyToken, (req, res)=>{
  res.send("Welcome User!...")

  
})

export default router;


