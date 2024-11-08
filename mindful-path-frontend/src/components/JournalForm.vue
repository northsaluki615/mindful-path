<template>
  <div>
    <h2>New Journal Entry</h2>
    <form @submit.prevent="submitEntry">
      <label for="date">Date:</label>
      <input type="date" v-model="date" required />

      <h2>What did you do well today?</h2>
      <textarea v-model="well" rows="3" required></textarea>

      <h2>What did you do poorly?</h2>
      <textarea v-model="poorly" rows="3" required></textarea>

      <h2>What should I do to become a better version of myself?</h2>
      <textarea v-model="better" rows="3" required></textarea>

      <button type="submit">Save Entry</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    const today = new Date().toISOString().slice(0, 10);
    return {
      date: today,
      well: '',
      poorly: '',
      better: '',
    };
  },
  methods: {
    async submitEntry() {
      // Format the content with Header 2 for each question
      const content =
        `# Journal Entry for ${this.date}\n\n` +
        `## What did you do well today?\n${this.well}\n\n` +
        `## What did you do poorly?\n${this.poorly}\n\n` +
        `## What should I do to become a better version of myself?\n${this.better}\n`;

      try {
        await axios.post('http://localhost:3001/api/entries', {
          date: this.date,
          content: content,
        });
        alert('Entry saved successfully');

        // Reset fields to defaults
        this.date = new Date().toISOString().slice(0, 10);
        this.well = '';
        this.poorly = '';
        this.better = '';
      } catch (error) {
        console.error('Error saving entry:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Optional styling for the form */
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
