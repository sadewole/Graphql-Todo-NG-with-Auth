import { InputType, Field } from 'type-graphql';
import { Todo } from '../../entities/Todo';

@InputType()
export class TodoInput implements Partial<Todo> {
  @Field()
  title: string;

  @Field({ nullable: true })
  completed?: boolean;
}
