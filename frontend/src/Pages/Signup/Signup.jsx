import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
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

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const result = await signup(formData.username, formData.email, formData.password);
    
    setLoading(false);

    if (result.success) {
      alert(result.message);
      navigate("/Home");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container" style={{ marginTop: "10rem" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg p-4" style={{ backgroundColor: "#2a2828ad", color: "white" }}>
            <h3 className="text-center">Create a free account</h3>
            <p className="text-center mt-2">
              Provide your Email and choose a password
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
                <label className="form-label">Email :</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
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
                  minLength="6"
                />
              </div>

              <div className="d-grid">
                <button 
                  type="submit" 
                  className="btn btn-info"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/Signin" className="text-decoration-none text-warning">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;