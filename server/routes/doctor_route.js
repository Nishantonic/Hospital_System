import express from "express";
import {docDetails, createDoc, updateDoctor, deleteDoctor} from "../controller/doctor_contorller.js";
const router = express.Router();

router.get("/", docDetails);
router.post("/create" , createDoc);
router.post("/update/:id", updateDoctor);
router.delete("/delete/:id", deleteDoctor)
export default router;