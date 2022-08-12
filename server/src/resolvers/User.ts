import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import { User, UserModel } from '../entities/User';
import {
  RegisterInput,
  LoginInput,
  ResetPasswordInput,
} from './types/user-input';
import bcrypt from 'bcryptjs';
import { MyContext } from '../types/myContext';
import { v4 } from 'uuid';
import { redis } from '../redis';
import { sendEmail } from '../utils/sendEmail';
import { forgotPasswordPrefix } from '../constants';
import { ApolloError } from 'apollo-server-core';
import { isValidEmail } from './decorators/validateLoginInputs';
import { validateEmailPassword } from './decorators/validateRegisterInputs';
import 'dotenv/config';

@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User, { nullable: true })
  async returnSingleUser(@Arg('id') id: string): Promise<User | null> {
    return await UserModel.findById({ _id: id });
  }

  @Query(() => [User])
  async returnAllUser() {
    return await UserModel.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    // you are not logged in
    if (!ctx.req.session!.userId) {
      return null;
    }
    return await UserModel.findById(ctx.req.session!.userId);
  }

  @Mutation(() => User)
  @validateEmailPassword(RegisterInput)
  async registerUser(
    @Arg('data')
    { username, email, password }: RegisterInput,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const existUser = await UserModel.findOne({
      email,
    });
    if (existUser) {
      throw new ApolloError('Email already exist', 'AUTH_ERROR');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => User)
  @isValidEmail(LoginInput)
  async loginUser(
    @Arg('data')
    { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const user = await UserModel.findOne({
      email,
    });
    if (!user) {
      throw new ApolloError('Invalid email or password', 'AUTH_ERROR');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new ApolloError('Invalid email or password', 'AUTH_ERROR');
    }

    ctx.req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApolloError('User doesn not exist', 'AUTH_ERROR');
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, 'EX', 60 * 60 * 24); // 1 day expiration

    const url = `http://localhost:3000/reset-password?token=${token}`;
    await sendEmail(email, url);

    return true;
  }

  @Mutation(() => User)
  async resetPassword(
    @Arg('data') data: ResetPasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const { token, password } = data;
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      throw new ApolloError('Invalid token', 'AUTH_ERROR');
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new ApolloError('User does not exist', 'AUTH_ERROR');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    await user.save();
    await redis.del(forgotPasswordPrefix + token);

    ctx.req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  async logoutUser(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }

        ctx.res.clearCookie(process.env.COOKIE_NAME as string);
        return resolve(true);
      });
    });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string) {
    await UserModel.deleteOne({ id });
    return true;
  }
}
