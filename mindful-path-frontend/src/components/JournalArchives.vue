<!-- src/components/JournalArchives.vue -->
<template>
  <div class="app-container">
    <h1>Mindful Path</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/archives">Journal Archives</router-link> |
      <a href="http://localhost:3001/api/entries/export" download>Export All</a>
    </nav>

    <h2>Journal Archives</h2>
    <ul>
      <li
        v-for="entry in entries"
        :key="entry.date"
        @click="openEntry(entry.date)"
      >
        <strong>{{ entry.date }}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'JournalArchives',
  data() {
    return {
      entries: [],
    };
  },
  created() {
    this.fetchEntries();
  },
  methods: {
    async fetchEntries() {
      try {
        const response = await axios.get('http://localhost:3001/api/entries');
        this.entries = response.data.entries;
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    },
    openEntry(date) {
      this.$router.push({ name: 'JournalEntry', params: { date } });
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
