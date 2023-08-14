import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-mail-verification',
  templateUrl: './mail-verification.component.html',
  styleUrls: ['./mail-verification.component.css'],
})
export class MailVerificationComponent implements OnInit {
  username: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private active: ActivatedRoute,
    private toastr: ToastrService,
    private service: AuthServiceService
  ) {}
  id!: number;
  token!: number;

  ngOnInit(): void {
    this.active.params.subscribe((params: any) => {
      this.id = params['id'];
      this.token = params['token'];
    });
    this.service.getUser(this.id).subscribe({
      next: (res: any) => {
      this.username = res.username
        
    
    }
    })
  }
  verify() {
    this.service.verify_user_email(this.id, this.token).subscribe(
      (res: any) => {
        Emitters.authEmitter.emit(true);
        this.router.navigate(['/']);
        this.toastr.success('emial verified successfully', 'Sucess!');
      },
      (err) => {
        Emitters.authEmitter.emit(false);
        this.toastr.error('Email not verified', 'Warning!');
      }
    );
  }
}
