import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { MONGODB, CONFIG } from "./constants/";
import imagesRouter from "./routes/images";

// Initialize Express API
const api = express();

// Build MongoDB URL
const uri = `mongodb+srv://${MONGODB.ACCESS_KEY}:${MONGODB.SECRET_KEY}@${MONGODB.URI}`;

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error) => {
    console.error(`Error connecting to database: ${error}`);
  });

// Accept JSON
api.use(express.json());

// Map images routes
api.use('/images', imagesRouter);

// Run server
const port = CONFIG.API_PORT;
api.listen(port, () => {
  console.log(`Server successfully running on port ${port}`);
})
