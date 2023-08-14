import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/user/home/home.component';
import { DesignerHomeComponent } from './components/designer/designer-home/designer-home.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { MailVerificationComponent } from './components/user/mail-verification/mail-verification.component';
import { DesignerLoginComponent } from './components/designer/designer-login/designer-login.component';
import { DesignerSignUpComponent } from './components/designer/designer-sign-up/designer-sign-up.component';
import { DesignerMailVerificationComponent } from './components/designer/designer-mail-verification/designer-mail-verification.component';
import { DesignsComponent } from './components/designer/designs/designs.component';
import { AddDesignsComponent } from './components/designer/add-designs/add-designs.component';
import { DesignCategoryComponent } from './components/designer/design-category/design-category.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { DesignListComponent } from './components/user/design-list/design-list.component';
import { EditDesignComponent } from './components/designer/edit-design/edit-design.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { EditCategoryComponent } from './components/admin/edit-category/edit-category.component';
import { DesAddCategoryComponent } from './components/designer/des-add-category/des-add-category.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CategoryApprovalComponent } from './components/admin/category-approval/category-approval.component';
import { DesignDetailViewComponent } from './components/user/design-detail-view/design-detail-view.component';
import { ConsultationFormComponent } from './components/user/consultation-form/consultation-form.component';
import { BookingsComponent } from './components/user/bookings/bookings.component';
import { BookingDetailsComponent } from './components/user/booking-details/booking-details.component';
import { ConsultationRequestsComponent } from './components/designer/consultation-requests/consultation-requests.component';
import { DesignerProfileComponent } from './components/designer/designer-profile/designer-profile.component';
import { DesignerListComponent } from './components/user/designer-list/designer-list.component';
import { DesignersProfileComponent } from './components/user/designers-profile/designers-profile.component';
import { DesignerBasedDesignsComponent } from './components/user/designer-based-designs/designer-based-designs.component';
import { ChatComponent } from './components/user/chat/chat.component';

// Guards
import { userGuard } from './components/user/user.guard';
import { designerGuard } from './components/designer/designer.guard';
import { AdminGuard } from './components/admin/admin.guard';
import { ChatingComponent } from './components/designer/chating/chating.component';
import { ConnectionRequestsComponent } from './components/designer/connection-requests/connection-requests.component';
import { WishlistComponent } from './components/user/wishlist/wishlist.component';
import { ConsultationDetailsComponent } from './components/designer/consultation-details/consultation-details.component';
import { FeedbackComponent } from './components/user/feedback/feedback.component';
import { DesignersComponent } from './components/admin/designers/designers.component';
import { UsersComponent } from './components/admin/users/users.component';
import { VisitUsComponent } from './components/user/visit-us/visit-us.component';

const routes: Routes = [
  // user
  { path: '', component: HomeComponent },
  { path: 'login',canActivate:[userGuard], component: LoginComponent },
  { path: 'signup',canActivate:[userGuard] , component: SignupComponent ,},
  { path: 'user/:id/verify/:token', component: MailVerificationComponent },
  { path: 'design_list/:id', component: DesignListComponent },
  { path: 'design_detailView/:id', component:DesignDetailViewComponent},
  { path: 'consultation_register/:id/:designId',canActivate:[userGuard],component:ConsultationFormComponent},
  { path: 'bookings',canActivate:[userGuard],component:BookingsComponent},
  { path: 'booking_details/:id', canActivate: [userGuard], component: BookingDetailsComponent },
  { path: 'feedback/:id', canActivate:[userGuard],component:FeedbackComponent},
  { path: 'designer_list', canActivate: [userGuard], component: DesignerListComponent },
  { path: 'designer_profile/:id', canActivate: [userGuard], component: DesignersProfileComponent },
  { path: 'designer_designs/:catId/:designerId', canActivate: [userGuard], component: DesignerBasedDesignsComponent },
  { path: 'chating/:id', canActivate: [userGuard], component: ChatComponent },
  { path: 'wishlist', canActivate: [userGuard], component: WishlistComponent },
  {path:'visitUs',canActivate:[userGuard],component:VisitUsComponent},
  

  // designer
  { path: 'designer',canActivate: [designerGuard],component: DesignerHomeComponent},
  { path: 'designs/:id',canActivate: [designerGuard],component: DesignsComponent},
  { path: 'add_designs',canActivate: [designerGuard], component: AddDesignsComponent },
  { path: 'design_categories',canActivate: [designerGuard], component: DesignCategoryComponent },
  { path: 'addCategory',canActivate: [designerGuard],component:DesAddCategoryComponent},
  { path: 'edit_design/:id',canActivate: [designerGuard], component: EditDesignComponent },
  { path: 'consultation_requests', canActivate: [designerGuard], component: ConsultationRequestsComponent },
  { path: 'consultationDetails/:id',canActivate:[designerGuard],component:ConsultationDetailsComponent},
  { path: 'designer_login', canActivate: [designerGuard],component: DesignerLoginComponent},
  { path: 'designer_signup',canActivate: [designerGuard],component: DesignerSignUpComponent},
  { path: 'designer/:id/verify/:token', component: DesignerMailVerificationComponent },
  { path: "designerProfile", canActivate: [designerGuard], component: DesignerProfileComponent },
  { path: 'designerChating', canActivate: [designerGuard], component: ChatingComponent },
  { path: 'connection_requests', canActivate: [designerGuard], component: ConnectionRequestsComponent},
  



  // admin
  { path: 'admin', canActivate: [AdminGuard], component: AdminHomeComponent },
  { path: 'users',canActivate:[AdminGuard],component:UsersComponent },
  { path: 'designers', canActivate: [AdminGuard], component: DesignersComponent },
  { path: 'admin_login',canActivate: [AdminGuard], component: AdminLoginComponent },
  { path: 'categoris',canActivate: [AdminGuard], component: AdminCategoryComponent },
  { path: 'add_category',canActivate: [AdminGuard], component: AddCategoryComponent },
  { path: 'edit_category/:id',canActivate: [AdminGuard], component:EditCategoryComponent},
  { path: 'category_approval',canActivate: [AdminGuard], component:CategoryApprovalComponent},
  { path: '**', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild([])],
  exports: [RouterModule],
})
export class AppRoutingModule {}