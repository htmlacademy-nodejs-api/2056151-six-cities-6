import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  avatarUrl: String,
  isPro: Boolean,
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
