const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Optionally: Add session or token generation here
    console.log("User", user.id, "logged in");
    return res.json({ success: true, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err });
  }
};
