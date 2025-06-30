import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
   try {
      const responses = await prisma.surveyResponse.findMany({
         select: {
            id: true,
            createdAt: true,
            answers: true
         },
         orderBy: {
            createdAt: 'desc'
         }
      });

      return responses;
   } catch (error) {
      console.error('Error fetching responses:', error);
      throw createError({
         statusCode: 500,
         statusMessage: 'Could not fetch survey responses'
      });
   }
});