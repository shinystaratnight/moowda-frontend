import { Field, Model } from 'serialize-ts/dist';

@Model()
export class LoginCredentials {
  @Field()
  username: string;
  @Field()
  password: string;

  constructor(defs: LoginCredentials = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Model()
export class RegistrationCredentials {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;

  constructor(defs: LoginCredentials = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
