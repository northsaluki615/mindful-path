const express = require('express');
const axios = require('axios');

const router = express.Router();
const STOIC_QUOTES_API = 'https://stoic-quotes.com/api/quote';

// Fetch a random Stoic quote
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(STOIC_QUOTES_API);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote' });
  }
});

module.exports = router;
