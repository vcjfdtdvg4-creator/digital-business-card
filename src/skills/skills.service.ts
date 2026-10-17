import { Injectable } from '@nestjs/common';
import { Skill } from '@prisma/client';
import { groupByKey } from '../common/group-by-key';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly number[]): Promise<Skill[][]> {
    const skills = await this.prisma.skill.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { position: 'asc' },
    });
    return groupByKey(profileIds, skills, (s) => s.profileId);
  }
}
