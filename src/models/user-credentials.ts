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

  constructor(defs: RegistrationCredentials = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Model()
export class RestoreRequestCredentials {
  @Field()
  email: string;

  constructor(defs: RestoreRequestCredentials = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Model()
export class RestorePasswordCredentials {
  @Field()
  password: string;

  @Field()
  hash: string;

  constructor(defs: RestorePasswordCredentials = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

