import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
  public username: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: false, default: '' })
  public avatarUrl: string;

  @prop({ required: true })
  public isPro: boolean;
}

export const UserModel = getModelForClass(UserEntity);
