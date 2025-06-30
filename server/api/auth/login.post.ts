import { compare } from 'bcrypt';
import { prisma } from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
   const { email, password } = await readBody(event);

   try {
      const user = await prisma.user.findUnique({
         where: { email }
      });

      if (!user) {
         throw createError({
            statusCode: 401,
            message: 'Invalid credentials'
         });
      }

      // Сравниваем пароль с хешем из БД
      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
         throw createError({
            statusCode: 401,
            message: 'Invalid credentials'
         });
      }

      setCookie(event, 'user-id', user.id.toString(), {
         httpOnly: true,
         maxAge: 60 * 60 * 24 * 7 // 1 неделя
      });
      /*
      setCookie(event, 'auth-token', 'generateJWT(user)', { 
         httpOnly: true,
         maxAge: 60 * 60 * 24 * 7
      });
      */

      return {
         success: true,
         user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
         }
      };
   } catch (error) {
      // console.error('Login error:', error);
      throw error;
   }
});