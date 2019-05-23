import { Field, Model } from 'serialize-ts/dist';

@Model()
export class User {
  @Field()
  id: number;
  @Field()
  username: string;
}

@Model()
export class UserCard {
  @Field()
  id: number;
  @Field()
  username: string;
}
