import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
 

  private readonly url = 'http://localhost:3000'
  constructor(private http:HttpClient) {}

  signUp(data:any){//user signUP
    console.log("it is in servive");
    
    return this.http.post(`${this.url}/signUp`,data,{withCredentials:true})
  }
  

  login(data:any){//user login
    return this.http.post(`${this.url}/login`,data,{withCredentials:true})
  }
}
