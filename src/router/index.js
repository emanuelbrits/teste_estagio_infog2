import { useAuth } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      name: 'utilitarios',
      component: () => import('../views/UtilitariosView.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuth()
    if(auth.token && auth.user) {
      if (auth.token === auth.user.token) {
        next()
      }
    } else {
      next({name: 'login'})
    }
    console.log(to.name);
  } else {
    next()
  }
})

export default router
