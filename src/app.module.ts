import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLDriver } from '@nestjs/graphql';
import { ForumEventsModule } from './forum-events/forum-events.module';

//I have built the project sucessfully but my schema folder is empty, how do I generate the schema?
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/un-habitat'),
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema/schema.gql',
      playground: true,
    }),
    ForumEventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
