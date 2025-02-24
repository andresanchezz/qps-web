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
          },
          {
            path: '/calendar',
            component: ()=>import('../modules/calendar/CalendarView.vue')
          },
          {
            path: '/communities',
            component: ()=>import('../modules/communities/CommunitiesView.vue')
          },
          {
            path: '/companies',
            component: ()=>import('../modules/companies/CompaniesView.vue')
          },
          {
            path: '/costs',
            component: ()=>import('../modules/costs/CostsView.vue')
          },
          {
            path: '/extras',
            component: ()=>import('../modules/extras/ExtrasView.vue')
          },
          {
            path: '/services',
            component: ()=>import('../modules/services/ServicesView.vue')
          },
          {
            path: '/statuses',
            component: ()=>import('../modules/statuses/StatusesView.vue')
          },
          {
            path: '/types',
            component: ()=>import('../modules/types/TypesView.vue')
          },
          {
            path: '/users',
            component: ()=>import('../modules/users/UsersView.vue')
          },

        ]
      }
  ],
})

export default router
