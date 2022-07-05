import { UserInputError } from 'apollo-server-core';
import { ClassType, createMethodDecorator } from 'type-graphql';

function isEmailAddress(str: string): boolean {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(str);
}

export function validateEmailPassword<T extends object>(Type: ClassType<T>) {
  return createMethodDecorator(async ({ args }, next) => {
    const instance = Object.assign(new Type(), args);
    if (!isEmailAddress(instance.data.email)) {
      throw new UserInputError('Invalid email address.', {
        argumentName: 'email',
      });
    }
    if (
      instance.data.password === undefined ||
      instance.data.password.length < 3
    ) {
      throw new UserInputError('Password must be at least 3 characters.', {
        argumentName: 'password',
      });
    }
    return next();
  });
}
