export default defineNuxtRouteMiddleware((to) => {
   const auth = useAuth();
   if (to.path.startsWith('/admin') && auth.value.user?.role !== 'ADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' });
   }
});