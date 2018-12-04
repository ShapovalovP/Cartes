export class Login {
  public grant_type: string;

  constructor(
    public username: string,
    public password: string
  ) { this.grant_type = 'password'; }
}
