import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io' 
import { SocketService } from 'src/app/services/socket.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewChecked {
  designers : any;
  designer: any;
  chatshow: boolean= false
  messages!: any[];
  connectionId!: string;
  userid: any;
  message!:string
  designerr: any;


  constructor(
    private socket: Socket,
    private toastr: ToastrService,
    private chatService: SocketService,
    private service: AuthServiceService,
  ){}



  ngOnInit(): void {
  
    this.socket.on('messageReceived',(newMessage:any)=>{   
      if (this.designer == newMessage.sender) {
        this.messages.push(newMessage);
      }
    })
    this.getchatslist()

  }

  @ViewChild('chatContainer') chatContainer!: ElementRef 
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      // Handle any errors related to scrolling (if necessary)
    }
  }

  

  getchatslist() {
    
    this.chatService.userchatlist().subscribe((res: any) => {
      this.designers = res.data
      console.log(this.designers);
      Emitters.authEmitter.emit(true)
      
      this.socket.emit('setup',res.id) 
    })
  }


  
  getFullChat(id: any) {
   
    this.designer=id
    this.chatshow = true
    this.service.designer(id).subscribe({
      next: (res: any) => {
        console.log(res.data.entity_name,"name of designer");
        this.designerr = res.data.entity_name
      }
    })
    this.chatService.getFullChat(this.designer).subscribe((res: any) => {
      this.socket.emit('join',res.cid) 
      this.messages = res.result
      this.connectionId=res.cid
      this.userid=res.userId
    })
  }


  sendMessage() {

    if (this.message.trim() === '') {
      this.toastr.error("please type anything","Warning!",{progressBar:true})
    } else {
      const data = {
        connectionid: this.connectionId,
        sender: this.userid,
        reciever: this.designer,
        message: this.message
      }
      this.chatService.sendMessages(data).subscribe({
        next: (res: any) => {
          this.message = '',
          this.messages.push(res)
          this.socket.emit('chatMessage',res)
        },error: (err: any) => {
          console.log(err);
          
        }
      })
    }
  }

}