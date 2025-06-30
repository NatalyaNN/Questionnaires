import { prisma } from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
   const userId = getCookie(event, 'user-id');
   return await prisma.response.findMany({
     where: { userId: Number(userId) },
     include: { survey: true }
   });
 });