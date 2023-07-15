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
import { AuthGuard } from './designer/auth.guard';
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
const routes: Routes = [
  // user
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user/:id/verify/:token', component: MailVerificationComponent },
  { path: 'design_list/:id', component: DesignListComponent },

  // designer
  {
    path: 'designer',
    component: DesignerHomeComponent,
  },

  {
    path: 'designs/:id',
    component: DesignsComponent,
  },
  { path: 'add_designs', component: AddDesignsComponent },
  { path: 'design_categories', component: DesignCategoryComponent },
  {path:'addCategory',component:DesAddCategoryComponent},
  { path: 'edit_design/:id', component: EditDesignComponent },

  {
    path: 'designer_login',
    component: DesignerLoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'designer_signup',
    component: DesignerSignUpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'designer/:id/verify/:token',
    component: DesignerMailVerificationComponent,
  },
  // {path:'designs',component:DesignsComponent},

  // admin
  { path: 'admin', component: AdminHomeComponent },
  { path: 'admin_login', component: AdminLoginComponent },
  { path: 'categoris', component: AdminCategoryComponent },
  { path: 'add_category', component: AddCategoryComponent },
  {path:'edit_category/:id',component:EditCategoryComponent},
  {path:'category_approval',component:CategoryApprovalComponent},
  {path:'**',component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild([])],
  exports: [RouterModule],
})
export class AppRoutingModule {}
