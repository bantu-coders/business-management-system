import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BaseService } from 'src/app/shared/services/base.service';
import { ProductCategory } from '../models/product-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends BaseService<ProductCategory> {
  constructor(angularFirestore: AngularFirestore, afAuth: AngularFireAuth) {
    super(angularFirestore, afAuth);
  }

  get model() {
    return 'product-categories';
  }
}
