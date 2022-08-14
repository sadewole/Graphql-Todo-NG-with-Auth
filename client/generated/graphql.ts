import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  loginUser: User;
  logoutUser: Scalars['Boolean'];
  registerUser: User;
  resetPassword: User;
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  data: TodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationRegisterUserArgs = {
  data: RegisterInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationUpdateTodoArgs = {
  data: TodoInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  returnAllTodo: Array<Todo>;
  returnAllUser: Array<User>;
  returnSingleTodo: Todo;
  returnSingleUser?: Maybe<User>;
};


export type QueryReturnSingleTodoArgs = {
  id: Scalars['String'];
};


export type QueryReturnSingleUserArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

/** The Todo model */
export type Todo = {
  __typename?: 'Todo';
  completed: Scalars['Boolean'];
  id: Scalars['ID'];
  title: Scalars['String'];
  user: User;
  user_id: Scalars['ID'];
};

export type TodoInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

/** The User model */
export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type RegularUserFragment = { __typename?: 'User', id: string, email: string, username: string };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'User', id: string, email: string, username: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: string, email: string, username: string } };

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  completed?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', title: string, completed: boolean, id: string } };

export type FetchMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, username: string } | null };

export type FetchTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchTodosQuery = { __typename?: 'Query', returnAllTodo: Array<{ __typename?: 'Todo', id: string, title: string, completed: boolean, user_id: string, user: { __typename?: 'User', id: string, email: string, username: string } }> };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  username
}
    `;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: String!) {
  deleteTodo(id: $id)
}
    `;

export function useDeleteTodoMutation() {
  return Urql.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  loginUser(data: {email: $email, password: $password}) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logoutUser
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  registerUser(data: {username: $username, password: $password, email: $email}) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: String!, $title: String!, $completed: Boolean) {
  updateTodo(id: $id, data: {title: $title, completed: $completed}) {
    title
    completed
    id
  }
}
    `;

export function useUpdateTodoMutation() {
  return Urql.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument);
};
export const FetchMeDocument = gql`
    query FetchMe {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useFetchMeQuery(options?: Omit<Urql.UseQueryArgs<FetchMeQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchMeQuery>({ query: FetchMeDocument, ...options });
};
export const FetchTodosDocument = gql`
    query FetchTodos {
  returnAllTodo {
    id
    title
    completed
    user_id
    user {
      id
      email
      username
    }
  }
}
    `;

export function useFetchTodosQuery(options?: Omit<Urql.UseQueryArgs<FetchTodosQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchTodosQuery>({ query: FetchTodosDocument, ...options });
};