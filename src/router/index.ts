import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        component: DefaultLayout,
        children:[
          {
            path: '/',
            component: ()=>import('../modules/dashboard/Dashboard.vue')
          }
        ]
      }
  ],
})

export default router
