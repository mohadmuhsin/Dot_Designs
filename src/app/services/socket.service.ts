import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket as NgxSocket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private readonly url = 'https://dotdesigns.site';

  constructor(private http: HttpClient) {}


  userchatlist() {
    return this.http.get(`${this.url}/chat/getUserChatList`, { withCredentials:true})
  }

  designerChatlist(id:string| null) {
    return this.http.get(`${this.url}/chat/designerChatlist/${id}`,{withCredentials:true})
  }


  makeConnection(id: any) {
    const data = {
      id:id
    }
    return this.http.post(`${this.url}/chat/makeConnection`,data,{withCredentials:true})
  }

  getFullChat(designerId: any) {
    return this.http.get(`${this.url}/chat/getFullChat/${designerId}`,{withCredentials:true})
  }

  getFullUserChat(userId: string, designerId: string|null) {
    return this.http.get(`${this.url}/chat/getFullUserChat/${userId}/${designerId}`,{withCredentials:true})
  }

  sendMessages(data: object) {
    return this.http.post(`${this.url}/chat/sendMessages`,data,{withCredentials:true})
  }




















  sendMessage(receiverId: string, message: string) {
    // this.sockett.emit('message', { receiverId, message });
  }

  // recieveMessage() {
  //   return this.sockett.fromEvent<any>('message');
  // }

  getUsers(designerId: any) {
    return this.http.get<any>(`${this.url}/chat/getUsers/${designerId}`, { withCredentials: true });
  }

  getDesigners() {
    return this.http.get(`${this.url}/chat/getDesigners`, { withCredentials: true });
  }

  getChats(userId: any, designerId: any) {
    return this.http.get<any>(`${this.url}/chat/getChats/${userId}/${designerId}`, { withCredentials: true });
  }

  setDesignerNewMessage(message: string, designerId: any, userId: any) {
    const data = {
      message,
      userId,
      designerId
    };
    return this.http.post(`${this.url}/chat/setDesignerNewMessage`, data, { withCredentials: true });
  }

  setUserNewMessage(userId: any, designerId: any, message: any) {
    const data = {
      message,
      userId,
      designerId
    };
    return this.http.post(`${this.url}/chat/setUserNewMessage`, data, { withCredentials: true });
  }
}
