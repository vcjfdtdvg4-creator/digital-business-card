import { Args, Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DEFAULT_PROFILE_SLUG } from '../common/constants';
import { ExperienceModel } from '../experience/experience.model';
import { GraphQLContext } from '../graphql/graphql-context';
import { ProjectModel } from '../projects/project.model';
import { SkillModel } from '../skills/skill.model';
import { LinkModel, ProfileModel } from './profile.model';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profiles: ProfileService) {}

  @Query(() => ProfileModel, {
    nullable: true,
    description: 'Business card owner profile. Without `slug` returns the default profile.',
  })
  profile(
    @Args('slug', { type: () => String, nullable: true }) slug?: string,
  ): Promise<ProfileModel | null> {
    return this.profiles.findBySlug(slug ?? DEFAULT_PROFILE_SLUG);
  }

  // Nested fields are resolved lazily and batched through DataLoader,
  // so each relation costs at most ONE query and only if it was requested.
  @ResolveField(() => [LinkModel])
  links(@Parent() p: ProfileModel, @Context() ctx: GraphQLContext) {
    return ctx.loaders.links.load(p.id);
  }

  @ResolveField(() => [SkillModel])
  skills(@Parent() p: ProfileModel, @Context() ctx: GraphQLContext) {
    return ctx.loaders.skills.load(p.id);
  }

  @ResolveField(() => [ExperienceModel])
  experience(@Parent() p: ProfileModel, @Context() ctx: GraphQLContext) {
    return ctx.loaders.experience.load(p.id);
  }

  @ResolveField(() => [ProjectModel])
  projects(@Parent() p: ProfileModel, @Context() ctx: GraphQLContext) {
    return ctx.loaders.projects.load(p.id);
  }
}
