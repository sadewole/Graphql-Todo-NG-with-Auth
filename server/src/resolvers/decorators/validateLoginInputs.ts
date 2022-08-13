import { UserInputError } from 'apollo-server-core';
import { ClassType, createMethodDecorator } from 'type-graphql';
import { isEmailAddress } from '../../utils/emailValidator';

export function isValidEmail<T extends object>(Type: ClassType<T>) {
  return createMethodDecorator(async ({ args }, next) => {
    const instance = Object.assign(new Type(), args);
    if (!isEmailAddress(instance.data.email)) {
      throw new UserInputError('Invalid email address.', {
        argumentName: 'email',
      });
    }
    return next();
  });
}
