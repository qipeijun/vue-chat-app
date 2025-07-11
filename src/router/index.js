import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from '../App.vue'

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: ChatPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
