import { ObjectType, Field, ID, Int } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { __Type } from 'graphql';

@ObjectType({ description: 'The Todo model' })
export class Todo {
  @Field(() => ID)
  id: String;

  @Field()
  @Property()
  name: String;

  @Field()
  @Property()
  description: String;

  @Field()
  @Property()
  color: String;

  @Field((_type) => Int)
  @Property()
  stock: number;

  @Field((_type) => Int)
  @Property()
  price: number;
}

export const TodoModel = getModelForClass(Todo);
