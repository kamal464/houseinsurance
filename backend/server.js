// let inputString = ``;


// inputString = inputString.replace(/\s+/g, ' ')

// // Split the input string by comma
// const arrayFromInput = inputString.split(',').map(item => item.trim());
// console.log(arrayFromInput.length,'first')
// // Convert each item to lowercase and remove duplicates
// const uniqueLowerCaseArray = [...new Set(arrayFromInput)];


// console.log(uniqueLowerCaseArray.length,'dd')
// // Convert the unique lowercase array back to a string
// const resultString = uniqueLowerCaseArray.join(', ');

// // Print the result to console
// console.log(resultString);



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const multer = require('multer');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create the uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage }); // Initialize multer

// Routes
const authRoutes = require("./Routes/authRoutes");
const homeInsuranceRoutes = require("./Routes/homeInsuranceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/homeinsurance", homeInsuranceRoutes);

// Apply Multer middleware to the /upload route
const homeInsuranceController = require('./Controllers/homeInsuranceController');
app.post('/upload', upload.single('file'), homeInsuranceController.upload);

// Define route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Server Configuration
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error(error));
