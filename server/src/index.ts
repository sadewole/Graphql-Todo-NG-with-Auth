import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import * as Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import 'dotenv/config';

import { TodoResolver } from './resolvers/Todo';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolver],
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
