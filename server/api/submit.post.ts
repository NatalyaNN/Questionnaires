import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
   const body = await readBody(event);

   try {
      JSON.stringify(body.answers);
   } catch (error) {
      throw createError({
         statusCode: 400,
         message: 'Invalid data format'
      });
    }
});