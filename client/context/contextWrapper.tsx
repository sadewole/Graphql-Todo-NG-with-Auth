import { useState, createContext, useContext, ReactNode } from 'react';
import { useFetchUserQuery, User } from '../generated/graphql';

export const Context = createContext({});

export const useContextWrapper = () => useContext(Context);

export const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const [{ data, fetching, error }, _] = useFetchUserQuery();

  const [user, setUser] = useState<User | undefined | null>(data?.me);

  if (fetching) {
    return <h1>Loading....</h1>;
  }

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};
