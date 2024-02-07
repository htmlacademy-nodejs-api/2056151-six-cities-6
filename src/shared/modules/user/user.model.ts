import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  avatarUrl: String,
  isPro: Boolean,
});

export const UserModel = model<UserDocument>('User', userSchema);
