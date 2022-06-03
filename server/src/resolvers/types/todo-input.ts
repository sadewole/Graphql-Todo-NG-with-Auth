import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { Todo } from '../../entities/Todo';

@InputType()
export class TodoInput implements Partial<Todo> {
  @Field()
  @Length(1, 255)
  title: String;

  @Field({ nullable: true })
  completed?: Boolean;
}
