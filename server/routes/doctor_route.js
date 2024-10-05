import express from "express";
import {docDetails, createDoc, updateDoctor, deleteDoctor, singleDoctor} from "../controller/doctor_contorller.js";
const router = express.Router();

router.get("/", docDetails);
router.post("/create" , createDoc);
router.put("/update/:id", updateDoctor);
router.delete("/delete/:id", deleteDoctor)
router.get("/getSingleDoctor/:id", singleDoctor)

export default router;
