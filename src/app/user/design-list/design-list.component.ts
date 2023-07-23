import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Design } from '../../model/design_model';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-design-list',
  templateUrl: './design-list.component.html',
  styleUrls: ['./design-list.component.css'],
})
export class DesignListComponent implements OnInit {
  categoryId!: any;
  design: Design[] = [];
  constructor(
    private service: AuthServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
    });
    this.service.retrive_DesignsbyId(this.categoryId).subscribe(
      (res: any) => {
        this.design = res;
        console.log(res);
        Emitters.authEmitter.emit(true)
        
      },
      (err) => {
        this.toastr.error(err || 'Warning!');
      }
    );
  }
}
