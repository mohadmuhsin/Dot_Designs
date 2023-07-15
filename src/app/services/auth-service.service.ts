import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from 'autoprefixer';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isAuthenticated: boolean = false;

  private readonly url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  signUp(data: any) {
    //user signUP
    return this.http.post(`${this.url}/signUp`, data, {
      withCredentials: true,
    });
  }

  login(data: any) {
    //user login
    return this.http.post(`${this.url}/login`, data, { withCredentials: true });
  }
  verify_user_email(id: any, token: any) {
    let data = { id, token };
    return this.http.patch(`${this.url}/verify`, data, {
      withCredentials: true,
    });
  }

  user() {
    return this.http.get(`${this.url}/user`, { withCredentials: true });
  }
  user_logout() {
    return this.http.post(`${this.url}/logout`, {}, { withCredentials: true });
  }

  // designers
  designer_signup(data: any) {
    console.log('ivdem etheekkkn', data);
    return this.http.post(`${this.url}/designer/designer_signup`, data, {
      withCredentials: true,
    });
  }

  verify_designer_email(id: any, token: any) {
    let data = { id, token };
    return this.http.patch(`${this.url}/designer/verify`, data, {
      withCredentials: true,
    });
  }

  designer_login(data: any) {
    return this.http.post(`${this.url}/designer/login`, data, {
      withCredentials: true,
    });
  }
  designer() {
    return this.http.get(`${this.url}/designer/designer`, {
      withCredentials: true,
    });
  }
  designer_logout() {
    return this.http.post(
      `${this.url}/designer/logout`,
      {},
      { withCredentials: true }
    );
  }
  // guard
  is_Authenticated(): boolean {
    return this.isAuthenticated;
  }

  login_check() {
    console.log('here it issss');

    this.isAuthenticated = true;
    console.log(this.isAuthenticated, 'auth login');
  }

  //

  retrive_Designs(id: any) {
    return this.http.get(`${this.url}/designer/retrive_Designs/${id}`, {
      withCredentials: true,
    });
  }

  // retrive_categories(){
  //   return this.http.get(`${this.url}/designer/retrive_categories`,{withCredentials:true})
  // }

  add_design(data: any) {
    return this.http.post(`${this.url}/designer/add_design`, data, {
      withCredentials: true,
    });
  }

  getDesignData(id: any) {
    return this.http.get(`${this.url}/designer/get_design_data/${id}`, {
      withCredentials: true,
    });
  }

  sendRequest(data:any,token:any){
    const Data ={data,token}
    return this.http.post(`${this.url}/designer/sendRequest`,Data,{withCredentials:true})
  }

  // admin
  admin_login(data: any) {
    return this.http.post(`${this.url}/admin/admin_login`, data, {
      withCredentials: true,
    });
  }

  loadAdmin() {
    return this.http.get(`${this.url}/admin/load_admin`, {
      withCredentials: true,
    });
  }

  admin_logout(token: any) {
    return this.http.post(`${this.url}/admin/logout`, token, {
      withCredentials: true,
    });
  }

  add_category(data: any) {
    return this.http.post(`${this.url}/admin/add_category`, data, {
      withCredentials: true,
    });
  }
  edit_category(data: any) {
    return this.http.post(`${this.url}/admin/edit_category`, data, {
      withCredentials: true,
    });
  }

  getCategory(id: any) {
    return this.http.get(`${this.url}/admin/get_category/${id}`, {
      withCredentials: true,
    });
  }


  getPendingRequest(){
    return this.http.get(`${this.url}/admin/getPendingRequest`,{withCredentials:true})
  }
}
