<template>
  <div :class="['sidebar', { collapsed: !isExpanded }]">
    <button @click="toggleSidebar">
      {{ isExpanded ? 'Hide' : 'Show' }} Journal Entries
    </button>
    <div v-if="isExpanded" class="entries-list">
      <h2>Previous Journal Entries</h2>
      <ul>
        <li v-for="entry in entries" :key="entry" @click="fetchEntry(entry)">
          {{ entry }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      entries: [],
      isExpanded: false, // Sidebar is collapsed by default
    };
  },
  created() {
    this.fetchEntries();
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
    },
    async fetchEntries() {
      try {
        const response = await axios.get('http://localhost:3001/api/entries');
        this.entries = response.data.entries;
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    },
    async fetchEntry(date) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/entries/${date}`
        );

        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>Journal Entry for ${date}</title>
              </head>
              <body>
                <h1>Journal Entry for ${date}</h1>
                <pre>${response.data.content}</pre>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Sidebar container */
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #f9f9f9;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  overflow: auto;
  transition: transform 0.3s ease;
}

/* Collapsed state */
.collapsed {
  transform: translateX(100%);
}

/* Toggle button styling */
button {
  margin: 10px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}

/* Entries list styling */
.entries-list {
  padding: 10px;
}

h2 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

li:hover {
  background-color: #eee;
}
</style>
