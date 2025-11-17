import React from "react";
import { Link } from "react-router-dom";

function Content() {
  return (
    <div className="container" style={{ marginTop: "10rem" }}>
      <section className="profile-section mb-5">
        <div className="profile-card">
          <div className="row align-items-center">
            <div className="col-lg-4 profile-image-container">
              <div className="profile-image">
                <img
                  src="/Tag.png"
                  alt="Your Name"
                  className="profile-image"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <h2 className="mb-3" style={{ color: "var(--primary-color)" }}>
                Welcome to stayNEST
              </h2>
              <p className="lead">
                Founded by <strong>Udit</strong>, stayNEST is more than just an
                accommodation platform—it's a commitment to creating memorable
                experiences for travelers worldwide.
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title">Our Mission & Vision</h2>
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="mission-card">
              <h5>
                <i className="bi bi-bullseye me-2"></i>Our Mission
              </h5>
              <p>
                To revolutionize the way people find and experience
                accommodations by enhancing safety, building trust, and making
                the platform seamless and simple to use. Currently, stayNEST
                allows travelers and hosts to add new places, upload images,
                share reviews, and connect directly through contact details.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mission-card">
              <h5>
                <i className="bi bi-eye me-2"></i>Our Vision
              </h5>
              <p>
                To become the most trusted and preferred global accommodation
                platform by leveraging AI and ML to provide travelers with live
                location insights, nearby essential services like hospitals and
                police stations, and smart self-management tools that ensure
                safety, convenience, and meaningful connections for every stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <h4 className="section-title">Get In Touch</h4>
            <p className="mb-4">
              We'd love to hear from you! Whether you have questions, feedback,
              or just want to say hello, our team is here to help.
            </p>
            <div className="contact-box">
              <div className="contact-item">
                <i className="bi bi-envelope-fill"></i>
                <div>
                  <strong>Email:</strong>uditnarayanpandey96@gmail.com
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone-fill"></i>
                <div>
                  <strong>Phone:</strong> +91 896087XXXX
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-clock-fill"></i>
                <div>
                  <strong>Working Hours:</strong> Mon-Sat, 9:00 AM - 6:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content;
