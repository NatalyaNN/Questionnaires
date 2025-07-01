import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
   const auth = useAuth();

   // Если пользователь не авторизован и пытается получить доступ к защищенному маршруту
   if (to.meta.requiresAuth && !auth.isAuthenticated) {
      return navigateTo('/login');
   }

   // Если пользователь авторизован и пытается получить доступ к странице входа
   if (to.path === '/login' && auth.isAuthenticated) {
      return navigateTo('/');
   }
});