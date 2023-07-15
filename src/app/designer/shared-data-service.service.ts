import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {
  private sharedDataSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  setSharedData(data: boolean): void {
    this.sharedDataSubject.next(data);
  }

  getSharedData(): Observable<boolean> {
    return this.sharedDataSubject.asObservable();
  }

}
