export const useAuth = () => {
   return useState<AuthState>('auth', () => ({
      isAuthenticated: false,
      user: null
   }));
};