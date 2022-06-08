import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import 'dotenv/config';

import { TodoResolver } from './resolvers/Todo';
import { UserResolver } from './resolvers/User';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolver, UserResolver],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = connect(
    `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@atlascluster.0wbfp81.mongodb.net/?retryWrites=true&w=majority`
  );

  (await mongoose).connection;

  const server = new ApolloServer({
    schema,
    formatError: (error) => {
      return error;
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  const app = Express();

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, 'error');
});
