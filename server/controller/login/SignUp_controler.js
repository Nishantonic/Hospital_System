import multer from 'multer';
import bcryptjs from 'bcryptjs';
// import validator from 'validator';
import jwt from 'jsonwebtoken';
import SignUP from "../../modle/login/Signup_model.js";
// D:\My Code\College_Work\Hos_Manag_Sys\server\my-uploads
// Multer storage configuration
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
}).single('profileImage');  // Use the same field name as in your form


// Sign Up Controller
export const signUp = async (req, res) => {
  // Use multer to handle file upload
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: 'Image upload failed', error: err });
    }

    try {
      // Get form fields
      const { name, email, password, phoneNo, role } = req.body;

      // Check if user already exists
      const user = await SignUP.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashPassword = await bcryptjs.hash(password, 10);

      // Store image path (file is uploaded via multer)
      const imagePath = req.file ? req.file.path : null;

      // Create new user object
      const newUser = new SignUP({
        name,
        email,
        password: hashPassword,
        phoneNo,
        role,
        image: imagePath // Store the image path
      });

      // Save new user to the database
      const savedUser = await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          role: savedUser.role,
          phoneNo: savedUser.phoneNo,
          image:savedUser.image

        },
        "itsNishant",
        { expiresIn: "30d" }
      );

      // Send token and success message
      res.status(200).json({ token, name: savedUser.name, message: "User created successfully" });
      console.log("New user created successfully...");
    } catch (error) {
      console.log("SignUp Controller Error: " + error);
      res.status(500).send({ message: "Internal server error", error });
    }
  });
};


export const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await SignUP.findOne({ email });
    const passwordCheck = await bcryptjs.compare(password, user.password);

    // console.log(userCheck + passwordCheck);

    if (!user || !passwordCheck) {
      res.status(400).json("Message: Invalid User_Id or Password");
      if (!user) {
        console.log("Invalid User Email: " + user);
        alert("Invalid User Email: " + user);
      } else {
        console.log("Invalid user Password: " + password);
        // alert("Invalid User Password: " + user)
      }
    } else {
      const token = jwt.sign(
        { id: user._id,
           role: user.role,
            name: user.name, 
            email: user.email, 
            image:user.image,
            phoneNo:user.phoneNo
          },
        "itsNishant",
        { expiresIn: "30d" }
      );

      res.status(202).json({ message: "Login Token", token });
    }
  } catch (error) {
    console.log("Login Error: " + error.message);
    res.status(404).json("login error: " + error);
  }
};



