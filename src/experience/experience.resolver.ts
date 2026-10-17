import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from '../graphql/graphql-context';
import { ExperienceModel } from './experience.model';

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  @ResolveField(() => [String])
  achievements(@Parent() e: ExperienceModel, @Context() ctx: GraphQLContext) {
    return ctx.loaders.achievements.load(e.id);
  }

  @ResolveField(() => Boolean)
  isCurrent(@Parent() e: ExperienceModel): boolean {
    return e.endDate == null;
  }
}
