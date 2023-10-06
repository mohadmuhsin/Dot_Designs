import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket as NgxSocket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  // private readonly url = 'http://localhost:3000';
  private readonly url = 'https://dotdesigns.onrender.com';

  constructor(private http: HttpClient) {}

  userchatlist() {
    return this.http.get(`${this.url}/chat/getUserChatList`, {
      withCredentials: true,
    });
  }

  designerChatlist(id: string | null) {
    return this.http.get(`${this.url}/chat/designerChatlist/${id}`, {
      withCredentials: true,
    });
  }

  makeConnection(id: any) {
    const data = {
      id: id,
    };
    return this.http.post(`${this.url}/chat/makeConnection`, data, {
      withCredentials: true,
    });
  }

  getFullChat(designerId: any) {
    return this.http.get(`${this.url}/chat/getFullChat/${designerId}`, {
      withCredentials: true,
    });
  }

  getFullUserChat(userId: string, designerId: string | null) {
    return this.http.get(
      `${this.url}/chat/getFullUserChat/${userId}/${designerId}`,
      { withCredentials: true }
    );
  }

  sendMessages(data: object) {
    return this.http.post(`${this.url}/chat/sendMessages`, data, {
      withCredentials: true,
    });
  }
}
