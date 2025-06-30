declare interface AuthUser {
   id: number;
   email: string;
   name: string | null;
   role: 'USER' | 'ADMIN';
}

declare interface AuthState {
   isAuthenticated: boolean;
   user: AuthUser | null;
 }