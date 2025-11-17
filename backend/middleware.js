const Listing = require("./Models/listing");
const Review = require("./Models/review");



module.exports.isLoggedIn = (req, res, next) => {
  // Check session-based authentication
  if (!req.session.userId && !req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "You must be logged in to perform this action"
    });
  }
  next();
};



// CHECK IF USER IS OWNER OF LISTING
module.exports.isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found"
      });
    }
    
    // Get userId from session or passport
    const userId = req.session.userId || req.user?._id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in"
      });
    }
    
    if (!listing.owner.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to edit this listing"
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// CHECK IF USER IS AUTHOR OF REVIEW
module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }
    
    // Get userId from session or passport
    const userId = req.session.userId || req.user?._id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in"
      });
    }
    
    if (!review.author.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not the author of this review"
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};