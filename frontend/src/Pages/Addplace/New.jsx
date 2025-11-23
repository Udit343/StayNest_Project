import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
function New() {
  const [selectedArea, setSelectedArea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // ⬅️ ADDED

  const areaOptions = [
    'Hotel',
    'Restaurant',
    'Farm',
    'Temple',
    'Room',
    'Castle',
    'Mountain',
    'Beach',
    'Park'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ⬅️ ADDED: Check authentication before submitting
    if (!isAuthenticated) {
      alert("Please login to add a listing");
      navigate("/Signin");
      return;
    }
    
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);

      const res = await fetch("https://staynest-project-1.onrender.com/api/listings/add", {
        method: "POST",
        credentials: "include", //  ADDED: Send cookies with request
        body: formData
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Listing added successfully!");
        e.target.reset();
        setSelectedArea('');
        navigate('/Home');
      } else {
        alert(data.message || "Error adding listing");
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-lg p-4" style={{ backgroundColor: "#f5f1e8c2" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h3 className="text-center mb-3">Add New Place</h3>
              <p className="text-center text-muted">
                Please provide all the correct information
              </p>

              <div className="mt-3">
                <label className="form-label">Title *</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="title" 
                  placeholder="Enter title"
                  required 
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Description *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  placeholder="Enter description"
                  required
                ></textarea>
              </div>

              <div className="mt-3">
                <label className="form-label">Category *</label>
                <select 
                  className="form-select" 
                  name="category"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  required
                >
                  <option value="">Select area type</option>
                  {areaOptions.map((area, index) => (
                    <option key={index} value={area.toLowerCase()}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3">
                <label className="form-label">Price *</label>
                <input 
                  className="form-control" 
                  type="number" 
                  name="price" 
                  placeholder="Enter price"
                  required 
                  min="0"
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Country *</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="country" 
                  placeholder="Enter country"
                  required 
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Location *</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="location" 
                  placeholder="Enter location"
                  required 
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Image *</label>
                <input 
                  className="form-control" 
                  name="image" 
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  required 
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Phone No *</label>
                <input 
                  className="form-control" 
                  type="tel" 
                  name="phone" 
                  placeholder="Enter phone number"
                  required 
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Email *</label>
                <input 
                  className="form-control" 
                  type="email" 
                  name="email" 
                  placeholder="Enter email address"
                  required 
                />
              </div>

              <div className="mt-4">
                <button 
                  type="submit" 
                  className="btn btn-info w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add New Place"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;