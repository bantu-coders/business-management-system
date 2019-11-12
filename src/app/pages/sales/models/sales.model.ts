import { BaseModel } from 'src/app/shared/models/base.model';

export interface Sales extends BaseModel {
  seller: string;
  product: Array<{
    unitPrice: number;
    quantity: number;
    product: string;
  }>;
}
