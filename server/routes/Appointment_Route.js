import express from "express";
import { deleteAppointment, TakeAppointment, updateAppointment, ViewAppointment } from "../controller/Appointment_Controller.js";

import nodemailer from "nodemailer"
const router = express.Router();

router.get("/", ViewAppointment);
router.post("/form", TakeAppointment  )
router.post("/update/:id", updateAppointment)
router.delete("/delete/:id", deleteAppointment)


// router.post("/send-email", async (req, res) => {
//   const { email, cartItems } = req.body;

//   // Setup Nodemailer transporter
//   let transporter = nodemailer.createTransport({
//     service: "Gmail", // Or use SMTP options
//     auth: {
//       user: "your-email@gmail.com",
//       pass: "your-email-password", // Use environment variables for security
//     },
//   });

//   // Construct the order summary
//   let orderSummary = cartItems
//     .map(
//       (item) =>
//         `<li>${item.product.name} - Quantity: ${item.quantity}, Price: $${item.price}</li>`
//     )
//     .join("");

//   let mailOptions = {
//     from: "avitapope@gmail.com",
//     to: email,
//     subject: "Order Confirmation",
//     html: `<h2>Thank you for your purchase!</h2>
//            <p>You have successfully purchased the following items:</p>
//            <ul>${orderSummary}</ul>`,
//   };

//   // Send the email
//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send("Email sent successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Failed to send email");
//   }
// });

export default router;
