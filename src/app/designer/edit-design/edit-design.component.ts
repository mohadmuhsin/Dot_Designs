import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../model/category_model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Design } from '../../model/design_model';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { selectCategories } from 'src/app/admin/admin-state/selector';
import { loadCategories } from 'src/app/admin/admin-state/action';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-design',
  templateUrl: './edit-design.component.html',
  styleUrls: ['./edit-design.component.css'],
})

export class EditDesignComponent implements OnInit {
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;


  // cloudinary
  cloudName = 'dgusa5uo6';
  uploadPreset = 'ml_default';
  imageUrl: string[] = [];
  id!:any
  //form values
  form!: FormGroup;
  
  designData!: any;
  designId!: any;
  images!:string
  showDropdown: boolean = false;
  selectedCategory: Category | undefined;
  filteredCategories: Category[] = [];
  categories$: Observable<Category[]> | undefined;
  designs$: Observable<Design[]> | undefined;


  constructor(
    private store: Store<Design>,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      designName: '',
      materialType: '',
      finishType: '',
      category: '',
      images: [[]],
      description: '',
    });
    // takeing params
    this.activeRoute.paramMap.subscribe((params) => {
      this.designId = params.get('id');
    });
    this.getDesignData(this.designId);
    

    // retriving category
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.pipe(select(selectCategories));
    this.categories$.subscribe((categories) => {
      this.filteredCategories = categories;

      
      console.log(this.filteredCategories,"ndddddddddd");
    });

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
        debug: true,
        onSuccess: (result: any) => {
          const files = result.info.files;
        }, 
      },
      (error: any, result: any) => {
        // console.log('Cloudinary error:', error); 
        // console.log('Cloudinary result:',  result); 
        const files = result.info.files;
        this.handleImageUpload(files);
      }
    );
  
    this.imageInput.nativeElement.addEventListener('click', () => {
      widget.open();
    });
  }

  handleImageUpload(files: any[]) {
    console.log('Filessss:', files); 

    const images = files.map((file: any) => file.uploadInfo.secure_url);
    console.log('Images:', images);
  
    const totalImages = this.designData.images.length + images.length;
    if (totalImages <= 3) {
      this.imageUrl = [...this.imageUrl, ...images];
      console.log('Image URLs:', this.imageUrl);
  
      this.designData.images = [...this.designData.images, ...images];
    } else {
      this.toastr.warning('You can only upload a maximum of three images.');
    }
    
  }

 

  submit() {
    const designs = this.form.getRawValue()
    if(this.imageUrl.length!==0){
      designs.images = this.imageUrl; 
    }

    if (
      designs.designName.trim() === '' ||
      designs.materialType.trim() === '' ||
      designs.finishType.trim() === '' ||
      designs.category.trim() === '' ||
      designs.description.trim() === ''
    ) {
      this.toastr.error("Fields can't be empty", 'Warning!');
    } else if (designs.designName === this.designData.designName &&
      designs.materialType === this.designData.materialType &&
      designs.finishType === this.designData.finishType &&
      designs.category === this.designData.category &&
      designs.description === this.designData.description) {
      
      this.toastr.error("No changes are Made","Warning!")
    } else if (designs.images.length === 0) {
      this.toastr.error('Please upload an image', 'Warning!');
    } else {
      const token = localStorage.getItem("designer") 
      this.service.updateDesign(designs,token,this.designId).subscribe((res)=>{
        console.log(res);
        this.location.back()
        this.toastr.success("Design updated Successfully")
      }, (err) => {
        console.log("eroror");
        
        const errorMessage = err.error.message
        this.toastr.error(errorMessage,"Warning!")
      })
    }
    console.log(designs);
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.showDropdown = false;
  }

  getDesignData(id: any) {
    this.service.getDesignData(this.designId).subscribe((res: any) => {
      this.designData = res;
      id = res._id
      
      this.images = res.images
      this.designId = res._id
      this.form.patchValue({
        designName: res.name,
        finishType: res.finishType,
        materialType: res.materialType,
        category: res.category.name,
        description: res.description,
        images: res.images,
      })
    });
  }


  deleteImage(i:any){
    const url = this.images[i]
    
    this.service.deleteDesignImage(url, this.designId).subscribe(() => {

       const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
      
      this.toastr.success("Image Deleted","Success")
    }, (err: any) => {
      const errorMessage = err.error.message
      this.toastr.error(errorMessage,"Warning!")
    })
    
  }
} 
