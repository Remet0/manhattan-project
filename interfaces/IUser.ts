export interface IUser {
  username: string;
  admin: string;
  follows: IUser[];
  followers: IUser[];
  name?: string;
  age?: number;
  bio?: string;
}
