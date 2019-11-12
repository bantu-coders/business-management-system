import { BaseModel } from './base.model';

export interface User extends BaseModel {
  uid: string;
  role: string;
  email: string;
  userName: string;
}
