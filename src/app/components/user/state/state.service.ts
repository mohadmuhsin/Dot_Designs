import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category_model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/retrive_categories',{withCredentials:true});
  }

}
