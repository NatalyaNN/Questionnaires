export const useAuth = () => {
   return useState('auth', () => ({
      isAuthenticated: false,
      user: null
   }));
};