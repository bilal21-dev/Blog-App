
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const { jwtSecret } = require("../key"); // This file exports your secret key

// Function to generate a JWT for a given user
function generateAuthToken(user) {
    // Create a payload with user data; you can add more properties if needed.
    const payload = { _id: user._id, email: user.email };

    // Sign the token with the secret key and set an expiration time (e.g., 1 hour)
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    return token;
}

async function handleSignup(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ result: "Enter complete information" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ result: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        const result = await user.save();

        // Convert to a plain JavaScript object and remove the password field
        const responseUser = result.toObject();
        delete responseUser.password;

        // Generate a token for the new user
        const token = generateAuthToken(responseUser);

        // Send the user details and token as the response
        res.send({ user: responseUser, token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send({ result: "Internal server error" });
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ result: "Enter complete details" });
    }

    try {
        // Find the user by email and include the password field (if it's not selected by default)
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).send({ result: "No record" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ result: "Invalid credentials" });
        }

        // Convert to a plain JavaScript object and remove the password field
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        // Generate a token for the user
        const token = generateAuthToken(userWithoutPassword);
        console.log(userWithoutPassword);
        // Send the user details and token as the response
        res.send({ user: userWithoutPassword, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ result: "Internal server error" });
    }
}

module.exports = {
    handleSignup,
    handleLogin,
};
