import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ExperienceModule } from './experience/experience.module';
import { GraphQLContext } from './graphql/graphql-context';
import { LoadersFactory } from './graphql/loaders';
import { LoadersModule } from './graphql/loaders.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';

// Opened in Apollo Sandbox by default, so the card is one click away.
const EXAMPLE_QUERY = `query BusinessCard {
  profile {
    name
    title
    description
    location
    links { label url }
    skills { name category }
    experience { company position period isCurrent achievements }
    projects { name description url technologies }
  }
}
`;

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    SkillsModule,
    ExperienceModule,
    ProjectsModule,
    HealthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [LoadersModule],
      inject: [LoadersFactory],
      useFactory: (loaders: LoadersFactory): ApolloDriverConfig => ({
        autoSchemaFile: true, // code-first, schema kept in memory
        sortSchema: true,
        playground: false,
        introspection: true, // public read-only business card
        // Apollo Sandbox at /graphql (also in production mode)
        plugins: [
          ApolloServerPluginLandingPageLocalDefault({
            embed: true,
            includeCookies: false,
            document: EXAMPLE_QUERY,
          }),
        ],
        context: (): GraphQLContext => ({ loaders: loaders.create() }),
      }),
    }),
  ],
})
export class AppModule {}
