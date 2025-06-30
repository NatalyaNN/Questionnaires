import { prisma } from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
   const userId = event.context.user.id;
   const body = await readBody(event);

   return await prisma.survey.create({
      data: {
         title: body.title,
         questions: body.questions,
         creatorId: userId,
      }
   });
});