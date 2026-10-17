import { Injectable } from '@nestjs/common';
import { Experience } from '@prisma/client';
import { groupByKey } from '../common/group-by-key';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly number[]): Promise<Experience[][]> {
    const rows = await this.prisma.experience.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { sortOrder: 'asc' },
    });
    return groupByKey(profileIds, rows, (e) => e.profileId);
  }

  /** Returns achievement texts per experience, in the order of the requested ids. */
  async findAchievementsByExperienceIds(experienceIds: readonly number[]): Promise<string[][]> {
    const rows = await this.prisma.achievement.findMany({
      where: { experienceId: { in: [...experienceIds] } },
      orderBy: { position: 'asc' },
    });
    return groupByKey(experienceIds, rows, (a) => a.experienceId).map((group) =>
      group.map((a) => a.text),
    );
  }
}
