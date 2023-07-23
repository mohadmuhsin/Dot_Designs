import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Location } from '@angular/common';
import { Emitters } from 'src/app/emitter/emitter';
import { Booking } from 'src/app/model/booking_model';

@Component({
  selector: 'app-consultation-form',
  templateUrl: './consultation-form.component.html',
  styleUrls: ['./consultation-form.component.css'],
  providers: [MessageService]
})
export class ConsultationFormComponent implements OnInit {
  propertyType: string = '';
  floorPlanType: string = '';
  isButtonClicked: boolean = false;
  designerId:any
  designId!:string| null
  booking:Booking|undefined

  consultationFee:number = 500
  bookingForm!: FormGroup;
  confirmation: boolean = false
  success:boolean = false
  paymentHandler:any = null

  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private toastr:ToastrService,
    private router:Router,
    private service : AuthServiceService,
    private activeRoute: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      propertyType: [''],
      floorPlanType: [''],
      location: '', 
      mobileNumber:'',
      // convenientDate: '',
    });

    this.activeRoute.paramMap.subscribe((params) => {
      this.designerId = params.get('id');
      this.designId = params.get('designId')
      this.service.user().subscribe(()=>{
        Emitters.authEmitter.emit(true)
      })
      console.log(this.designerId,this.designId);
    });
    
  }

  setPropertyType(propertyType: string): void {
    this.bookingForm.patchValue({ propertyType });
  }

  setFloorPlanType(floorPlanType: string): void {
    this.bookingForm.patchValue({ floorPlanType });
  }

  onSubmit(): void {
    const formData = this.bookingForm.value;

    if(formData.propertyType === '' || formData.floorPlanType === '' )
    {
      this.toastr.error(`Please select one
       `,"Warning!",{
        positionClass: 'toast-top-center'
      })
      //  formData.convenientDate.trim()===''|| 
    }else if(formData.location.trim()===''){
      this.toastr.error(`Please fill in all`,"Warning!",{
        positionClass: 'toast-top-center'
      })
    }else if(!this.isValidMobileNumber(formData.mobileNumber)){
      this.toastr.error(`Enter a valid Mobile Number`,"Warning!",{
        positionClass: 'toast-top-center'
      })
    }
    else {
      this.service.bookingRequest(formData, this.designerId, this.designId).subscribe((res: any) => {
        this.booking = res.result
        console.log(this.booking,"lskjsff");
        
      this.showPopup()
        
      // this.toastr.success("Booking requested","Success")
      },(err: any) => {
        const errorMessage = err.error.message
        this.toastr.error(errorMessage,"Warning!",{
        positionClass: 'toast-top-center'
      })
      })

      // this.showConfirm()
      
    }
  }


// confirmation popups
showConfirm() {
 this.confirmation = true
}

onReject() {
  this.confirmation = false
  location.reload();
 }

// stripe payment//onConfirm of popup  makepayment




 isValidMobileNumber(number: string): boolean {
  const regex = /^[0-9]{10}$/; // Regular expression for exactly 10 digits.
  return regex.test(number);
}

//booking success 
showPopup() {
  this.success = true;
}

closePopup() {
  this.success = false;
  location.reload();
}
}