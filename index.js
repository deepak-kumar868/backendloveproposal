const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MongoDB
const mongoURI = 'mongodb+srv://deepakkr:5vNB5Bg3hC3EcwwO@cluster0.aymup.mongodb.net/Loveproposal';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a schema and model for the responses
const responseSchema = new mongoose.Schema({
    choice: String,
});

const Response = mongoose.model('Response', responseSchema);

app.use(bodyParser.json());
app.use(cors());

// API endpoint to save the response to the database
app.post('/api/response', async (req, res) => {
    const choice = req.body.choice;
    try {
        const response = new Response({ choice });
        await response.save();
        res.status(201).json({ message: 'Response saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error saving response' });
    }
});
app.get('/', (req, res) => {
    res.send('Hello, this is your API root.');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app
