export default defineNuxtRouteMiddleware((to) => {
   const auth = useAuth();

   if (to.path.startsWith('/admin')) {
      if (!auth.value.isAuthenticated) {
         return navigateTo('/login?redirect=' + to.path);
      }

      if (auth.value.user?.role !== 'ADMIN') {
         throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
            fatal: true
         });
      }
   }
});