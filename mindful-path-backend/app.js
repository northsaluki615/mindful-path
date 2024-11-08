require('dotenv').config({ path: '../.env' }); // Adjust the path to point to the top-level .env file

const PORT = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const entriesRouter = require('./routes/entries');
app.use('/api/entries', entriesRouter);

const quotesRouter = require('./routes/quotes');
app.use('/api/quotes', quotesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
