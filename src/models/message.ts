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

  constructor(message: Message = null) {
    if (!!message) {
      Object.assign(this, message);
    }
  }
}

export class PagingMessageCard {
  @Field()
  count: number;
  @Field()
  @Type(new ArraySerializer(new ModelSerializer(MessageCard)))
  results: MessageCard[];
}
