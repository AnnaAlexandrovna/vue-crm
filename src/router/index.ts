import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import UserView from '../views/UserView.vue';
import UsersSearchView from '../views/UsersSearchView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: UsersSearchView
  },
  {
    path: '/user/:id',
    name: 'about',
    component: UserView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
