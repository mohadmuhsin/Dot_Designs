import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { loadCategories } from 'src/app/components/admin/admin-state/action';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-des-add-category',
  templateUrl: './des-add-category.component.html',
  styleUrls: ['./des-add-category.component.css']
})
export class DesAddCategoryComponent {
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl: string = '';
  image!:string
  constructor(
    private router: Router,
    private store : Store,
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
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
          this.image = this.imageUrl
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
     const token = localStorage.getItem("designer")
      this.service.sendRequest(category,token).subscribe(
        (res: any) => {
          this.store.dispatch(loadCategories())
          const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
          this.toastr.success('Request send for approval', 'Success!');
        },
        (err: { error: { message: any; }; }) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, 'Warning');
        }
      );
    }
  }
}
