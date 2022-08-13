import { InputType, Field } from 'type-graphql';
import { User } from '../../entities/User';

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class ResetPasswordInput implements Partial<User> {
  @Field()
  token: string;

  @Field()
  password: string;
}
