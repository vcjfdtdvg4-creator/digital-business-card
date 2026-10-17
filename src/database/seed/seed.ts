import { PrismaClient } from '@prisma/client';
import { experience, links, profileData, projects, skills } from './profile.data';

/**
 * Idempotent: removes the profile with the same slug (children are removed by
 * ON DELETE CASCADE) and re-creates it with nested writes in one transaction.
 */
export async function seedProfile(prisma: PrismaClient): Promise<void> {
  await prisma.$transaction([
    prisma.profile.deleteMany({ where: { slug: profileData.slug } }),
    prisma.profile.create({
      data: {
        ...profileData,
        links: {
          create: links.map((l, position) => ({ ...l, position })),
        },
        skills: {
          create: skills
            .flatMap((group) => group.names.map((name) => ({ name, category: group.category })))
            .map((s, position) => ({ ...s, position })),
        },
        experiences: {
          create: experience.map(({ achievements, ...e }, sortOrder) => ({
            ...e,
            sortOrder,
            achievements: {
              create: achievements.map((text, position) => ({ text, position })),
            },
          })),
        },
        projects: {
          create: projects.map((p, position) => ({ ...p, position })),
        },
      },
    }),
  ]);
}
