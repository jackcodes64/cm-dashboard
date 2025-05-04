require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize, User, Post, Newsletter, ErrorLog } = require('./models');
const { Permit } = require('permitio');

// Routes
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const errorRoutes = require('./routes/errorRoutes');
const testRoutes = require('./routes/testRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes'); 

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://cm-dashboard-xbo3.vercel.app'
  ]
}));

app.use(express.json());

/* ---------- Routes ---------- */

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/errors', errorRoutes);
app.use('/api/test', testRoutes);
app.use('/api/newsletter', newsletterRoutes);

//Permit.io route
const permitClient = new Permit({
  token: "permit_key_Un2xrtmLinHuMEyRHVtUlUWlSZuFzPOTUoFjhXYAKJffUSZkMlEv2YDG1seQ5mtEFCDP06MSfZnsigdVijgZG3",
  pdp: "https://cloudpdp.api.permit.io",
});

app.post('/api/permissions', async (req, res) => {
  const { userId, action, resource } = req.body;

  try {
    const allowed = await permitClient.check(userId, action, resource);

    if (allowed) {
      return res.status(200).json({ allowed: true });
    } else {
      return res.status(403).json({ allowed: false, message: "Access denied" });
    }
    const { User } = require('./models'); // Assuming 'User' is your model

// Function to create admin and newuser
const createUsers = async () => {
  // Check for existing users
  const adminUser = await User.findOne({ where: { username: 'admin' } });
  const newUser = await User.findOne({ where: { username: 'newuser' } });

  // Create admin user if it doesn't exist
  if (!adminUser) {
    await User.create({
      username: 'admin',
      password: '2025DEVchallenge', // Plain text password
      role: 'admin', // Role for admin user
    });
    console.log('Admin user created!');
  } else {
    console.log('Admin user already exists.');
  }

  // Create newuser if it doesn't exist
  if (!newUser) {
    await User.create({
      username: 'newuser',
      password: '2025DEVchallenge', // Plain text password
      role: 'user', // Role for regular user
    });
    console.log('New user created!');
  } else {
    console.log('New user already exists.');
  }
};

// Call this function before the server starts
createUsers();

  } catch (err) {
    console.error("Permit check failed:", err);
    return res.status(500).json({ allowed: false, message: "Permit check error" });
  }
});


/* ---------- Error Logging Middleware ---------- */
app.use(async (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  try {
    await ErrorLog.create({
      message,
      statusCode,
      stack: err.stack,
      userId: req.user?.id || null,
      path: req.originalUrl,
      method: req.method,
    });
  } catch (logErr) {
    console.error("Failed to log error:", logErr);
  }

  res.status(statusCode).json({
    message,
    details: err.details || null,
  });
});

/* ---------- Sync DB and Start Server ---------- */
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Vuuui! Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("DB Connection failed:", err);
});
