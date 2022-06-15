import { InputType, Field } from 'type-graphql';
import { IsEmail, Length, MinLength } from 'class-validator';
import { User } from '../../entities/User';
import { IsEmailAlreadyExist } from '../validators/IsEmailAlreadyExist';

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  username: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already exists' })
  email: string;

  @Field()
  @MinLength(3)
  password: string;
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class ResetPasswordInput implements Partial<User> {
  @Field()
  token: string;

  @Field()
  @MinLength(3)
  password: string;
}
