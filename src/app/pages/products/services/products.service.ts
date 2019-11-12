import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BaseService } from 'src/app/shared/services/base.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product> {
  constructor(angularFirestore: AngularFirestore, afAuth: AngularFireAuth) {
    super(angularFirestore, afAuth);
  }

  get model() {
    return 'products';
  }
}
