import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { __Type } from 'graphql';

@ObjectType({ description: 'The Todo model' })
export class Todo {
  @Field(() => ID)
  id: String;

  @Field()
  @Property()
  title: String;

  @Field()
  @Property()
  completed: Boolean;
}

export const TodoModel = getModelForClass(Todo);
