<!-- src/components/JournalEntry.vue -->
<template>
  <div class="app-container">
    <h1>Mindful Path</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/archives">Journal Archives</router-link> |
      <a href="http://localhost:3001/api/entries/export" download>Export All</a>
    </nav>

    <div v-if="content" v-html="parsedContent"></div>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';
import { marked } from 'marked';

export default {
  name: 'JournalEntry',
  data() {
    return {
      content: '',
    };
  },
  computed: {
    parsedContent() {
      // Converts Markdown content to HTML
      return marked(this.content);
    },
  },
  created() {
    this.fetchEntry();
  },
  methods: {
    async fetchEntry() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/entries/${this.$route.params.date}`
        );
        this.content = response.data.content;
      } catch (error) {
        console.error('Error fetching entry:', error);
        this.content = 'Entry not found.';
      }
    },
  },
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}
nav a {
  color: var(--middle-purple);
  text-decoration: none;
}
nav a:hover {
  color: var(--copper-rose);
}
</style>
