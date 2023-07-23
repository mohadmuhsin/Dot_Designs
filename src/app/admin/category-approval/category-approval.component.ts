import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnIdentifyEffects } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Location } from '@angular/common';
import { Emitters } from '../emitter/emitter';
import { loadCategories } from '../admin-state/action';
import { Store } from '@ngrx/store';

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
  isModalOpen = false;
  catId: any;
  showPopup = false;
  pending!:number

  constructor(
    private service:AuthServiceService,
    private toastr: ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private store : Store,
    private location: Location,
    private route:ActivatedRoute
    ){}
ngOnInit(): void {
    this.service.getPendingRequest().subscribe((res:any)=>{
      this.data = res
      this.pending = this.data.length
      
     Emitters.authEmitter.emit(true)
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
     this.name = res.name
     this.image = res.image
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





approve() {
  if (this.name === '') {
    this.toastr.error("Category name can not  be blank", 'Warning!');
  } else if (this.image === '') {
    this.toastr.error('Please upload a image', 'Warning!');
  } else {
    const category = {name:this.name,image:this.image}
    this.service.approveCategory(category).subscribe(
      (res: any) => {
        this.store.dispatch(loadCategories())

        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });

        this.toastr.success('Category Approved', 'Success!');
      },
      (err) => {
        const errorMessage = err.error.message;
        this.toastr.error(errorMessage, 'Warning');
      }
    );
  }
} 

rejectApproval(id:any){
this.catId = id
}
rejectCategoryApproval(){
  this.service.rejectCategoryApproval(this.catId).subscribe((res)=>{
    this.store.dispatch(loadCategories())
    const currentRoute = this.route.snapshot.routeConfig?.path;
    this.router
    .navigateByUrl('/', { skipLocationChange: true })
    .then(() => {
      this.router.navigate([currentRoute]);
        });
    this.toastr.success("Category rejected successfully","Success")
    
  },(err)=>{
    const errorMessage = err.error.message
    this.toastr.error(errorMessage,"Warning!")
  })
}
  // Function to toggle the popup visibility
  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }


}
