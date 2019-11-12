import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
interface BaseEntity {
  id: string;
}

export class BaseService<T> {
  constructor(
    private readonly angularFirestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  get model(): string {
    throw Error('Model not set');
  }

  findAll(where?: any): Observable<any[]> {
    if (where) {
      const collection = this.angularFirestore.collection<any>(this.model);

      const query = collection.ref.where(
        where.key,
        where.operator,
        where.value
      );

      return new Observable(observer => {
        query.get().then(
          snapshot => {
            const results: any[] = snapshot.docs.map(doc => {
              return { ...doc.data(), id: doc.id };
            });
            observer.next(results);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      });
    }
    return this.angularFirestore
      .collection<T>(this.model)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            return { ...a.payload.doc.data(), id: a.payload.doc.id };
          })
        )
      );
  }
  findById(id: string): Observable<any> {
    return this.angularFirestore
      .collection<T>(this.model)
      .doc<T>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((content: any) => {
          return { ...content, id };
        })
      );
  }

  create(content: T): Observable<any> {
    return new Observable(observer => {
      this.angularFirestore
        .collection<T>(this.model)
        .add(content)
        .then(
          post => {
            observer.next(post.id);
            observer.complete();
          },
          error => observer.error(error)
        );
    });
  }

  update(id: string, content: T): Observable<any> {
    return new Observable(observer => {
      this.angularFirestore
        .collection<T>(this.model)
        .doc(id)
        .update(content)
        .then(
          () => {
            observer.next('updated');
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  delete(id: string): Observable<any> {
    return new Observable(observer => {
      this.angularFirestore
        .collection<T>(this.model)
        .doc(id)
        .delete()
        .then(
          () => {
            observer.next('deleted');
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }
}
