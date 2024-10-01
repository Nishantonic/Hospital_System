// app.js

import express from "express"; 
import multer from 'multer';
import  path from 'path';

const app = express();

// Configure storage engine and filename
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload middleware and add file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 } // 5MB file size limit
}).single('profileImage'); // 'myFile' is the name attribute of the file input field

// File upload route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
     if (err) {
       console.error(err);
       return res.status(500).json({ error: err });
      }
     if (!req.file) {
        return res.status(400).json({ error: 'Please send file' });
      }
      console.log(req.file);
      res.send('File uploaded!');
  });
});



app.listen(3000, () => console.log('Server started on port 3000'));