import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/despesas',
      name: 'despesas',
      component: () => import('../components/Despesas.vue'),
    },
    {
      path: '/adicionar',
      name: 'adicionar',
      component: () => import('../components/Adicionar.vue'),
    }

  ],

})

export default router
