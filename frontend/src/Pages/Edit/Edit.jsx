import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Edit() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    country: "",
    location: "",
    phone: "",
    email: "",
  });

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

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

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please login to edit listings");
      navigate("/Signin");
      return;
    }

    fetch(`http://localhost:8080/api/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.owner && user && data.owner._id !== user.id) {
          alert("You don't have permission to edit this listing");
          navigate(`/Show/${id}`);
          return;
        }

        setFormData({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          price: data.price || '',
          country: data.country || '',
          location: data.location || '',
          phone: data.phone || '',
          email: data.email || ''
        });
        setCurrentImage(data.image?.url || '');
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching listing:", err);
        alert("Error loading listing");
        navigate("/Home");
      });
  }, [id, isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);

      if (image) {
        formDataToSend.append('image', image);
      }

      const res = await fetch(`http://localhost:8080/api/listings/Edit/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Listing updated successfully!');
        navigate(`/Show/${id}`);
      } else {
        alert(data.message || 'Error updating listing');
      }
    } catch (err) {
      console.error('Error updating listing:', err);
      alert('Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center" style={{ marginTop: "10rem" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-lg p-4" style={{ backgroundColor: "#f5f1e8c2" }}>
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-3">Edit Listing</h3>
              <p className="text-center text-muted">
                Please provide all the correct information
              </p>

              <div className="mt-3">
                <label className="form-label">Title</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  required
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter description"
                  required
                ></textarea>
              </div>

              <div className="mt-3">
                <label className="form-label">Category</label>
                <select 
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
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
                <label className="form-label">Price</label>
                <input 
                  className="form-control" 
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Country</label>
                <input 
                  className="form-control" 
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  required
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Location</label>
                <input 
                  className="form-control" 
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Phone No</label>
                <input 
                  className="form-control" 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Email</label>
                <input 
                  className="form-control" 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              {currentImage && (
                <div className="mt-3">
                  <label className="form-label">Current Image</label>
                  <div>
                    <img
                      src={currentImage}
                      alt="Current listing"
                      className="img-thumbnail"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-3">
                <label className="form-label">Upload New Image (Optional)</label>
                <input 
                  className="form-control" 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <small className="text-muted">Leave empty to keep current image</small>
              </div>

              <div className="text-center mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary px-4"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="text-center mt-3">
                <Link to={`/Show/${id}`} className="btn btn-secondary px-4">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;