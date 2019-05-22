import { Field } from "serialize-ts/dist";

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
