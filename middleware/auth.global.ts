export default defineNuxtRouteMiddleware(async (to) => {
   const auth = useAuth();
   const publicRoutes = ['/login', '/register'];

   if (publicRoutes.includes(to.path)) return;

   try {
      const { user } = await $fetch('/api/auth/me');
      auth.value = { isAuthenticated: true, user };
   } catch {
      return navigateTo('/login?redirect=' + to.path);
   }
});