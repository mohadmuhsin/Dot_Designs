import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';

@Component({
  selector: 'app-designers',
  templateUrl: './designers.component.html',
  styleUrls: ['./designers.component.css']
})
export class DesignersComponent implements OnInit {
  designers: any;
  page: number = 1
  count: number = 0
  tableSize: number = 10
  tableSizes: any = [5, 10, 15, 20]
  searchQuery: string = ''
  noResultsFound: boolean = false;

  constructor(
    private service: AuthServiceService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.getDesigners()
  }

  getDesigners() {
    this.service.getDesigners().subscribe({
      next: (res: any) => {
        this.designers = res
        Emitters.authEmitter.emit(true)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

   onTableDataChange(event: any) {
    this.page = event
    this.getDesigners()
  }

  // onTableSizeChange(event: any) {
  //   this.tableSize = event.target.value
  //   this.page = 1
  //   this.getDesigners()
  // }

  search() {
    if (this.searchQuery.trim() !== '') {
      this.designers = this.designers.filter((designer: any) => 
        designer.entity_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        designer.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
     this.noResultsFound = this.designers.length === 0;
    }
    else {
      this.getDesigners()
      this.noResultsFound= false
    }
   
  }

  blockDesigner(designerId: string) {
    this.service.blockDesigner(designerId).subscribe({
      next: () => {
        localStorage.removeItem('designer');
        localStorage.removeItem('designerId');
        const currentRoute = this.activatedRoute.snapshot.routeConfig?.path;
        this.router.navigateByUrl('/', { skipLocationChange: true })
         .then(() => {
           this.router.navigate([currentRoute]);
         });
        this.toastr.success('Blocked designer successful','',{progressBar:true})
      },
      error: (err:any) => {
        console.log(err)
      }
    })
  }

  unblockDesigner(designerId: string) {
    this.service.unblockDesigner(designerId).subscribe({
      next: () => {

        const currentRoute = this.activatedRoute.snapshot.routeConfig?.path;
        this.router.navigateByUrl('/', { skipLocationChange: true })
         .then(() => {
           this.router.navigate([currentRoute]);
         });
        this.toastr.success('Un blocked designer successful','',{progressBar:true})
      },
      error: (err:any) => {
        console.log(err)
      }
    })
  }



}
