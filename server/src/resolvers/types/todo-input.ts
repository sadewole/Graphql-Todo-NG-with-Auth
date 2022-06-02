import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { Todo } from '../../entities/Todo';
import { ObjectId } from 'mongodb';

@InputType()
export class TodoInput implements Partial<Todo> {
  @Field()
  name: String;

  @Field()
  @Length(1, 255)
  description: String;

  @Field()
  color: String;

  @Field()
  stock: number;

  @Field()
  price: number;

  @Field(() => String)
  category_id: ObjectId;
}
