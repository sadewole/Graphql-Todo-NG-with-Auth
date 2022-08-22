export type Item<T> = {
  [K in keyof T as Exclude<K, 'user_id'>]: T[K];
};
