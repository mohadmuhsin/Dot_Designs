import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/ng';
import { CommonModule } from '@angular/common';
import { StripeModule } from 'stripe-angular';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast'
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SocketIoModule,SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';

//state
import {  reducer } from './admin/admin-state/reducer'; 
import {CategoryEffects}from './admin/admin-state/effects';
import { EffectsModule } from '@ngrx/effects';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { HeaderComponent } from './user/header/header.component';
import { FooterComponent } from './user/footer/footer.component';
import { DesignerHomeComponent } from './designer/designer-home/designer-home.component';
import { MailVerificationComponent } from './user/mail-verification/mail-verification.component';
import { MyInterceptorInterceptor } from './my-interceptor.interceptor';
import { DesignerLoginComponent } from './designer/designer-login/designer-login.component';
import { DesignerSignUpComponent } from './designer/designer-sign-up/designer-sign-up.component';
import { DesignerNavbarComponent } from './designer/designer-navbar/designer-navbar.component';
import { DesignerFooterComponent } from './designer/designer-footer/designer-footer.component';
import { DesignsComponent } from './designer/designs/designs.component';
import { DesignerMailVerificationComponent } from './designer/designer-mail-verification/designer-mail-verification.component';
import { SidebarComponent } from './designer/sidebar/sidebar.component';
import { AddDesignsComponent } from './designer/add-designs/add-designs.component';
import { DesignCategoryComponent } from './designer/design-category/design-category.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { DesignListComponent } from './user/design-list/design-list.component';
import { EditDesignComponent } from './designer/edit-design/edit-design.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { DesAddCategoryComponent } from './designer/des-add-category/des-add-category.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CategoryApprovalComponent } from './admin/category-approval/category-approval.component';
import { DesignDetailViewComponent } from './user/design-detail-view/design-detail-view.component';
import { ConsultationFormComponent } from './user/consultation-form/consultation-form.component';
import { BookingsComponent } from './user/bookings/bookings.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import { ConsultationRequestsComponent } from './designer/consultation-requests/consultation-requests.component';
import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { DesignerProfileComponent } from './designer/designer-profile/designer-profile.component';
import { DesignerListComponent } from './user/designer-list/designer-list.component';
import { DesignersProfileComponent } from './user/designers-profile/designers-profile.component';
import { DesignerBasedDesignsComponent } from './user/designer-based-designs/designer-based-designs.component';
import { ChatComponent } from './user/chat/chat.component';
import { ChatingComponent } from './designer/chating/chating.component';


// environment
import { environment } from 'src/environments/environment';

// Guards
import { UserGuard } from './user/user.guard';
import { DesignerGuard } from './designer/designer.guard';
import { AdminGuard } from './admin/admin.guard';

// services
import { SocketService } from './services/socket.service';
import { AuthServiceService } from './services/auth-service.service';
import { SharedDataServiceService } from './designer/shared-data-service.service';
import { ConnectionRequestsComponent } from './designer/connection-requests/connection-requests.component';

const config: SocketIoConfig = {
	url: environment.socketUrl, 
	options: {
	}
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    DesignerHomeComponent,
    MailVerificationComponent,
    DesignerLoginComponent,
    DesignerSignUpComponent,
    DesignerNavbarComponent,
    DesignerFooterComponent,
    SidebarComponent,
    AddDesignsComponent,
    DesignsComponent,
    DesignCategoryComponent,
    AddCategoryComponent,
    DesignListComponent,
    EditDesignComponent,
    UserDetailsComponent,
    AdminLoginComponent,
    AdminCategoryComponent,
    AdminNavComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
    EditCategoryComponent,
    DesAddCategoryComponent,
    ErrorPageComponent,
    CategoryApprovalComponent,
    DesignDetailViewComponent,
    ConsultationFormComponent,
    BookingsComponent,
    BookingDetailsComponent,
    DesignerProfileComponent,
    DesignerListComponent,
    DesignersProfileComponent,
    DesignerBasedDesignsComponent,
    ConsultationRequestsComponent,
    DesignerMailVerificationComponent,
    ChatingComponent,
    ConnectionRequestsComponent,


  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule,
    ProgressBarModule,
    TableModule,
    StripeModule,
    ButtonModule,
    ToastModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    CloudinaryModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config), 
    NgxAwesomePopupModule.forRoot(), 
    ConfirmBoxConfigModule.forRoot(),
    EffectsModule.forRoot([CategoryEffects]),
    StoreModule.forRoot({categories:reducer}),
    
  ],
  providers: [
    // Guards
    UserGuard,
    DesignerGuard,
    AdminGuard,
    // ṣervices
    SocketService,
    AuthServiceService,
    SharedDataServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorInterceptor,
      multi: true,
    },
    ToastrService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
