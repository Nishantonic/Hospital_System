import appointment from "../modle/Appointment.js";

export const ViewAppointment = async (req, res) => {
  try {
    const appointments = await appointment.find();
    if (appointments) {
      res.status(200).json(appointments);
      console.log("All Appointments are here...");
    } else {
      res.send("No such appointment available...");
    }
  } catch (error) {
    res.status(404).json({ "Error in Appointment: ": error.message });
    console.log("Error in Appointment", error.message);
  }
};

export const TakeAppointment = async (req, res) => {
  const { name, email, phoneNo, doctor, appointmentDate, appointmentTime } =
    req.body;

  try {
    // const validUser = await SignUP.findOne({email:email});
    // const checkPreApp = await appointment.find();
    // if(checkPreApp){
    //   return res.send("Already Appointment ")
    const newAppointment = {
      name: name,
      email: email,
      phoneNo: phoneNo,
      doctor: doctor,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
    };
    const newAppoint = await appointment.create(newAppointment);
    res.status(200).json(newAppoint);
    console.log("Appointment Generated");
  } catch (error) {
    res.status(400).json({ "Appointment post Error: ": error.message });
    console.log("Appointment post Error: ", error.message);
  }
};

// export const updateAppointment = async (req, res) => {
//   const { id } = req.params;
//   const appoint = await appointment.findById({ _id: id });

//   if (!appoint) {
//     return res.status(404).send("No Appointment given");
//   }

//   try {
//     const updateData = await appointment.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     res.status(200).json({ "Appointment Updated Successfully...": updateData });
//   } catch (error) {
//     res.send("Error occure at the time of  update in appointment");
//   }
// };


export const updateAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the appointment exists
    const appoint = await appointment.findById(id);
    if (!appoint) {
      return res.status(404).send("No Appointment found");
    }

    // Log the incoming request body for debugging
    console.log("Incoming update data:", req.body);

    // Update the appointment
    const updateData = await appointment.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensures that Mongoose runs schema validation
    });

    // If no document is found, return an error
    if (!updateData) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Respond with the updated appointment
    res.status(200).json({
      message: "Appointment updated successfully",
      data: updateData,
    });
  } catch (error) {
    console.error("Error updating appointment:", error); // Log the error for debugging
    res.status(500).send("Error occurred while updating the appointment");
  }
};

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send("Invalid ID");
  }
  try {
    const deleteAppoint = await appointment.findByIdAndDelete(id);
    res.status(400).send({"Appointment Deleted...: " : deleteAppoint});
  } catch (error) {
    res.status(404).send(error.message);
    console.log("Appointment not deleted");
  }
};
