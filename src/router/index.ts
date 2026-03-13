import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/first',
      name: 'home',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: 'first',
          name: 'first',
          component: () => import('@/views/first/index.vue'),
        },
      ],
    },
  ],
})

export default router
