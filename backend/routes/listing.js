const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// GET ALL LISTINGS
router.get("/all", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({}).populate("owner");
  res.json(allListings);
}))



// GET SINGLE LISTING BY ID   
router.get("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User"
      }
    })
    .populate("owner");
  
  if (!listing) {
    return res.status(404).json({ 
      success: false, 
      message: "Listing not found" 
    });
  }
  
  res.json(listing);
}));


// CREATE NEW LISTING
router.post("/add", isLoggedIn, upload.single("image"), wrapAsync(async (req, res) => {
  try {

    // Get geocoding data for location
    const response = await geocodingClient.forwardGeocode({
      query: req.body.location,
      limit: 1
    }).send();

    // Create new listing
    const newListing = new Listing({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      country: req.body.country,
      location: req.body.location,
      phone: req.body.phone,
      email: req.body.email,
      image: {
        url: req.file.path,
        filename: req.file.filename
      },
      geometry: response.body.features[0].geometry,
      owner: req.session.userId || req.user._id
    });

    await newListing.save();
    
    res.json({ 
      success: true, 
      message: "Listing created successfully",
      listing: newListing 
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}));


// UPDATE LISTING
router.put("/Edit/:id", isLoggedIn, isOwner, upload.single("image"), wrapAsync(async (req, res) => {
  try {
    const { id } = req.params;
    
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      country: req.body.country,
      location: req.body.location,
      phone: req.body.phone,
      email: req.body.email
    };

    // If new image uploaded, update image
    if (req.file) {
      updateData.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    // Update geocoding if location changed
    if (req.body.location) {
      const response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
      }).send();
      updateData.geometry = response.body.features[0].geometry;
    }

    const listing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!listing) {
      return res.status(404).json({ 
        success: false, 
        message: "Listing not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Listing updated successfully",
      listing 
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}));


// DELETE LISTING
router.delete("/delete/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    
    if (!deletedListing) {
      return res.status(404).json({ 
        success: false, 
        message: "Listing not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Listing deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}));

module.exports = router;