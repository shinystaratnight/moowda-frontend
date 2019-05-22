import { Field } from "serialize-ts/dist";

export class User {
  @Field()
  id: number;
  @Field()
  username: string;
}

export class UserCard {
  @Field()
  id: number;
  @Field()
  username: string;
}
