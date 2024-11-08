<template>
  <div>
    <h2>Daily Stoic Quote</h2>
    <p>{{ quote.text }}</p>
    <p>
      <em>- {{ quote.author }}</em>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      quote: {},
    };
  },
  created() {
    this.fetchQuote();
  },
  methods: {
    async fetchQuote() {
      try {
        const response = await axios.get('http://localhost:3001/api/quotes');
        this.quote = response.data;
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for the quote component here */
</style>
