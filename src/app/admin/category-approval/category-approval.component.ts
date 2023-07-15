import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OnIdentifyEffects } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-category-approval',
  templateUrl: './category-approval.component.html',
  styleUrls: ['./category-approval.component.css']
})
export class CategoryApprovalComponent implements OnInit {
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl: string = '';
  categoryId: any;
  name!:string
  image!:string
  data:any
  singledata:any
  isModalOpen = false;

  constructor(private service:AuthServiceService,
    private toastr: ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
    ){}
ngOnInit(): void {
    this.service.getPendingRequest().subscribe((res:any)=>{
      this.data = res
      console.log(this.data,"here it is");
      
    },(err:any)=>{
      console.log(err.error.message);
      
    })
    this.form = this.formBuilder.group({
      name: this.name,
      image: this.image
     });
     this.initializeCloudinaryWidget();
}
openModal() {
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
}

submitModal() {
  // Add your logic to handle the submit action here
}

isInputShaking = false;

onInputChange() {
  this.isInputShaking = false; // Reset the shaking animation
}

onFileInputHover(event: any) {
  this.isInputShaking = !this.isInputShaking; // Toggle the shaking animation
}
getdata(id:any){
  const  _id = id
  this.service.getCategory(_id).subscribe((res:any)=>{
    console.log(res);
     this.singledata = res
  })
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

}
