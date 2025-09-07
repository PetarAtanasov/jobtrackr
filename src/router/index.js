import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/List.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'list', component: List },
    { path: '/new', name: 'new', component: () => import('../views/Edit.vue') },
    { path: '/edit/:id', name: 'edit', component: () => import('../views/Edit.vue') },
    { path: '/stats', name: 'stats', component: () => import('../views/Stats.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
