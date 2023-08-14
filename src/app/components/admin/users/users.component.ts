import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';
import { PaginatePipeArgs } from 'ngx-pagination';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit  {
  users: any;
  page: number = 1
  count: number = 0
  tableSize: number = 10
  tableSizes: any = [5, 10, 15, 20]
  searchQuery: string = '';
  noResultsFound: boolean = false;



  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: AuthServiceService,
    private activeRoute :ActivatedRoute
  ){}
  
  ngOnInit(): void {
   this.getUsers()
  }


  getUsers() {
     this.service.getUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res
        Emitters.authEmitter.emit(true)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  search() {
    if (this.searchQuery.trim() !== '') {
        this.users = this.users.filter((user:any) =>
            user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
       this.noResultsFound = this.users.length === 0;
    } else {
      this.getUsers();
      this.noResultsFound = false;
    }
}




  blockUser(userId: string) {
    this.service.blockUser(userId).subscribe({
      next: (res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        const currentRoute = this.activeRoute.snapshot.routeConfig?.path;
        this.router.navigateByUrl('/', { skipLocationChange: true })
         .then(() => {
           this.router.navigate([currentRoute]);
         });
        this.toastr.success("Blocked user successfully", '', { progressBar: true})
      },
      error: (err: any) => {
        console.log(err);
        
      }
    })
  }

  unblockUser(userId: string) {
    this.service.unblockUser(userId).subscribe({
      next: (res: any) => {
        const currentRoute = this.activeRoute.snapshot.routeConfig?.path;
        this.router.navigateByUrl('/', { skipLocationChange: true })
         .then(() => {
           this.router.navigate([currentRoute]);
         });
        this.toastr.success("Unblocked user successfully", '', { progressBar: true})
      },
      error: (err: any) => {
        console.log(err);
        
      }
    })
  }

  onTableDataChange(event: any) {
    this.page = event
    this.getUsers()
  }

  // onTableSizeChange(event: any) {
  //   this.tableSize = event.target.value
  //   this.page = 1
  //   this.getUsers()
  // }
}
