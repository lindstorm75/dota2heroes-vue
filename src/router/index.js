import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: "/:name",
    name: "HeroDetail",
    component: () => import("../views/HeroDetail.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: { name: "NotFound" },
    component: () => import("../views/NotFound.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
