import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { Booking } from 'src/app/model/booking_model';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
  searchQuery:string = ''
  noResultsFound:boolean = false
   
  // pagination
  page: number = 1
  count: number = 0
  tableSize: number = 5
  tableSizes: any = [5, 10, 15, 20]

  status: string[] =["Pending","Waiting for Payment","waiting for consultation","Consultation Done","Work in Progress", "Completed"]
  filtered:boolean = false

    constructor(
      private service: AuthServiceService,
      private  route:ActivatedRoute,
      private router: Router,
      private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.getBookings() 
    this.filtered = false
  }
  
  getBookings() {
    
    this.service.getbookings().subscribe(booking => {
      this.booking = booking
      Emitters.authEmitter.emit(true)
    });
  }

  search() {
    if (this.searchQuery.trim() !== '') {
       this.filtered = true
      this.booking = this.booking.filter((booking: any) =>
        booking.designerId.entity_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        booking.designId.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      this.noResultsFound = this.booking.length === 0
    } else {
      this.getBookings()
      this.noResultsFound = false
      this.filtered = false
    }
  }

   filter(status: string) {
    this.booking = this.booking.filter((item: any) => item.status === status)
     this.filtered = true
  }

  showall() {
    this.getBookings()
     this.filtered = false
  }
    

  onTableDataChange(event: any) {
    this.page = event
    this.getBookings()
  }

}
