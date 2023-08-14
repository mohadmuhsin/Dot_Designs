import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-designer-profile',
  templateUrl: './designer-profile.component.html',
  styleUrls: ['./designer-profile.component.css']
})
export class DesignerProfileComponent implements OnInit{
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;
  form!: FormGroup
  // cloudinary
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl!: string
  proimage!: string;
  Email!: string
  CompanyName!: string
  District!: string
  Address!: string
  State!: string
  MobileNumber!: number
  Website!: string
  Bio!: string
  Image!: string
   entity_name!: string
      address!: string
      district!: string
      state!: string
      mobileNumber!: string
      website!: string
      bio!: string
      image!: string
      email!:string
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private service: AuthServiceService,
    private formBuilder: FormBuilder,
  ) {
    

  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      entity_name: '',
      address: '',
      district: '',
      state: '',
      mobileNumber: '',
      website: '',
      bio: '',
      image: '',
      email:''
      
    })
    this.getProfileData()

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
      this.proimage = this.imageUrl

          console.log('Image URL:', this.imageUrl);
        }
      }
    );

    this.imageInput.nativeElement.addEventListener('click', () => {
      widget.open();
    });
  }

  update() {

    
    const profile = this.form.getRawValue()
    console.log(profile, 'submit');
    profile.image = this.imageUrl
    console.log(this.imageUrl);
 const number =  profile.mobileNumber.toString()
    if (
profile.entity_name.trim() 
=== ''|| profile.address.trim()
=== ''|| profile.district.trim() 
=== ''|| profile.state.trim() 
=== ''|| number.trim()
=== ''|| number.length<10 ||
      profile.website.trim() 
=== ''|| profile.bio.trim() 
=== ''|| profile.image.trim() 
=== ''|| profile.email.trim() === ''
    ) {
      this.toastr.warning(`Fields can't be empty`)
    } else if (
      profile.entity_name.trim() === this.CompanyName&&
      profile.address.trim() === this.Address &&
      profile.district.trim() === this.District &&
      profile.state.trim() === this.State &&
      profile.mobileNumber.trim() === this.MobileNumber &&
      profile.website.trim() === this.Website &&
      profile.bio.trim() === this.Bio &&
      profile.image.trim() === this.Image &&
      profile.email.trim() === this.Email
    ) {
    this.toastr.warning("No changes are made","Warning!")
    }
    else {
       const token = localStorage.getItem('designer')
      this.service.updateProfile(profile, token).subscribe((res: any) => {
        const Message = res.message
        console.log(Message);
       
        
        
          const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
   
        this.toastr.success(Message||"Profile updated Successfully","Success")
      }, (err: { error: { message: any; }; }) => {
        const errorMessage = err.error.message
        this.toastr.error(errorMessage, "Warning!")
      })
    }
    
    
  }

  getProfileData() {
    const token = localStorage.getItem('designer')
    this.service.getProfileData(token).subscribe((res:any) => {
     console.log(res,"response");
    //  for comparison only
      this.imageUrl = res.profile.profilePhoto
      this.CompanyName = res.entity_name,
      this.Email = res.email,
      this.Address = res.address,
      this.District = res.district,
      this.State = res.state,
      this.MobileNumber = res.mobileNumber,
      this.Website = res.website,
      this.Bio = res.bio,
        this.Image = res.profilePhoto
      
      // for form updation
      this.form.patchValue({
        entity_name: res.entity_name,
        email:res.email,
        address: res.profile.address,
        district: res.profile.district,
      state: res.profile.state,
      mobileNumber: res.mobileNumber,
      website: res.profile.website,
      bio: res.profile.bio,
      // image:res.profile.profilePhoto
        })
    })
  }
   
}
