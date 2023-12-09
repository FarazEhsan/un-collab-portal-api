import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLDriver } from '@nestjs/graphql';
import { ForumModule } from './forum/forum.module';

//I have built the project sucessfully but my schema folder is empty, how do I generate the schema?
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dbuser:Mig21fishbed@cluster0.uwle35d.mongodb.net/un-habitat?retryWrites=true&w=majority'),
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema/schema.gql',
      playground: true,
    }),
    ForumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
