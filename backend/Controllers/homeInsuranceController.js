// controllers/homeInsuranceController.js
const HomeInsurance = require("../Models/HomeInsurance");
const fs = require('fs');

// Get all home insurance data
exports.getAll = async (req, res) => {
    try {
      // Assuming you have the logged-in user's ID available in req.body.userId after authentication
      const userId = req.body.userId;
    
      // Retrieve home insurance records associated with the logged-in user and sort them by createdAt in descending order
      const homeInsurance = await HomeInsurance.find({ userId }).sort({ createdAt: -1 });
    
      res.status(200).json(homeInsurance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  

// Get single home insurance data by ID
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const homeInsurance = await HomeInsurance.findById(id);
    if (!homeInsurance) {
      return res.status(404).json({ message: "Home insurance not found" });
    }
    res.status(200).json(homeInsurance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create new home insurance data
exports.create = async (req, res) => {
    try {
        // Log the request body to see the data being sent from the client
        console.log("Request Body:", req.body);

        // Create a new home insurance object using the data from the request body
        const homeInsurance = await HomeInsurance.create(req.body);

        // Log the created home insurance object
        console.log("Created Home Insurance:", homeInsurance);

        // Send a success response with the created home insurance object
        res.status(201).json(homeInsurance);
    } catch (error) {
        // Log any errors that occur during the process
        console.error("Error creating home insurance:", error);

        // Send an error response with a generic message
        res.status(500).json({ message: "Server Error" });
    }
};


// Update home insurance data by ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const homeInsurance = await HomeInsurance.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!homeInsurance) {
      return res.status(404).json({ message: "Home insurance not found" });
    }
    res.status(200).json(homeInsurance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete home insurance data by ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const homeInsurance = await HomeInsurance.findByIdAndDelete(id);
    if (!homeInsurance) {
      return res.status(404).json({ message: "Home insurance not found" });
    }
    res.status(200).json({ message: "Home insurance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.upload = async (req, res) => {
    try {
        // Get the file from the request body using FormData
        const uploadedFile = req.file;

        // Generate a unique filename (you may implement your own logic for this)
        const filename = `file_${Date.now()}.${uploadedFile.originalname.split('.').pop()}`;

        // Write the file to the server
        fs.writeFileSync(`uploads/${filename}`, uploadedFile.buffer);

        // Respond with success message and filename
        res.status(200).json({ message: 'File uploaded successfully', filename });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
