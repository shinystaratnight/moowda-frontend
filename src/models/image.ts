import { Field, Model } from 'serialize-ts';

@Model()
export class Image {
  @Field()
  id: number;
  @Field()
  url: string;
  @Field()
  height: number;
  @Field()
  width: number;
}

@Model()
export class CurrentImage {
  @Field()
  image: Image;
}
