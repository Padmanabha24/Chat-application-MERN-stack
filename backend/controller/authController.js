const User = require("../models/Register/authModel");
const bcrypt = require("bcrypt"); // Make sure to install bcrypt using npm

// Signup Get Route
module.exports.signup_get = (req, res) => {
  res.status(200).json({ message: "Signup page" });
};

// Login Get Route
module.exports.login_get = (req, res) => {
  res.status(200).json({ message: "Login page" });
};

// Signup Post Route
module.exports.signup_post = async (req, res) => {
  const { first_name, last_name, email, phone_number, username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      phone_number,
      username,
      password: hashedPassword, // Store hashed password
    });

    // Save the user to MongoDB
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// Login Post Route
module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Login successful, return user info (in a real app, return a token)
    res.status(200).json({ message: "User login successful", username: user.username });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
