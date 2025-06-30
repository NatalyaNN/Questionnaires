import { prisma } from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
   const userId = getCookie(event, 'user-id');
   if (!userId) return { user: null };

   const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
         id: true,
         email: true,
         name: true,
         role: true
      }
   });

   return { user };
});