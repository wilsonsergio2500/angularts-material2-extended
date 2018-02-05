
import { IUser } from './IUser';

export interface IDBSchema {
  users: {
    [userId: string]: IUser
  };
}
