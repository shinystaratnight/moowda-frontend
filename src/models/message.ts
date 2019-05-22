import { Field } from "serialize-ts/dist";
import { UserCard } from "src/models/user";

export class Message {
  @Field()
  id: number;
  @Field()
  created: string;
  @Field()
  user: UserCard;
  @Field()
  content: string;
  @Field()
  images: string[];
}

export class MessageCard {
  @Field()
  id: number;
  @Field()
  created: string;
  @Field()
  user: UserCard;
  @Field()
  content: string;
  @Field()
  images: string[];
}
