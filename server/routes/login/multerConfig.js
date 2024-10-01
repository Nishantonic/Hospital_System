import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

// const upload = multer({ storage });

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 } // 5MB file size limit
}).single('profileImage');

export default upload; // Make upload the default export
