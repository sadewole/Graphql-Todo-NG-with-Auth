import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import { User, UserModel } from '../entities/User';
import { RegisterInput, LoginInput } from './types/user-input';
import bcrypt from 'bcryptjs';
import { MyContext } from 'src/types/MyContext';

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

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string) {
    await UserModel.deleteOne({ id });
    return true;
  }
}
