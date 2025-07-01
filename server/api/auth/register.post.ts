import { hash } from 'bcrypt';
import { prisma } from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
   const body = await readBody(event);

   // Проверка существования пользователя
   const exists = await prisma.user.findUnique({
      where: { email: body.email }
   });

   if (exists) {
      throw createError({
         statusCode: 400,
         message: 'User already exists'
      });
   }

   const hashedPassword = await hash(body.password, 10);

   return await prisma.user.create({
      data: {
         name: body.name,
         email: body.email,
         password: hashedPassword,
         role: 'USER'
      },
      select: { // Не возвращаем пароль!
         id: true,
         email: true,
         name: true,
         role: true
      }
   });
});