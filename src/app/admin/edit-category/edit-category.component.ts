import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { name } from '@cloudinary/url-gen/actions/namedTransformation';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent {
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl: string = '';
  categoryId: any;
  name!:string
  image!:string
  constructor(
    private router: Router,
    private store: Store,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private service: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     name: this.name,
     image: this.image
    });
    this.initializeCloudinaryWidget();

    this.activeRoute.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
    });
    this.getCategory();
  }

  initializeCloudinaryWidget() {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        multiple: false,
        resourceType: 'image',
        maxFiles: 1,
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
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          this.imageUrl = result.info.secure_url;
          this.form.patchValue({
            image: result.info.secure_url,
          });
        }
      }
    );

    this.imageInput.nativeElement.addEventListener('click', () => {
      widget.open();
    });
  }

  submit() {
    const category = this.form.getRawValue();

    if (category.name === null) {
      this.toastr.error("Category name is same", 'Warning!');
    } else if (this.imageUrl === '') {
      this.toastr.error('Please upload another image', 'Warning!');
    } else {
      category.image = this.imageUrl;

      this.service.edit_category(category).subscribe(
        (res: any) => {
          // this.store.dispatch(loadCategories())
          this.router.navigate(['designer/add_category']);
          this.toastr.success('Category added', 'Success!');
        },
        (err: any) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, 'Warning');
        }
      );
    }
  }
  getCategory() {
    this.service.getCategory(this.categoryId).subscribe((res: any) => {
     this.name=res.name
     this.image = res.image
     this.form.setValue({
      name: this.name,
      image: this.image,
    });
    },
    (err)=>{
      console.log("erorr");
      
    });
  }

}
