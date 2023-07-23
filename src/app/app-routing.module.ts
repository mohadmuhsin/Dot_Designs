import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { DesignerHomeComponent } from './designer/designer-home/designer-home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { MailVerificationComponent } from './user/mail-verification/mail-verification.component';
import { DesignerLoginComponent } from './designer/designer-login/designer-login.component';
import { DesignerSignUpComponent } from './designer/designer-sign-up/designer-sign-up.component';
import { DesignerMailVerificationComponent } from './designer/designer-mail-verification/designer-mail-verification.component';
// import { DesignsComponent } from './designer/designs/designs.component';
import { DesignsComponent } from './designer/designs/designs.component';
import { AddDesignsComponent } from './designer/add-designs/add-designs.component';
import { DesignCategoryComponent } from './designer/design-category/design-category.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { DesignListComponent } from './user/design-list/design-list.component';
import { EditDesignComponent } from './designer/edit-design/edit-design.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { DesAddCategoryComponent } from './designer/des-add-category/des-add-category.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CategoryApprovalComponent } from './admin/category-approval/category-approval.component';
import { DesignDetailViewComponent } from './user/design-detail-view/design-detail-view.component';
import { ConsultationFormComponent } from './user/consultation-form/consultation-form.component';
import { BookingsComponent } from './user/bookings/bookings.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import { ConsultationRequestsComponent } from './designer/consultation-requests/consultation-requests.component';
import { DesignerProfileComponent } from './designer/designer-profile/designer-profile.component';
import { UserGuard } from './user/user.guard';
import { DesignerGuard } from './designer/designer.guard';
import { AdminGuard } from './admin/admin.guard';
import { DesignerListComponent } from './user/designer-list/designer-list.component';
const routes: Routes = [
  // user
  { path: '', component: HomeComponent },
  { path: 'login',canActivate:[UserGuard], component: LoginComponent },
  { path: 'signup',canActivate:[UserGuard] , component: SignupComponent ,},
  { path: 'user/:id/verify/:token', component: MailVerificationComponent },
  { path: 'design_list/:id', component: DesignListComponent },
  { path:'design_detailView/:id', component:DesignDetailViewComponent},
  {path:'consultation_register/:id/:designId',canActivate:[UserGuard],component:ConsultationFormComponent},
  {path:'bookings',canActivate:[UserGuard],component:BookingsComponent},
  { path: 'booking_details/:id', canActivate: [UserGuard], component: BookingDetailsComponent },
  {path:'desiger_list',canActivate:[UserGuard],component:DesignerListComponent},

  // designer
  { path: 'designer',canActivate: [DesignerGuard],component: DesignerHomeComponent},
  { path: 'designs/:id',canActivate: [DesignerGuard],component: DesignsComponent},
  { path: 'add_designs',canActivate: [DesignerGuard], component: AddDesignsComponent },
  { path: 'design_categories',canActivate: [DesignerGuard], component: DesignCategoryComponent },
  { path:'addCategory',canActivate: [DesignerGuard],component:DesAddCategoryComponent},
  { path: 'edit_design/:id',canActivate: [DesignerGuard], component: EditDesignComponent },
  {path:'consultation_requests',canActivate: [DesignerGuard],component:ConsultationRequestsComponent},
  {path: 'designer_login', canActivate: [DesignerGuard],component: DesignerLoginComponent},
  {path: 'designer_signup',canActivate: [DesignerGuard],component: DesignerSignUpComponent},
  { path: 'designer/:id/verify/:token',canActivate: [DesignerGuard], component: DesignerMailVerificationComponent },
  {path:"designerProfile",canActivate: [DesignerGuard],component:DesignerProfileComponent},



  // admin
  { path: 'admin',canActivate: [AdminGuard], component: AdminHomeComponent },
  { path: 'admin_login',canActivate: [AdminGuard], component: AdminLoginComponent },
  { path: 'categoris',canActivate: [AdminGuard], component: AdminCategoryComponent },
  { path: 'add_category',canActivate: [AdminGuard], component: AddCategoryComponent },
  {path:'edit_category/:id',canActivate: [AdminGuard],component:EditCategoryComponent},
  {path:'category_approval',canActivate: [AdminGuard],component:CategoryApprovalComponent},
  {path:'**',component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild([])],
  exports: [RouterModule],
})
export class AppRoutingModule {}
