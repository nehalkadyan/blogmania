const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Modified to handle single image upload
const uploadSingle = asyncHandler(async (req, res, next) => {
  try {
    // Access single file instead of files array
    const image = req.file;
    
    console.log("Uploaded image:", image);
    
    if (!image) {
      console.log("No image uploaded - skipping cloudinary upload")
      return next()
    }
    
    // Upload single image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "auto"
    });
    
    // Store just the image URL instead of an array
    req.imageUrl = result.secure_url;
    
    console.log("Image URL:", req.imageUrl);
    
    // Continue to next logic i.e controller
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = uploadSingle;