export default defineNuxtPlugin(async () => {
   const auth = useAuth();

   if (!auth.value.isAuthenticated) {
      try {
         const { data } = await useFetch('/api/auth/me');
         if (data.value) {
            auth.value = {
               isAuthenticated: true,
               user: data.value.user
            };
         }
      } catch (error) {
         console.error('Auth init error:', error);
      }
   }
});