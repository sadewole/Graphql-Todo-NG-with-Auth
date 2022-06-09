import { Resolver, Mutation, Arg, Query, Authorized } from 'type-graphql';
import { Todo, TodoModel } from '../entities/Todo';
import { TodoInput } from './types/todo-input';

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
    { title }: TodoInput
  ): Promise<Todo> {
    const todo = (
      await TodoModel.create({
        title,
        completed: false,
      })
    ).save();
    return todo;
  }

  @Authorized()
  @Mutation(() => Todo)
  async updateTodo(
    @Arg('id') id: string,
    @Arg('data')
    { title, completed }: TodoInput
  ): Promise<Todo> {
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
  async deleteTodo(@Arg('id') id: string) {
    await TodoModel.deleteOne({ id });
    return true;
  }
}
