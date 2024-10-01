import express from "express";
import { allPatient, deletePatient, updatePatient } from "../controller/Patient_Controller.js";
const router = express.Router();

router.get("/", allPatient);
router.post("/update/:id", updatePatient);
router.delete("/delete/:id", deletePatient)

export default router;