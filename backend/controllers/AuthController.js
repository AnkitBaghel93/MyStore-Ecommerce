const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { fullName, email  } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (!existing) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate token
    const token = jwt.sign(
      { userId: existing._id },
      process.env.JWT_SECRET ,
      { expiresIn: '7d' }
    );

    // Send only required fields, avoid sending hashed password
    const user = {
      fullName: existing.fullName,
      email: existing.email,
      _id: existing._id,
       role: existing.role,
    };

    res.status(200).json({ 
  message: 'Login successful', 
  token, 
  user: {
    _id: existing._id,
    fullName: existing.fullName,
    email: existing.email,
    role: existing.role,
  }
});
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // If you're using cookies (optional):
    // res.clearCookie('token');

    // For frontend using localStorage, simply send a message
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error during logout' });
  }
};


exports.getCurrentUser = async (req, res) => {
  console.log("🔍 /me route hit");
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};