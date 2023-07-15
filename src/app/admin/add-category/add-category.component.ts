import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl: string = '';

  constructor(
    private router: Router,
    private store : Store,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private service: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: '',
      image: '',
    });

    this.initializeCloudinaryWidget();
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
          console.log('Image URL:', this.imageUrl);
        }
      }
    );

    this.imageInput.nativeElement.addEventListener('click', () => {
      widget.open();
    });
  }

  submit() {
    const category = this.form.getRawValue();

    if (category.category === '') {
      this.toastr.error("Fields can't be empty", 'Warning!');
    } else if (this.imageUrl === '') {
      this.toastr.error('Please upload an image', 'Warning!');
    } else {
      category.image = this.imageUrl;

      this.service.add_category(category).subscribe(
        (res: any) => {
          // this.store.dispatch(loadCategories())
          this.router.navigate(['designer/add_category']);
          this.toastr.success('Category added', 'Success!');
        },
        (err:any) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, 'Warning');
        }
      );
    }
  }
}