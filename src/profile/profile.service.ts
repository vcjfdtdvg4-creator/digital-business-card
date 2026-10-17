import { Injectable } from '@nestjs/common';
import { Link, Profile } from '@prisma/client';
import { groupByKey } from '../common/group-by-key';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findBySlug(slug: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({ where: { slug } });
  }

  /** Batch loader: one query for any number of profiles. */
  async findLinksByProfileIds(profileIds: readonly number[]): Promise<Link[][]> {
    const links = await this.prisma.link.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { position: 'asc' },
    });
    return groupByKey(profileIds, links, (l) => l.profileId);
  }
}
