import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {
  private sharedDataSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private adminName:BehaviorSubject<string> = new BehaviorSubject<string>('')
  private DesignerName!: string
  

  setSharedData(data: boolean): void {
    this.sharedDataSubject.next(data);
  }

  getSharedData(): Observable<boolean> {
    return this.sharedDataSubject.asObservable();
  }

  setAdminName(name: string): void{
    this.adminName.next(name)
  }

  getAdminName(): Observable<string>{
    return this.adminName.asObservable()
  }
  
  setDesignerName(name: string): void{
    console.log(name,"dksfdkl ");
    
    this.DesignerName = name
  }

  getDesignerName(){
    return this.DesignerName
  }

}
