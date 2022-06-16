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
@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async returnSingleUser(@Arg('id') id: string) {
    return await UserModel.findById({ _id: id });
  }

  @Query(() => [User])
  async returnAllUser() {
    return await UserModel.find();
  }

  @Query(() => User, { nullable: false })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    if (!ctx.req.session!.userId) {
      return null;
    }
    return await UserModel.findById(ctx.req.session!.userId);
  }

  @Mutation(() => User)
  async registerUser(
    @Arg('data')
    { username, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = (
      await UserModel.create({
        username,
        email,
        password: hashedPassword,
      })
    ).save();
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async loginUser(
    @Arg('data')
    { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, 'EX', 60 * 60 * 24); // 1 day expiration

    const url = `http://localhost:3000/reset-password?token=${token}`;
    await sendEmail(email, url);

    return true;
  }

  @Mutation(() => User, { nullable: false })
  async resetPassword(
    @Arg('data') data: ResetPasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const { token, password } = data;
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      return null;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return null;
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

        ctx.res.clearCookie('qid');
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
