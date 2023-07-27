import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { io } from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = io('http://localhost:3000')
  

   sendMessage(user: string, designer: string, text: string) {
    this.socket.emit("message", { user, designer, text });
  }

  recieveMessage() {
    const observable = new Observable<{ sender: string, message: string }>(observer => {
      this.socket.on('new_message', (data) => {
        observer.next(data)
      })
      return ()=> {this.socket.disconnect()}
    })
    return observable
  }
  
  //  receiveMessage(): Observable<any> {
  //   return this.socket.fromEvent("new_message");
  // }

}
