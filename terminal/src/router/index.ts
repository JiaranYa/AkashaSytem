import { createRouter, createWebHistory } from 'vue-router'
import HomeView from 'src/views/HomeView.vue'
import Display from 'src/views/Display.vue'
import NotFound from 'src/views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound 
    },
    {
      path: '/display/',
      name: 'display',
      component: Display
    }
  ]
})

export default router
