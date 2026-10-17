import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Experience')
export class ExperienceModel {
  @Field(() => ID) id: number;
  @Field() company: string;
  @Field(() => String, { nullable: true }) companyUrl?: string | null;
  @Field() position: string;
  @Field(() => String, { nullable: true }) location?: string | null;
  @Field(() => Date) startDate: Date;
  @Field(() => Date, { nullable: true, description: 'null means "until now"' })
  endDate?: Date | null;
}
