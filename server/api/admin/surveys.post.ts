import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
   const userId = getCookie(event, 'user-id');
   const body = await readBody(event);

   return await prisma.survey.create({
      data: {
         title: body.title,
         questions: body.questions,
         creatorId: Number(userId)
      }
   });
});