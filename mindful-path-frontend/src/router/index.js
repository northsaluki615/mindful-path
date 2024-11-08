import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import JournalArchives from '../components/JournalArchives.vue';
import JournalEntry from '../components/JournalEntry.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/archives', name: 'JournalArchives', component: JournalArchives },
  { path: '/entry/:date', name: 'JournalEntry', component: JournalEntry },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
