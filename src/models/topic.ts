import { Field, Name } from "serialize-ts/dist";

export class Topic {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  @Name('messages_count')
  messagesCount: number;
  @Field()
  @Name('last_message_data')
  lastMessageDate: string;
}

export class TopicCard {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  @Name('messages_count')
  messagesCount: number;
  @Field()
  @Name('last_message_data')
  lastMessageDate: string;
}
