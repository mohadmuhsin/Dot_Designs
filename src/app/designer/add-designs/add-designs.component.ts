import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Category } from '../../model/category_model';
import { Observable } from 'rxjs';
import { loadCategories } from 'src/app/admin/admin-state/action';
import { selectCategories } from 'src/app/admin/admin-state/selector';
import { CategoryState } from 'src/app/admin/admin-state/state';

declare const cloudinary: any;

@Component({
  selector: 'app-add-designs',
  templateUrl: './add-designs.component.html',
  styleUrls: ['./add-designs.component.css'],
})
export class AddDesignsComponent implements OnInit {
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;
  // form
  form!: FormGroup;
  categoryId: any;
  // cloudinary
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl: string = '';

  // category dropdow
  showDropdown: boolean = false;
  selectedCategory: Category | undefined;

  // store
  filteredCategories: Category[] = [];


  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private store: Store<CategoryState>,
    private service: AuthServiceService,
  ) {}

  categories$: Observable<Category[]> | undefined;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      designName: '',
      materialType: '',
      finishType: '',
      category: '',
      image: [[]],
      description:''
    });

    this.store.dispatch(loadCategories());
    this.categories$ = this.store.pipe(select(selectCategories));

    this.categories$.subscribe((categories) => {
      console.log(categories);
      this.filteredCategories = categories;
    });

    // retriving categoyry
    this.initializeCloudinaryWidget();
  }

  initializeCloudinaryWidget() {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        multiple: true,
        resourceType: 'image',
        maxFiles: 3,
        cropping: false,
        showSkipCropButton: false,
        showPoweredBy: false,
        language: 'en',
        text: {
          en: {
            upload: 'Upload',
          },
        },
      },
       (error: any, results: any[]) => { // Handle multiple results
      if (!error && results && results.length > 0) {
        this.handleImageUpload(results); // Pass the results to the handler
      }
      }
    );

    this.imageInput.nativeElement.addEventListener('click', () => {
      widget.open();
    });
  }

  submit() {
    const designs = this.form.getRawValue();
    designs.category =this.categoryId


    if (
      designs.designName.trim() === '' ||
      designs.materialType.trim() === '' ||
      designs.finishType.trim() === '' ||
      designs.category.trim() === ''
    ) {
      this.toastr.error("Fields can't be empty", 'Warning!');
    } else if (this.imageUrl === '') {
      this.toastr.error('Please upload an image', 'Warning!');
    } else {
      designs.image = this.imageUrl;

      this.service.add_design(designs).subscribe(
        (res: any) => {
          this.router.navigate(['designer/add_designs']);
          this.toastr.success('Design added', 'Success!');
        },
        (err) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, 'Warning');
        }
      );
    }
  }
  handleImageUpload(results: any[]) {
    const images = results.map((result: any) => result.info.secure_url);
    this.form.get('image')?.setValue(images);
  }
  
  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.categoryId = category._id;
    this.showDropdown = false;
  }
}
