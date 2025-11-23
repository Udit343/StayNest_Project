import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listing from "./Listing";
import Map from "./Map";
import Review from "./Review";
import { useAuth } from "../contexts/AuthContext";

function ShowPage() {
  const [listing, setListing] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = () => {
    fetch(`https://staynest-project-1.onrender.com/api/listings/${id}`)
      .then((res) => res.json())
      .then((data) => setListing(data))
      .catch((err) => console.error(err));
  };

  if (!listing) {
    return (
      <div className="container text-center" style={{ marginTop: "10rem" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Listing listing={listing} />
      {/* <Map
        coordinates={listing.geometry?.coordinates}
        location={listing.location}
        country={listing.country}
      /> */}
      <Review
        listingId={id}
        reviews={listing.reviews || []}
        onReviewAdded={fetchListing}
      />
    </>
  );
}

export default ShowPage;
