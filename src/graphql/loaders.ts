import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Experience, Link, Project, Skill } from '@prisma/client';
import { ExperienceService } from '../experience/experience.service';
import { ProfileService } from '../profile/profile.service';
import { ProjectsService } from '../projects/projects.service';
import { SkillsService } from '../skills/skills.service';

export interface Loaders {
  links: DataLoader<number, Link[]>;
  skills: DataLoader<number, Skill[]>;
  experience: DataLoader<number, Experience[]>;
  projects: DataLoader<number, Project[]>;
  achievements: DataLoader<number, string[]>;
}

/** Creates a fresh set of DataLoaders per GraphQL request (batching + per-request cache). */
@Injectable()
export class LoadersFactory {
  constructor(
    private readonly profiles: ProfileService,
    private readonly skills: SkillsService,
    private readonly experience: ExperienceService,
    private readonly projects: ProjectsService,
  ) {}

  create(): Loaders {
    return {
      links: new DataLoader((ids) => this.profiles.findLinksByProfileIds(ids)),
      skills: new DataLoader((ids) => this.skills.findByProfileIds(ids)),
      experience: new DataLoader((ids) => this.experience.findByProfileIds(ids)),
      projects: new DataLoader((ids) => this.projects.findByProfileIds(ids)),
      achievements: new DataLoader((ids) => this.experience.findAchievementsByExperienceIds(ids)),
    };
  }
}
