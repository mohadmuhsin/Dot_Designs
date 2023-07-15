import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category_model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { loadCategories } from '../admin-state/action';
import { selectCategories } from '../admin-state/selector';
import { CategoryState } from '../admin-state/state';
import { Emitters } from '../emitter/emitter';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  categoryId!: any;
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  form!: FormGroup;

  // cloudinary
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl: string = '';
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;


  constructor(
    private store: Store<CategoryState>,
    private router: Router,
    private service: AuthServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  category$: Observable<Category[]> | undefined;

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.category$ = this.store.pipe(select(selectCategories));
    this.category$?.subscribe((res: any) => {
      this.filteredCategories = res
      Emitters.authEmitter.emit(true)
    });
    this.form = this.formBuilder.group({
      category: '',
      image: '',
    });

    
  }
  dropCategory(){}
    
}
