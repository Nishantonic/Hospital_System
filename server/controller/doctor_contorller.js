import doctor from "../modle/doctor_modle.js";
import bcryptjs from 'bcryptjs';
import multer from "multer";
import jwt from "jsonwebtoken"
export const docDetails = async (req, res)=>{
  try {
    const allDoctors = await doctor.find();
    res.status(200).json(allDoctors)
    // console.log("Details of all Doctors");
    

  } catch (error) {
    console.log("Message:  "+ error);
    res.send("message: "+ error);
    
  }
}


// upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './my-uploads'); // Make sure this path is correct
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.mimetype.split('/')[1]; // Get file extension from MIME type
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`); // Save file with the correct extension
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept image files only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  }
}).single('profileImage');  

export const createDoc = async (req, res)=>{
  upload(req, res, async function(err){
if(err){
  res.send(err)
  console.log(err);
  }
   
  try {
    const {name, email,phoneNo, password,experience,speciality, image} = req.body;
    const docValid = await doctor.findOne({email:email})
    if(docValid){return res.status(401).send("Already registered...")}

    const hashPassword = await bcryptjs.hash(password, 10);

    const filepath = req.file ? req.file.path : null;

    const newDoc = new doctor({
      name:name,
      email:email,
      phoneNo:phoneNo,
      password: hashPassword,
      experience:experience,
      speciality:speciality,
      image : filepath
    })

    // const newDoctor = await doctor.save();
    const newDoctor = await doctor.create(newDoc);

    const token = jwt.sign({newDoctor}, "itsNishant", {expiresIn: '30d'})
    res.status(200).json({"token": token, "Doctor": newDoctor});


    
  } catch (error) {
    console.log("Message: "+ error);
    res.send("message: "+ error);
  }
})
}

export const singleDoctor = async (req, res)=>{
const {id} = req.params;
  const singleDoc = await doctor.findById( id);
  try {
    
    if(singleDoc){
      res.status(200).send(singleDoc);
    }
  } catch (error) {
    console.log(error);
    
  }
} 

// export const updateDoctor = async (req, res) => {
//   const { id } = req.params;
//   const doc = await doctor.findById({ _id: id });

//   if (!doc) {
//     return res.status(404).send("No doctor given");
//   }

//   try {
//     const updateData = await doctor.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     res.status(200).json({ "Doctor data Updated Successfully...": updateData });
//   } catch (error) {
//     res.send("Error occure at the time of  updation in doctor");
//   }
// };

export const updateDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the doctor exists
    

    // Log the incoming data for debugging
    console.log("Update data:", req.body);

    // Handle image update if present
    let updateFields = { ...req.body };
    if (req.file) {
      updateFields.image = req.file.path; // Assuming the image file is uploaded and file path is set
    }

    // Update doctor data with validation
    const updatedDoctor = await doctor.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validation is run
    });

    // If update is successful, respond with the updated doctor data
    res.status(200).json({
      message: "Doctor data updated successfully",
      Data: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor:", error); // Log error for debugging
    res.status(500).json({ error: "Error occurred while updating doctor" });
  }
};


export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send("Invalid ID");
  }
  try {
    const deleteAppoint = await doctor.findByIdAndDelete(id);
    res.status(200).send({"Doctor Deleted...": deleteAppoint});
  } catch (error) {
    res.status(404).send(error.message);
    console.log("Doctor not deleted");
  }
};
