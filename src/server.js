require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const { MONGODB, CONFIG } = require("./constants/constants")
const imagesRouter = require("./routes/images");
const api = express();

// Build MongoDB URL
const uri = `mongodb+srv://${MONGODB.ACCESS_KEY}:${MONGODB.SECRET_KEY}@${MONGODB.URI}`;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
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
