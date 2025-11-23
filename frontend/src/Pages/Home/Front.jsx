import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function Front() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch("https://staynest-project-1.onrender.com/api/listings/all")
      .then(res => res.json())
      .then(data => {
        setListings(data);
        
        const category = searchParams.get('category');
        if (category) {
          const filtered = data.filter(item => 
            item.category?.toLowerCase() === category.toLowerCase()
          );
          setFilteredListings(filtered);
        } else {
          setFilteredListings(data);
        }
      })
      .catch(err => console.error(err));
  }, [searchParams]);

  const displayListings = filteredListings;
  const category = searchParams.get('category');

  return (
    <div className="container mt-5 pt-5">
      {category && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span>
            Showing results for: <strong>{category.charAt(0).toUpperCase() + category.slice(1)}</strong>
            {' '}({displayListings.length} listings found)
          </span>
          <Link to="/Home" className="btn btn-sm btn-outline-secondary">
            Clear Filter
          </Link>
        </div>
      )}

      {displayListings.length > 0 ? (
        <div className="row g-4">
          {displayListings.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mt-4">
              <div className="card border-0 shadow-sm h-100">
                <img 
                  className="card-img-top img-fluid"   
                  style={{ height: "250px", objectFit: "cover", borderRadius: "5%" }}  
                  src={item.image?.url} 
                  alt={item.title}
                />
                <div className="card-body" style={{ borderRadius: "3%" }}>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <span className="badge bg-info mb-2">{item.category}</span>
                  <br />
                  <Link to={`/Show/${item._id}`} className="btn btn-info">Show details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h4>No listings found for "{category}"</h4>
          <p className="text-muted">Try a different category or explore all listings</p>
          <Link to="/Home" className="btn btn-primary">
            View All Listings
          </Link>
        </div>
      )}
    </div>
  );
}

export default Front;