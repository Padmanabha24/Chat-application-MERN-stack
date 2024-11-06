const { Router } = require("express");
const authControllers = require('../controller/authController');
const User = require("../models/Register/authModel") // Ensure you import the User model
const router = Router();

// Authentication routes
router.get('/signup', authControllers.signup_get);
router.post('/signup', authControllers.signup_post);
router.get('/login', authControllers.login_get);
router.post('/login', authControllers.login_post);

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password from the results
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;
