import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Sales } from '../models/sales.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SalesService extends BaseService<Sales> {
  constructor(angularFirestore: AngularFirestore, afAuth: AngularFireAuth) {
    super(angularFirestore, afAuth);
  }

  get model() {
    return 'sales';
  }
}
