import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Category } from '../../../model/category_model';
import { Observable } from 'rxjs';
import { loadCategories } from 'src/app/components/admin/admin-state/action';
import { selectCategories } from 'src/app/components/admin/admin-state/selector';
import { CategoryState } from 'src/app/components/admin/admin-state/state';
import { Location } from '@angular/common';
import { image } from '@cloudinary/url-gen/qualifiers/source';


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
  imageUrl: string[] = [];


  // category dropdow
  showDropdown: boolean = false;
  selectedCategory: Category | undefined;

  // store
  filteredCategories: Category[] = [];


  
  constructor(
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private store: Store<CategoryState>,
    private service: AuthServiceService,
    private route:ActivatedRoute
  ) {}

  categories$: Observable<Category[]> | undefined;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      designName: '',
      materialType: '',
      finishType: '',
      category: '',
      images: [[]],
      description:''
    });

    this.store.dispatch(loadCategories());
    this.categories$ = this.store.pipe(select(selectCategories))
    this.categories$.subscribe((categories) => {
      this.filteredCategories = categories;
    });
    const token = localStorage.getItem('designer')
    this.service.getProfileData(token).subscribe((res:any) => {
      const { status } = res.profile
      if (!status) {
        this.router.navigate(['/designerProfile'])
      }
      
    })

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
        // Add the debug option to enable logging
        debug: true,
        // Add this function to handle the upload success event
        onSuccess: (result: any) => {
          const files = result.info.files;
        }, 
      },
      (error: any, result: any) => {
        console.log('Cloudinary error:', error); 
        console.log('Cloudinary result:',  result); 
        const files = result.info.files;
        
        this.handleImageUpload(files);
      }
    );
  
    this.imageInput.nativeElement.addEventListener('click', () => {
      widget.open();
    });
  }
  
  


  submit() {
    const designs = this.form.getRawValue();
    designs.category = this.categoryId;
    designs.images = this.imageUrl; 

    if (
      designs.designName.trim() === '' ||
      designs.materialType.trim() === '' ||
      designs.finishType.trim() === '' ||
      designs.category.trim() === ''
    ) {
      this.toastr.error("Fields can't be empty", 'Warning!');
    } else if (this.imageUrl.length === 0) {
      this.toastr.error('Please upload an image', 'Warning!');
    } else {
      const token = localStorage.getItem("designer") 
      console.log(token);
      
      this.service.add_design(designs,token).subscribe(
        (res: any) => {
          // this.router.navigate(['/add_designs']);
       const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
          this.toastr.success('Design added', 'Success!');
        },
        (err) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, 'Warning');
        }
      );
    }
  }
  
  handleImageUpload(files: any[]) {
    console.log('Filessss:', files); 

    const images = files.map((file: any) => file.uploadInfo.secure_url);
    console.log('Images:', images);
  
    this.imageUrl = [...this.imageUrl, ...images]; 
    console.log('Image URLs:', this.imageUrl); 
  }
  
  
  
  
  
  
  
  
  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.categoryId = category._id;
    this.showDropdown = false;
  }
  back(){
    this.location.back();

  }
}
