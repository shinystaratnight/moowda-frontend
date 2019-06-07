import { Field, Model } from 'serialize-ts';

@Model()
export class Image {
  @Field()
  id: number;
  @Field()
  url: string;
}

@Model()
export class CurrentImage {
  @Field()
  image: Image;
}
