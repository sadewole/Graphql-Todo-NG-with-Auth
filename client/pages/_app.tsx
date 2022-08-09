import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createClient, Provider } from 'urql';
import { ContextWrapper } from '../context/contextWrapper';

const client = createClient({
  url: 'http://localhost:3333/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ContextWrapper>
        <Component {...pageProps} />
      </ContextWrapper>
    </Provider>
  );
}

export default MyApp;
