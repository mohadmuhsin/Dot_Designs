import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  designs: any;
  count: any =0
  
  constructor(private toastr: ToastrService,
    private router: Router,
    private service: AuthServiceService,
    private route :ActivatedRoute
  ) { }

   
  ngOnInit(): void {
    this.service.getWishlistDesigns().subscribe((designs: any) => {
      this.designs = designs[0].wishlist
      this.count = designs[0].wishlist.length
      console.log(designs[0].wishlist.length, 'dslfk');
      Emitters.authEmitter.emit(true)
      
    }, (err: { error: { message: any; }; }) => {
      const errorMessage = err.error.message

      this.toastr.error(errorMessage)
      
    }
    )
  }

  removeFromWishlist(id: any) {
    this.service.removeFromWishlist(id).subscribe((res: any) => {
      console.log(res);
      const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
      this.toastr.warning("Design removed from Wishlist","Removed!")
    }, (err: any) => {
      this.toastr.error("something went wrong")
    })
  }
}
