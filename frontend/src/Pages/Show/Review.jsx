import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Review({ listingId, reviews, onReviewAdded }) {
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 });
  const [loading, setLoading] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert("Please login to post a review");
      navigate("/Signin");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/api/listings/${listingId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newReview)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Review posted successfully!");
        setNewReview({ comment: "", rating: 5 });
        onReviewAdded();
      } else {
        alert(data.message || "Error posting review");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/listings/${listingId}/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Review deleted successfully");
        onReviewAdded();
      } else {
        alert(data.message || "Error deleting review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-9">
          <h3 className="mb-4">Reviews</h3>

          {isAuthenticated ? (
            <div className="card shadow-sm mb-4 p-4">
              <h5>Leave a Review</h5>
              <form onSubmit={handleReviewSubmit}>
                
                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="Share your experience..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post Review"}
                </button>
              </form>
            </div>
          ) : (
            <div className="alert alert-info">
              Please <Link to="/Signin">login</Link> to leave a review
            </div>
          )}

          {reviews && reviews.length > 0 ? (
            reviews.map((review) => {
              const isReviewAuthor = user && review.author && user.id === review.author._id;
              
              return (
                <div key={review._id} className="card shadow-sm mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h5 className="card-title">
                          @{review.author?.username || "Anonymous"}
                        </h5>
                        <div className="mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi bi-star${
                                i < review.rating ? "-fill text-warning" : ""
                              }`}
                            ></i>
                          ))}
                        </div>
                        <p className="card-text">{review.comment}</p>
                        <small className="text-muted">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      
                      {isReviewAuthor && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          DELETE
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Review;