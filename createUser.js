const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mentoring-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

async function createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    console.log('User created:', newUser);
}

// Call this function to create a user
createUser('danu@gmail.com', 'Danu123').then(() => mongoose.disconnect());
