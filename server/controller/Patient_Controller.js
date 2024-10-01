import SignUP from "../modle/login/Signup_model.js";

export const allPatient = async (req, res) => {
  try {
    const users = await SignUP.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send("Error", error.message);
    console.log("All User not display");
  }
};

export const updatePatient = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("No such patient present");
  }
  try {
    const patient = await SignUP.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ "Updated Successfully": patient });
  } catch (error) {
    res.status(400).send("Not Updated");
    console.log("No changes in patient");
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("No such patient present");
  }

  try {
    const patient = await SignUP.findByIdAndDelete(id);
    res.status(200).json({ "Deleted patient Successfully": patient });
  } catch (error) {
    res.status(400).send("Not Deleted");
    console.log("Not deleted patient");
  }
};
