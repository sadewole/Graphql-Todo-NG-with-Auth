import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Authorized,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { Todo, TodoModel } from '../entities/Todo';
import { TodoInput } from './types/todo-input';
import { User } from '../entities/User';
import { MyContext } from 'src/types/myContext';
import { ApolloError } from 'apollo-server-core';

@Resolver((_of) => Todo)
export class TodoResolver {
  @Query((_returns) => Todo, { nullable: false })
  async returnSingleTodo(@Arg('id') id: string) {
    return await TodoModel.findById({ _id: id });
  }

  @Query(() => [Todo])
  async returnAllTodo() {
    return await TodoModel.find();
  }

  @Authorized()
  @Mutation(() => Todo)
  async createTodo(
    @Arg('data')
    { title }: TodoInput,
    @Ctx() ctx: MyContext
  ): Promise<Todo> {
    const todo = (
      await TodoModel.create({
        title,
        completed: false,
        user_id: ctx.req.session!.userId,
      })
    ).save();
    return todo;
  }

  @Authorized()
  @Mutation(() => Todo)
  async updateTodo(
    @Arg('id') id: string,
    @Arg('data')
    { title, completed }: TodoInput,
    @Ctx() ctx: MyContext
  ): Promise<Todo> {
    const findTodo = await TodoModel.findById(id);
    if (!findTodo) {
      throw new ApolloError('Todo does not exist', 'BAD_REQUEST');
    }

    if (String(findTodo.user_id) !== ctx.req.session!.userId) {
      throw new ApolloError('You can only delete your Todo', 'UNAUTHORISED');
    }

    const todo = (await TodoModel.findByIdAndUpdate(
      id,
      {
        title,
        completed,
      },
      { new: true }
    ))!.save();

    return todo;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteTodo(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const todo = await TodoModel.findById(id);
    if (!todo) {
      return false;
    }

    if (String(todo.user_id) !== ctx.req.session!.userId) {
      throw new ApolloError('You can only delete your Todo', 'UNAUTHORISED');
    }

    await TodoModel.deleteOne({ _id: id });
    return true;
  }

  // Extract user field on Todo using batch operation
  @FieldResolver((_type) => User)
  async user(
    @Root() todo: Todo,
    @Ctx() { userLoader }: MyContext
  ): Promise<User> {
    return await userLoader.load(todo._doc.user_id);
  }
}
