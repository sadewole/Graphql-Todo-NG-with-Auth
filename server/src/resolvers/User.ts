import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { User, UserModel } from '../entities/User';
import { RegisterInput, LoginInput } from './types/user-input';
import bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken'

// const token = (user: { id: any; username: any; email: any; })=> {
//     return jwt.sign({
//         id: user.id,
//         username: user.username,
//         email: user.email
//     }, process.env.JWT_SECRET, {
//         expiresIn: '1h'
//     })
// }

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

  @Mutation(() => User)
  async loginUser(
    @Arg('data')
    login: LoginInput
  ): Promise<User> {
    const user = (
      await UserModel.create({
        ...login,
      })
    ).save();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string) {
    await UserModel.deleteOne({ id });
    return true;
  }
}
