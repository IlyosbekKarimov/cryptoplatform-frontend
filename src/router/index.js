import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 👇 Auth tekshiruv (agar foydalanuvchi login qilmagan bo‘lsa, login sahifasiga yo‘naltiramiz)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Tokenni tekshiramiz
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
