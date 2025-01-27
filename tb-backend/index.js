import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import ImageData from "./models/ImageData.js";

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  
  app.use(cors(corsOptions)); // Apply CORS with options

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// API to add image data


// Endpoint to set data for an image
app.post('/api/set-data', async (req, res) => {
    console.log("Request Body:", req.body);  // Log the incoming request body
    
    try {
        const { imageName, areas, confidence, diagnosis } = req.body;
    
        // Check if imageName is provided
        if (!imageName) {
            return res.status(400).json({ message: 'imageName is required' });
        }
    
        // Check if data for the image already exists
        const existingData = await ImageData.findOne({ imageName });
    
        if (existingData) {
            return res.status(200).json({
                message: 'Data already exists for this image',
                data: existingData,
            });
        }
    
        const newData = new ImageData({
            imageName,
            areas,
            confidence,
            diagnosis,
        });
    
        console.log("New Data to Save:", newData);  // Log the new data before saving it
    
        await newData.save();
    
        res.status(201).json({
            message: 'Data added successfully',
            data: newData,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error saving data',
            error: error.message,
        });
    }
});

  
  

// API to fetch image data by name
app.post("/api/fetch-data", async (req, res) => {
  const { imageName } = req.body;

  try {
    const imageData = await ImageData.findOne({ imageName });

    if (!imageData) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(imageData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
