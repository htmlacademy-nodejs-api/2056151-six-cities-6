import { User } from '../../types/index.js';

export class UserEntity implements User {
  public username: string;
  public email: string;
  public password: string;
  public avatarUrl?: string;
  public isPro: boolean;
}
