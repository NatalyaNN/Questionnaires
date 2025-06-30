import { prisma } from '~/server/utils/prisma';

export default defineEventHandler(async () => {
   return await prisma.survey.findMany({
      where: { isActive: true },
      include: { creator: { select: { name: true } } }
   });
});