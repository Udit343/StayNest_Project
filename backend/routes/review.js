const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");



// CREATE REVIEW
router.post("/", isLoggedIn, wrapAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ 
        success: false, 
        message: "Listing not found" 
      });
    }
 
    // Create new review
    const newReview = new Review({
      comment,
      rating,
      author: req.session.userId || req.user._id
    });

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.json({ 
      success: true, 
      message: "Review added successfully",
      review: newReview 
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}));



// DELETE REVIEW
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.json({ 
      success: true, 
      message: "Review deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}));

module.exports = router;