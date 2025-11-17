const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync");


// SIGNUP
router.post("/signup", wrapAsync(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Create new user
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    
    // Auto-login after signup
    req.session.userId = registeredUser._id;
    req.session.username = registeredUser.username;
    
    res.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: registeredUser._id,
        username: registeredUser.username,
        email: registeredUser.email
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}));


// LOGIN
router.post("/login", wrapAsync(async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Verify password using passport-local-mongoose
    user.authenticate(password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Store user info in session
      req.session.userId = user._id;
      req.session.username = user.username;
      
      res.json({
        success: true,
        message: "Logged in successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}));


// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed"
      });
    }
    res.json({
      success: true,
      message: "Logged out successfully"
    });
  });
});


// CHECK AUTH STATUS
router.get("/status", (req, res) => {
  if (req.session.userId) {
    res.json({
      authenticated: true,
      user: {
        id: req.session.userId,
        username: req.session.username
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;