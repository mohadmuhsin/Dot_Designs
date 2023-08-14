import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  booking_id:any
  bookingDetails!: any
  
   // booking status
  Pending:string="Pending"
  waiting:string = "Waiting for Payment"
  consultation: string = "waiting for consultation"
  consDone: string = "cosultation Done"
  progress: string = "Work in Progress"
  completed: string = "Completed"

  booking!: any 

  confirmation: boolean = false
  paymentHandler:any = null
  success:boolean = false
  consultationFee:number = 500
  designId: any;
  activityValues: number[] = [0, 100];
  
  constructor(
    private activeRoute: ActivatedRoute,
    private service:AuthServiceService,
    private router: Router,  
    // private location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    
  ){}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.booking_id = params.get('id');
    })
    

    this.service.booking_detail(this.booking_id).subscribe((res)=>{
      this.bookingDetails = res
      Emitters.authEmitter.emit(true)
    })
     this.invokeStripe()
  }



  rejectBooking(id:any){
      this.service.rejectBooking(id).subscribe((res)=>{
        console.log(res);
        window.location.reload()
      })
    }




    rejectPayment(id:any){
      this.service.rejectPayment(id).subscribe((res)=>{
        console.log(res);
        window.location.reload()
      })
    }
  
  
  onReject() {
  this.confirmation = false
  location.reload();
  }
  

  showConfirm(id:any) {
    this.confirmation = true
    this.designId = id
  }
  
  
// stripe payment//onConfirm of popup  makepayment
  proceedToPayment( amount: number) {
    const id: any = this.designId
  
    const paymentHandler = (<any>window).StripeCheckout.configure({
    key:'pk_test_51NUoowSITa8nEg8xS1VwcPLK6TbF2q8Pwqx2CmfprU05wyOsdp97rxjTgnzldI7CVmE2gJJTwrFBrSkkkOpNSDCy000096FGKF',
    locale:'auto',
      token:function(stripeToken:any){
        paymentStripe(stripeToken,amount,id)
      }
    })

    const paymentStripe = (token: any, amount: number, id: any) => {
     this.confirmation = false
      this.service.makePayment(token,amount,id).subscribe((res:any)=>{
        // this.showPopup()
        this.showConfirm(res.id)
        window.location.reload()
      this.booking = res.booking
      },(err)=>{
        const errorMessage = err.error.message 
        this.toastr.error(errorMessage,"Warning!")
      }
      )
    }

    paymentHandler.open({
      name:"Dot Designs",
      description:'Design which you choose',
      amount:amount*100

    })
  }
  
  
  // invoke stripe stripe 
  invokeStripe(){  
  if(!window.document.getElementById('stripe-script')){
      const script = window.document.createElement('script')
      script.id = 'stripe-script'
      script.type = 'text/javascript'
      script.src = 'http://checkout.stripe.com/checkout.js'
      script.onload=()=>{
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key:'pk_test_51NUoowSITa8nEg8xS1VwcPLK6TbF2q8Pwqx2CmfprU05wyOsdp97rxjTgnzldI7CVmE2gJJTwrFBrSkkkOpNSDCy000096FGKF',
          locale:'auto',
          token:function (stripeToken:any){
            console.log(stripeToken,"is this i printed");
          }
        })
      }
    window.document.body.appendChild(script)
  }
 
}

  showPopup() {
  this.success = true;
  }

  closePopup() {
    this.success = false;
    location.reload();
  }

  cancellConsultation(id: any) {
    const _id:any = id
    this.service.cancellConsultation(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.success("Confirmaiton Successful")
        window.location.reload()
    })
  }

  cancellProject(id: any) {
    const _id:any = id
    this.service.cancellProject(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.success("Confirmaiton Successful")
        window.location.reload()

    })
  }


  
}
