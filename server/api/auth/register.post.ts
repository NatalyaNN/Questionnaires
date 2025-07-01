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
         message: 'Пользователь с таким email уже существует'
      });
   }

   // Хеширование пароля
   const hashedPassword = await hash(body.password, 10);

   // Создание пользователя
   const user = await prisma.user.create({
      data: {
         name: body.name,
         email: body.email,
         password: hashedPassword,
         role: 'USER'
      },
      select: {
         id: true,
         email: true,
         name: true,
         role: true
      }
   });

   // Создание профиля
   await prisma.user.create({
      data: {
         id: user.id,
         name: user.name,
         email: user.email,
         password: hashedPassword
      }
   });

   return user;
});