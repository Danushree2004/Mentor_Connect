// routes/mentorRoutes.js
const express = require('express');
const Mentor = require('../models/Mentor');
const router = express.Router();

// Get available slots for a mentor
router.get('/:mentorId/available-slots', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    const availableSlots = mentor.availableSlots.filter(slot => !slot.booked);
    res.json(availableSlots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add available slots for a mentor
router.post('/:mentorId/add-slots', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    const slots = req.body.slots.map(slot => ({ time: slot, booked: false }));
    mentor.availableSlots.push(...slots);
    await mentor.save();
    res.json({ message: 'Slots added successfully', mentor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Book a slot for a mentor
router.post('/:mentorId/book-slot', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const slot = mentor.availableSlots.find(s => s.time === req.body.slot && !s.booked);
    if (!slot) {
      return res.status(400).json({ message: 'Slot not available or already booked' });
    }

    slot.booked = true;
    await mentor.save();

    res.json({ message: 'Slot booked successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
