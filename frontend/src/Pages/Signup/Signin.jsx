import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(formData.username, formData.password);
    
    setLoading(false);

    if (result.success) {
      alert(result.message);
      navigate("/Home");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div
            className="card shadow-lg p-4"
            style={{ backgroundColor: "#2a2828ad", color: "white" }}
          >
            <h3 className="text-center">Get Started Now</h3>
            <p className="text-center text-light">
              Welcome back! Enter your details to access your account
            </p>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username :</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password :</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="d-grid mt-4">
                <button 
                  type="submit" 
                  className="btn btn-info text-white"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/Signup" className="text-decoration-none text-warning">
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;