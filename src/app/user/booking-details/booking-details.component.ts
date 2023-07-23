import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  booking_id:any
  bookingDetails!:any
  constructor(private activeRoute:ActivatedRoute,
      private service:AuthServiceService,
      private router:Router
    ){}
    ngOnInit(): void {
      this.activeRoute.paramMap.subscribe((params) => {
        this.booking_id = params.get('id');
        })

        this.service.booking_detail(this.booking_id).subscribe((res)=>{
          this.bookingDetails = res
          console.log(this.bookingDetails);
          
          
        })
    }
}
