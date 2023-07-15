import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../model/category_model';
import { Store, select } from '@ngrx/store';
// import { loadCategories,  } from '../../state/action';
// import {
//   selectCategories,
//   selectDataById,
//   // selectDesigns,
// } from '../../state/selector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Design } from '../../model/design_model';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-edit-design',
  templateUrl: './edit-design.component.html',
  styleUrls: ['./edit-design.component.css'],
})
export class EditDesignComponent implements OnInit {
  // form values
  form!: FormGroup;
  designName!: string;
  materialType!: string;
  finishType!: string;
  category!: string;
  image!: string;
  description!: string;
  //

  designData!: any;
  designId!: any;
  showDropdown: boolean = false;
  selectedCategory: Category | undefined;
  filteredCategories: Category[] = [];
  categories$: Observable<Category[]> | undefined;
  designs$: Observable<Design[]> | undefined;


  constructor(
    private store: Store<Design>,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      designName: this.designName,
      materialType: this.materialType,
      finishType: this.finishType,
      category: this.category,
      image: this.image,
      description: this.description,
    });

    // this.designs$ = this.store.pipe(select(selectDesigns));
    // this.store.dispatch(loadDesigns());
    // this.store.dispatch(loadCategories());
    // this.categories$ = this.store.pipe(select(selectCategories));
    // this.categories$.subscribe((categories) => {
    //   console.log(categories, 'data');
    //   this.filteredCategories = categories;
    // });

    // takeing params
    this.activeRoute.paramMap.subscribe((params) => {
      this.designId = params.get('id');
    });
    this.getDesignData(this.designId);

    // this.getDataById(1);
  }

  // getDataById(id: number): void {
  //   this.store.select(selectDataById(id)).subscribe((data) => {
  //     // Use the retrieved data here
  //     console.log(data);
  //   });
  // }

  submit() {}

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.showDropdown = false;
  }

  getDesignData(id: any) {
    this.service.getDesignData(this.designId).subscribe((res: any) => {
      this.designData = res;
      console.log(this.designData,"resposne");
      this.designName = this.designData.name,
      this.finishType = res.finishType
      this.category = res.category
      this.description = res.description
      this.image = res.image
      
    });
  }
} 
