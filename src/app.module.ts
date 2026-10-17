import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ExperienceModule } from './experience/experience.module';
import { GraphQLContext } from './graphql/graphql-context';
import { LoadersFactory } from './graphql/loaders';
import { LoadersModule } from './graphql/loaders.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    SkillsModule,
    ExperienceModule,
    ProjectsModule,
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
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true, includeCookies: false })],
        context: (): GraphQLContext => ({ loaders: loaders.create() }),
      }),
    }),
  ],
})
export class AppModule {}
