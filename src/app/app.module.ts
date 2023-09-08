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
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SocketIoModule,SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {GoogleLoginProvider} from '@abacritt/angularx-social-login';
import { ChartModule } from 'angular-highcharts';
import { NgxPaginationModule } from 'ngx-pagination';
//state
import {  reducer } from './components/admin/admin-state/reducer'; 
import {CategoryEffects}from './components/admin/admin-state/effects';
import { EffectsModule } from '@ngrx/effects';



// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { HeaderComponent } from './components/user/header/header.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { DesignerHomeComponent } from './components/designer/designer-home/designer-home.component';
import { MailVerificationComponent } from './components/user/mail-verification/mail-verification.component';
import { MyInterceptorInterceptor } from './my-interceptor.interceptor';
import { DesignerLoginComponent } from './components/designer/designer-login/designer-login.component';
import { DesignerSignUpComponent } from './components/designer/designer-sign-up/designer-sign-up.component';
import { DesignerNavbarComponent } from './components/designer/designer-navbar/designer-navbar.component';
import { DesignerFooterComponent } from './components/designer/designer-footer/designer-footer.component';
import { DesignsComponent } from './components/designer/designs/designs.component';
import { DesignerMailVerificationComponent } from './components/designer/designer-mail-verification/designer-mail-verification.component';
import { SidebarComponent } from './components/designer/sidebar/sidebar.component';
import { AddDesignsComponent } from './components/designer/add-designs/add-designs.component';
import { DesignCategoryComponent } from './components/designer/design-category/design-category.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { DesignListComponent } from './components/user/design-list/design-list.component';
import { EditDesignComponent } from './components/designer/edit-design/edit-design.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { EditCategoryComponent } from './components/admin/edit-category/edit-category.component';
import { DesAddCategoryComponent } from './components/designer/des-add-category/des-add-category.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CategoryApprovalComponent } from './components/admin/category-approval/category-approval.component';
import { DesignDetailViewComponent } from './components/user/design-detail-view/design-detail-view.component';
import { ConsultationFormComponent } from './components/user/consultation-form/consultation-form.component';
import { BookingsComponent } from './components/user/bookings/bookings.component';
import { BookingDetailsComponent } from './components/user/booking-details/booking-details.component';
import { ConsultationRequestsComponent } from './components/designer/consultation-requests/consultation-requests.component';
import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { DesignerProfileComponent } from './components/designer/designer-profile/designer-profile.component';
import { DesignerListComponent } from './components/user/designer-list/designer-list.component';
import { DesignersProfileComponent } from './components/user/designers-profile/designers-profile.component';
import { DesignerBasedDesignsComponent } from './components/user/designer-based-designs/designer-based-designs.component';
import { ChatComponent } from './components/user/chat/chat.component';
import { ChatingComponent } from './components/designer/chating/chating.component';
import { ConnectionRequestsComponent } from './components/designer/connection-requests/connection-requests.component';
import { WishlistComponent } from './components/user/wishlist/wishlist.component';
import { ConsultationDetailsComponent } from './components/designer/consultation-details/consultation-details.component';
import { FeedbackComponent } from './components/user/feedback/feedback.component';


// environment
import { environment } from 'src/environments/environment';



// Guards
import { userGuard } from './components/user/user.guard';
import { designerGuard } from './components/designer/designer.guard';
import { AdminGuard } from './components/admin/admin.guard';



// services
import { SocketService } from './services/socket.service';
import { AuthServiceService } from './services/auth-service.service';
import { SharedDataServiceService } from './services/shared-data-service.service';


// pipes
import { IncludesPipe } from './pipes/includes.pipe';
import { UniqueUsersPipePipe } from './pipes/unique-users-pipe.pipe';
import { DesignersComponent } from './components/admin/designers/designers.component';
import { UsersComponent } from './components/admin/users/users.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { VisitUsComponent } from './components/user/visit-us/visit-us.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { DforgotPasswordComponent } from './components/designer/dforgot-password/dforgot-password.component';


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
    IncludesPipe,
    UniqueUsersPipePipe,
    WishlistComponent,
    ConsultationDetailsComponent,
    FeedbackComponent,
    DesignersComponent,
    UsersComponent,
    VisitUsComponent,
    ForgotPasswordComponent,
    DforgotPasswordComponent,


  ],
  imports: [
    ChartModule,
    TableModule,
    StripeModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    ButtonModule,
    ToastModule,
    SliderModule,
    DropdownModule,
    CarouselModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CloudinaryModule,
    MultiSelectModule,
    ProgressBarModule,
    SocialLoginModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GoogleSigninButtonModule,
    SocketIoModule.forRoot(config), 
    NgxAwesomePopupModule.forRoot(), 
    ConfirmBoxConfigModule.forRoot(),
    EffectsModule.forRoot([CategoryEffects]),
    StoreModule.forRoot({categories:reducer}),
    
  ],
  providers: [ {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '246657283849-nrgnvlqb1sv84rfuepdp5m60huiff2pi.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
  },
    // Guards
    userGuard,
    designerGuard,
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
    ToastrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
