import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chating',
  templateUrl: './chating.component.html',
  styleUrls: ['./chating.component.css']
})
export class ChatingComponent implements OnInit {
  user!: string ;
  message: any;
  private socket = io('http://localhost:3000')

  constructor(private activeRoute: ActivatedRoute,
  private chatService: SocketService) {
    
   console.log(chatService, "chatting");
    this.chatService.recieveMessage().subscribe((text:any) => {
       console.log(text);
    })
  }
  
    ngOnInit(): void {
      this.activeRoute.paramMap.subscribe((params) => {
      // this.user = params.get('id');
    });
    }
  
  sender: any = localStorage.getItem('designerId')
  sendMessage() {
    console.log(this.message,"dklfk");
    
    this.chatService.sendMessage(this.user,this.sender,this.message)
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

}
