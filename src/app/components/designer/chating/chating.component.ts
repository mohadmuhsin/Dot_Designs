import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io'; 
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chating',
  templateUrl: './chating.component.html',
  styleUrls: ['./chating.component.css']
})
export class ChatingComponent implements OnInit,AfterViewChecked {

  message!: string;
  users: any;
  messages!:any[];
  userId: any;
  designerId: string | null = localStorage.getItem('designerId')
  connectionId!: string;
  chatshow: boolean = false
  username: any;
  
  constructor(
    private socket: Socket,
    private toastr: ToastrService,
    private service:AuthServiceService,
    private chatService: SocketService,
  ) {}
    
  ngOnInit(): void {  
      
    this.socket.on('messageReceived', (newMessage: any) => {   
      if (this.userId == newMessage.sender) {
        this.messages.push(newMessage);
      }
    })
    this.getchatslist(this.designerId)
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

  getchatslist(id:string|null){
    this.chatService.designerChatlist(id).subscribe((res: any) => {
      this.users = res.data
      this.socket.emit('setup',res.id) 
    })
  }


  getFullChat(user: string) {
    this.userId=user
    this.chatshow = true
    this.service.getUser(user).subscribe({
      next: (res: any)=>{
        this.username = res.username
      }
    })
    this.chatService.getFullUserChat(this.userId,this.designerId).subscribe((res: any) => {
      this.socket.emit('join',res.cid) 
      this.messages = res.result
      this.connectionId=res.cid
      this.designerId=res.designerId
    })

  }

  sendMessage() {
    if (this.message.trim() === '') {
      this.toastr.error("please type anything","Warning!",{progressBar:true})
    } else {
      const data = {
        connectionid: this.connectionId,
        sender: this.designerId,
        reciever: this.userId,
        message: this.message
      }
      this.chatService.sendMessages(data).subscribe({
        next: (res: any) => {
          this.message = '',
          this.messages.push(res)
          this.socket.emit('chatMessage',res)
        }
      })
    }

  }

}
