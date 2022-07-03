import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import 'dotenv/config';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { redis } from './redis';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/*.ts'],
    emitSchemaFile: true,
    // validate: false,
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
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
    context: ({ req, res }) => ({ req, res }),
  });

  const app = Express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    } as any)
  );

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
