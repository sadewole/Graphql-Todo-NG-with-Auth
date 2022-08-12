import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache';
import {
  FetchMeDocument,
  FetchMeQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
} from '../generated/graphql';

function updateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  cb: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => cb(result, data as any) as any);
}

const client = createClient({
  url: 'http://localhost:3333/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logoutUser: (_result, _args, _cache, _info) => {
            updateQuery<LogoutMutation, FetchMeQuery>(
              _cache,
              { query: FetchMeDocument },
              _result,
              () => ({ me: null })
            );
          },
          loginUser: (_result, _args, _cache, _info) => {
            updateQuery<LoginMutation, FetchMeQuery>(
              _cache,
              { query: FetchMeDocument },
              _result,
              (result, query) => {
                if (result.loginUser) {
                  return {
                    me: result.loginUser,
                  };
                }
                return query;
              }
            );
          },
          registerUser: (_result, _args, _cache, _info) => {
            updateQuery<RegisterMutation, FetchMeQuery>(
              _cache,
              { query: FetchMeDocument },
              _result,
              (result, query) => {
                if (result.registerUser) {
                  return {
                    me: result.registerUser,
                  };
                }
                return query;
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
