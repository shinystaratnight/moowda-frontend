import { ArraySerializer, Field, ModelSerializer, Type } from 'serialize-ts';
import { Model, PrimitiveSerializer } from 'serialize-ts/dist';
import { CurrentImage } from 'src/models/image';
import { UserCard } from 'src/models/user';

const MESSAGE_ADDED = 'message_added';

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
  @Type(new ArraySerializer(new ModelSerializer(CurrentImage)))
  images: CurrentImage[];
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
  @Type(new ArraySerializer(new ModelSerializer(CurrentImage)))
  images: CurrentImage[];

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

export class MessageEvent {
  type: string;

  static create(data: any): MessageEvent {
    switch (data.type) {
      case MESSAGE_ADDED:
        return new MessageAddedEvent(data.message as Message);
      default:
        throw Error('Wrong type of event');
    }
  }
}

@Model()
export class MessageCreate {

  @Field()
  content: string;
  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  images: number[] = [];

  constructor(message: MessageCreate = null) {
    Object.assign(this, message);
  }
}

export class MessageAddedEvent extends MessageEvent {

  message: Message;

  constructor(message: Message) {
    super();
    this.message = message;
  }
}
