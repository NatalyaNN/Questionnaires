import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
   const body = await readBody(event);

   try {
      const response = await prisma.surveyResponse.create({
         data: {
            answers: body.answers
         }
      });

      return { success: true, id: response.id };
   } catch (error) {
      console.error('Error saving survey response:', error);
      throw createError({
         statusCode: 500,
         statusMessage: 'Could not save survey response'
      });
   }
});