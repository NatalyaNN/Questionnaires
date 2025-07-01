export const useAuth = () => {
   const auth = useState<AuthState>('auth', () => ({
      isAuthenticated: false,
      user: null
   }));

   const signIn = async (credentials: { email: string; password: string }) => {
      try {
         const { user } = await $fetch('/api/auth/login', {
            method: 'POST',
            body: credentials
         });

         auth.value = {
            isAuthenticated: true,
            user
         };

         return user;
      } catch (error) {
         throw error;
      }
   };

   return {
      ...auth.value,
      signIn
   };
};