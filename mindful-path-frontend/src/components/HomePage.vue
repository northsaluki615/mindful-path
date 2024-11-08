<!-- src/components/HomePage.vue -->
<template>
  <div class="app-container">
    <h1>Mindful Path</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/archives">Journal Archives</router-link> |
      <a href="http://localhost:3001/api/entries/export" download>Export All</a>
    </nav>
    <QuoteComponent />
    <JournalForm />
  </div>
</template>

<script>
import QuoteComponent from '../components/QuoteComponent.vue';
import JournalForm from '../components/JournalForm.vue';

export default {
  name: 'HomePage',
  components: {
    QuoteComponent,
    JournalForm,
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
