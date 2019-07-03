import { deserialize, Field, Model, Name } from 'serialize-ts/dist';

const TOPIC_MESSAGE_ADDED = 'topic_message_added';
const TOPIC_CREATED = 'topic_created';

export class Topic {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  @Name('messages_count')
  messagesCount: number;
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
  @Name('unread_messages_count')
  unreadMessagesCount: number;
}

export class TopicEvent {
  type: string;

  static create(data: any): TopicEvent {
    switch (data.type) {
      case TOPIC_MESSAGE_ADDED:
        return new TopicMessageAddedEvent(deserialize(data.topic, TopicCard));
      case TOPIC_CREATED:
        return new TopicCreatedEvent(deserialize(data.topic, TopicCard));
      default:
        throw Error('Wrong type of event');
    }
  }
}

export class TopicMessageAddedEvent extends TopicEvent {

  topic: TopicCard;

  constructor(topic: TopicCard) {
    super();
    this.topic = topic;
  }
}

export class TopicCreatedEvent extends TopicEvent {

  topic: TopicCard;

  constructor(topic: TopicCard) {
    super();
    this.topic = topic;
  }
}

@Model()
export class CreateTopicCredentials {
  @Field()
  title: string;

  constructor(defs: CreateTopicCredentials = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
