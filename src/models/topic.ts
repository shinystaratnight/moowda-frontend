import { Field, Name } from 'serialize-ts/dist';

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
}


export class TopicItem {
  constructor(public card: TopicCard,
              public newMessages: number = 0) {
  }
}

export class TopicEvent {
  type: string;

  static create(data: any): TopicEvent {
    switch (data.type) {
      case TOPIC_MESSAGE_ADDED:
        return new TopicMessageAddedEvent(data.topic as Topic);
      case TOPIC_CREATED:
        return new TopicCreatedEvent(data.topic as Topic);
      default:
        throw Error('Wrong type of event');
    }
  }
}

export class TopicMessageAddedEvent extends TopicEvent {

  topic: Topic;

  constructor(topic: Topic) {
    super();
    this.topic = topic;
  }
}

export class TopicCreatedEvent extends TopicEvent {

  topic: Topic;

  constructor(topic: Topic) {
    super();
    this.topic = topic;
  }
}
