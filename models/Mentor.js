// models/Mentor.js
const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  time: String,
  booked: {
    type: Boolean,
    default: false,
  },
});

const MentorSchema = new mongoose.Schema({
  name: String,
  availableSlots: [SlotSchema],
});

const Mentor = mongoose.model('Mentor', MentorSchema);

module.exports = Mentor;
