import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { name } from '@cloudinary/url-gen/actions/namedTransformation';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';
import { loadCategories } from '../admin-state/action';
import { Location } from '@angular/common';

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
  catName!:string
  catImg!:string
  constructor(
    private store: Store,
    private router: Router,
    private location:Location,
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private service: AuthServiceService,
    private sharedService:SharedDataServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     name: '',
     image: ''
    });
    

    // 
    this.sharedService.getSharedData().subscribe((res)=>{
      Emitters.authEmitter.emit(true)
    })



    this.initializeCloudinaryWidget();

    this.activeRoute.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
    });
    this.getCategory()
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
    console.log(category, 'ffd');
    if (this.imageUrl.length !== 0) {
      category.image = this.imageUrl; 
    }
    
    
    if (category.name.trim()=== '' ) {
      this.toastr.error("Category name can not be blank", 'Warning!');
    } else if (this.catName === category.name && this.catImg === category.image) {
      this.toastr.error('No changes made', 'Warning!');
    } else  if (category.images === '') {
      this.toastr.error('Please upload an image', 'Warning!');
    } else{
      this.service.edit_category(category,this.categoryId).subscribe(
        (res: any) => {
          this.store.dispatch(loadCategories())
          this.router.navigate(['/categoris'])
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
      this.catName = res.name,
       this.catImg = res.image
     
      this.form.patchValue({
        name: res.name,
        image:res.image,
    });
    },
    (err)=>{
      console.log("erorr");
      
    });
  }

  updateUser(updatedValues: any) {
    this.form.patchValue(updatedValues);
    console.log(updatedValues,"dklfkl");
    
  }
}
