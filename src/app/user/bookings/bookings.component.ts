import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { Booking } from 'src/app/model/booking_model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
// import { Stripe } from '@stripe/stripe-js';

export interface Representative {
  name: string;
  image: string;
}


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent  implements OnInit {
  booking!: any | Booking[];
  
  // booking status
  Pending:string="Pending"
  waiting:string = "Waiting for Payment"
  consultation: string = "waiting for consultation"
  consDone: string = "cosultation Done"
  progress: string = "Work in Progress"
  completed: string = "Completed"
  
  confirmation: boolean = false
  paymentHandler:any = null
  success:boolean = false
  consultationFee:number = 500
  designId: any;
  activityValues: number[] = [0, 100];

    constructor(
      private service: AuthServiceService,
      private  route:ActivatedRoute,
      private router: Router,
      private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.service.getbookings().subscribe(booking => {
          console.log(booking);
            this.booking = booking;
            Emitters.authEmitter.emit(true)
            // this.booking.forEach((customer:any) => customer.date = new Date(customer.date));
        });
    this.invokeStripe()
    }


    rejectBooking(id:any){
      this.service.rejectBooking(id).subscribe((res)=>{
        console.log(res);
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
      })
    }




    rejectPayment(id:any){
      this.service.rejectPayment(id).subscribe((res)=>{
        console.log(res);
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
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
      console.log(stripeToken, "pinnnnnnnnnnnnn");
      paymentStripe(stripeToken,amount,id)
    }
  })

    const paymentStripe = (token: any, amount: number, id: any) => {
     this.confirmation = false
    this.service.makePayment(token,amount,id).subscribe((res:any)=>{
      this.showPopup()
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
      console.log(res);
      this.booking = res.booking
      console.log(this.booking);
      

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
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    })
  }

  cancellProject(id: any) {
    const _id:any = id
    this.service.cancellProject(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.success("Confirmaiton Successful")
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    })
  }

  

}
