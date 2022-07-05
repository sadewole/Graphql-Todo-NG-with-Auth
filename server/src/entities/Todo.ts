import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { User } from './User';
import { Ref } from 'src/types/dbRef';

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

  @Field((_type) => String)
  @Property({ ref: User, required: true })
  user_id: Ref<User>;
  _doc: any;
}

export const TodoModel = getModelForClass(Todo);
