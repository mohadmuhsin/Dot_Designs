import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from 'src/app/emitter/emitter';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message!: string 
  designer: any
  

  constructor(private activeRoute:ActivatedRoute,
    private chatService: SocketService) {
    console.log(chatService, "chatting");
    this.chatService.recieveMessage().subscribe((text:any) => {
    console.log(text);
    })
    
  }

  ngOnInit(): void {
     this.activeRoute.paramMap.subscribe((params) => {
       this.designer = params.get('id');
      //  Emitters.authEmitter.emit(true)
    });
  }

  sender:any = localStorage.getItem('userId')
  sendMessage() {
    console.log(this.message,"dklfk");
    this.chatService.sendMessage(this.sender,this.designer,this.message)
  }
}
