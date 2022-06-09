import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { __Type } from 'graphql';

@ObjectType({ description: 'The Todo model' })
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  title: string;

  @Field()
  @Property()
  completed: boolean;
}

export const TodoModel = getModelForClass(Todo);
