import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectModel {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field() description: string;
  @Field(() => String, { nullable: true }) url?: string | null;
  @Field(() => [String]) technologies: string[];
}
