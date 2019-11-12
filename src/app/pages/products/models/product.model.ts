import { BaseModel } from 'src/app/shared/models/base.model';

export interface Product extends BaseModel {
  name: string;
  quantity: number;
  price: number;
  category: string;
}
