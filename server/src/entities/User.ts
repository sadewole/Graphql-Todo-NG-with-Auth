import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { __Type } from 'graphql';

@ObjectType({ description: 'The User model' })
export class User {
  @Field(() => ID)
  id: String;

  @Field()
  @Property()
  username: String;

  @Field()
  @Property({ unique: true, required: true })
  email: String;

  @Property({ required: true })
  password: String;
}

export const UserModel = getModelForClass(User);
