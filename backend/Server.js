require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./Models/user.js');
 
// Import Routes
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoute = require("./routes/user.js");

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'https://stay-nest-project-lyo5.vercel.app', 
  credentials: true, 
}));


// Create MongoDB session store
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SECRET || 'mysupersecretcode',
  },
  touchAfter: 24 * 3600, // Update session once per 24 hours
});

store.on('error', (err) => {
  console.log('ERROR in MONGO SESSION STORE', err);
});


// Session configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET || 'mysupersecretcode',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,         
    sameSite: "none",
  },
};

app.use(session(sessionOptions));



app.use(passport.initialize());
app.use(passport.session());

// Configure passport to use local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



mongoose.connect(process.env.ATLASDB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));



// Test route
app.get('/', (req, res) => res.send("Backend running..."));

// API Routes
app.use("/api/listings", listingRoutes);
app.use("/api/listings/:id/reviews", reviewRoutes);
app.use("/api/user", userRoute);



// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  
  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});