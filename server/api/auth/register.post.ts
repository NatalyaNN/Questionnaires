import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
   const { email, password, name } = await readBody(event);

   const hashedPassword = await hash(password, 10);

   const user = await prisma.user.create({
      data: {
         email,
         password: hashedPassword,
         name,
         role: 'USER'
      }
   });

   return { id: user.id, email: user.email };
});