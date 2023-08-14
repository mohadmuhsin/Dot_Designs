import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';
declare const cloudinary: any;
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
   @ViewChild('imageInput', { static: true })
   imageInput!: ElementRef<HTMLInputElement>;
  
  feedbackForm!: FormGroup;
  images!: string
  
  
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl!: string;
  booking_id!: string | null;
  image!: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute:ActivatedRoute
  ) {}
  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe((params) => {
    this.booking_id = params.get('id');
    })
    this.service.getFeedBack(this.booking_id).subscribe({
      next: (res: any) => {
        console.log(res.feedback[0].text, "dldf");
          Emitters.authEmitter.emit(true)
        // this.feedbackForm.patchValue({
        //   feedback: res.feedback[0].text,
        //   image:res.feedback[0].image
        // })
      }
    })
    
    

    this.feedbackForm = this.formBuilder.group({
      feedback: '',
      image: ''
    });  
       // retriving categoyry
    this.initializeCloudinaryWidget();
  }
  
  
  
 initializeCloudinaryWidget() {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        multiple: false,
        resourceType: 'image',
        maxFiles: 1,
        cropping: false,
        showSkipCropButton: false,
        showPoweredBy: false,
        language: 'en',
        text: {
          en: {
            upload: 'Upload',
          },
        },
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          this.imageUrl = result.info.secure_url;
          this.image = this.imageUrl
          console.log('Image URL:', this.imageUrl);
        }
      }
    );

    this.imageInput.nativeElement.addEventListener('click', () => {
      widget.open();
    });
  }
  
  submit() {
    const feedback = this.feedbackForm.getRawValue()
    console.log(feedback.feedback,"hekii");
    
    if (feedback.feedback.trim() === '') {
      this.toastr.error("Please write anything","Warning!",{progressBar:true})
    }else if (this.imageUrl.length === 0) {
      this.toastr.error('Please upload a image', 'Warning!',{progressBar:true});
    } else {
      feedback.image = this.imageUrl
      this.service.addFeedback(feedback,this.booking_id).subscribe({
        next: (res: any) => {
          this.toastr.success('Feedback uploaded', "Success", { progressBar: true })
          this.router.navigate([`/booking_details/${this.booking_id}`])
        }, error: (err: any) => {
          const errorMessage = err.error.message
          this.toastr.error(errorMessage, "Warning!", { progressBar: true })
          console.log(err);
          
        }
      })
    }
    
  }
back(){}
  getFeedback(bookingId: string | null) {
    

   }
  
  
}
