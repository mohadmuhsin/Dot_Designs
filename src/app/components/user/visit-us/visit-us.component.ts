import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-visit-us',
  templateUrl: './visit-us.component.html',
  styleUrls: ['./visit-us.component.css'],
})
export class VisitUsComponent implements OnInit {
  ContactForm!: FormGroup;
  authenticated: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.service.user().subscribe(
      (res: any) => {
        // this.username = res.data.username;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
      }
    );
    this.ContactForm = this.formBuilder.group({
      email: '',
      message: '',
      subject: '',
    });
  }

  validateEmail(email: string): boolean {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex) !== null;
  }
  sendMessage() {
    const message = this.ContactForm.getRawValue();
    if (
      message.email.trim() === '' ||
      message.message.trim() === '' ||
      message.subject.trim() === ''
    ) {
      this.toastr.warning("Field can't be blank", '', { progressBar: true });
    } else if (!this.validateEmail(message.email)) {
      this.toastr.warning('Please enter a valid email', '', {
        progressBar: true,
      });
    } else {
      this.service.sendMessage(message).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success('Message send Successfully', '', {
            progressBar: true,
          });
        },
        error: (err: any) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, '', { progressBar: true });
        },
      });
    }
  }
}
