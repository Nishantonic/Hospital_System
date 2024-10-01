import doctor from "../modle/doctor_modle.js";

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

export const createDoc = async (req, res)=>{
  try {
    const {name, email,phoneNo,experience,speciality} = req.body;
    const docValid = await doctor.findOne({email:email})
    if(docValid){return res.status(401).send("Already registered...")}
    const newDoc = new doctor({
      name:name,
      email:email,
      phoneNo:phoneNo,
      experience:experience,
      speciality:speciality
    })
    const newDoctor = await doctor.create(newDoc);
    res.status(200).json(newDoctor);


    
  } catch (error) {
    console.log("Message: "+ error);
    res.send("message: "+ error);
  }
}

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const doc = await doctor.findById({ _id: id });

  if (!doc) {
    return res.status(404).send("No Appointment given");
  }

  try {
    const updateData = await doctor.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ "Doctor data Updated Successfully...": updateData });
  } catch (error) {
    res.send("Error occure at the time of  updation in doctor");
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send("Invalid ID");
  }
  try {
    const deleteAppoint = await doctor.findByIdAndDelete(id);
    res.status(400).send("Doctor Deleted...");
  } catch (error) {
    res.status(404).send(error.message);
    console.log("Doctor not deleted");
  }
};
