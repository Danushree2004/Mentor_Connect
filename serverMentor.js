const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mentorMenteeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Mongoose schema and model for Mentees
const menteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  course: { type: String, required: true },
});

const Mentee = mongoose.model('Mentee', menteeSchema);

// Mongoose schema and model for Mentors
const mentorSchema = new mongoose.Schema({
  name: String,
  email: String,
  qualification: String,
  years: Number,
  company: String,
  domain: String,
  experience: String,
  education: String,
  skills: String,
  mentorType: String, // 'industrial' or 'institutional'
});

const Mentor = mongoose.model('Mentor', mentorSchema);

// Mentee Registration endpoint
app.post('/api/mentees/register', async (req, res) => {
  const { name, email, password, confirmPassword, course } = req.body;

  // Password match validation
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match!' });
  }

  try {
    // Check if user already exists
    let mentee = await Mentee.findOne({ email });
    if (mentee) {
      return res.status(400).json({ message: 'User already registered!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Mentee
    mentee = new Mentee({
      name,
      email,
      password: hashedPassword,
      course,
    });

    await mentee.save();

    // Return success message
    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Mentor Registration endpoint
app.post('/api/mentors/register', async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    await newMentor.save();
    res.status(201).json(newMentor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register mentor' });
  }
});

// Mentor Profile Update endpoint
app.put('/api/mentors/update-profile', async (req, res) => {
  const { name, qualification, years, company, domain, email, experience, education, skills } = req.body;

  try {
    const mentorId = req.user.id; // Assuming you're using some authentication method to get the mentor's ID

    const updatedMentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { name, qualification, years, company, domain, email, experience, education, skills },
      { new: true }
    );

    if (!updatedMentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    res.json(updatedMentor);
  } catch (error) {
    console.error('Error updating mentor profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch Mentor Profile endpoint
app.get('/api/mentors/profile', async (req, res) => {
  try {
    const mentorId = req.user.id; // Assuming you're using some authentication method to get the mentor's ID
    const mentor = await Mentor.findById(mentorId); // Fetch mentor by ID

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentor profile' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
