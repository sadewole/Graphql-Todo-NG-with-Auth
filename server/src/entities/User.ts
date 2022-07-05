import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType({ description: 'The User model' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  username: string;

  @Field()
  @Property({ unique: true, required: true })
  email: string;

  @Property({ required: true })
  password: string;
}

export const UserModel = getModelForClass(User);
