import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Index from '@/views/index.vue'
import About from '@/views/about.vue'
import Showus from '@/views/showus.vue'
import Echo from '@/views/echo.vue'
import ShowPreview from '@/views/showPreview.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/showus',
      name: 'showus',
      component: Showus,
    },
    {
      path: '/echo',
      name: 'echo',
      component: Echo,
    },
    {
      path: '/showPreview',
      name: 'showPreview',
      component: ShowPreview,
    },
    { path: '/:pathMatch(.*)*', name: 'home', component: Index },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 浏览器导航（包括 go(-1) / go(1)）时触发
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
