import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { groupByKey } from '../common/group-by-key';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly number[]): Promise<Project[][]> {
    const projects = await this.prisma.project.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { position: 'asc' },
    });
    return groupByKey(profileIds, projects, (p) => p.profileId);
  }
}
