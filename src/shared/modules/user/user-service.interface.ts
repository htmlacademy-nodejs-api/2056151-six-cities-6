import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from '../offer/dto/create-user.dto.js';
import { User } from '../../types/user.type.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<User>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
}
