import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Listing({ listing }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      const res = await fetch(`http://localhost:8080/api/listings/delete/${listing._id}`, {
        method: "DELETE",
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Listing deleted successfully");
        navigate('/Home');
      } else {
        alert(data.message || "Error deleting listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Server error. Please check if backend is running.");
    }
  };

  const isOwner = user && listing.owner && user.id === listing.owner._id;

  return (
    <div className="container" style={{ marginTop: "7rem" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 mb-2">
          <div className="text-center">
            <img
              src={listing.image?.url || "/image.jpg"}
              alt={listing.title}
              className="img-fluid rounded shadow mx-auto d-block"
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="mt-3 text-start ms-3 ms-md-5">
            <h3 className="mb-2 mt-3">{listing.title}</h3>
            <p className="mb-2">{listing.description}</p>
            <h4 className="mb-2 mt-3">Price: ₹{listing.price}</h4>
            <p className="mb-2">
              <strong>Category:</strong> {listing.category}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {listing.location}, {listing.country}
            </p>
            <p className="mb-3">
              <strong>Owned by:</strong> {listing.owner?.username || "Unknown"}
            </p>
            <p className="mb-3">
              <strong>Phone:</strong> {listing.phone}
            </p>
            <p className="mb-3">
              <strong>Email:</strong> {listing.email}
            </p>
          </div>

          {isOwner && (
            <div className="text-center">
              <button
                type="button"
                className="btn btn-outline-danger me-2"
                style={{ width: "120px" }}
                onClick={handleDelete}
              >
                DELETE
              </button>

              <Link to={`/Edit/${listing._id}`}>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  style={{ width: "120px" }}
                >
                  EDIT
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Listing;