export class CreateUserDto {
  public username: string;
  public email: string;
  public password: string;
  public avatarUrl?: string;
  public isPro: boolean;
}
