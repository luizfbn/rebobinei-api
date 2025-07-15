import { User } from '../entities/user.entity';

export type UserDetailsOutputDTO = Omit<User, 'password'>;
