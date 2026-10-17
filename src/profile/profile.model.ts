import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Link')
export class LinkModel {
  @Field(() => ID) id: number;
  @Field() label: string;
  @Field() url: string;
}

@ObjectType('Profile')
export class ProfileModel {
  @Field(() => ID) id: number;
  @Field() slug: string;
  @Field() name: string;
  @Field({ description: 'Professional headline' }) title: string;
  @Field() description: string;
  @Field(() => String, { nullable: true }) location?: string | null;
}
