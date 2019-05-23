import { ArraySerializer, Field, ModelSerializer, Type } from 'serialize-ts';
import { Model, PrimitiveSerializer } from 'serialize-ts/dist';
import { UserCard } from 'src/models/user';

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
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  images: string[];
}

@Model()
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
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  images: string[];
}

export class PagingMessageCard {
  @Field()
  count: number;
  @Field()
  @Type(new ArraySerializer(new ModelSerializer(MessageCard)))
  results: MessageCard[];
}
