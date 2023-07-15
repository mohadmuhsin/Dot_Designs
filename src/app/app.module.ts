import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/ng';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
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
import { AuthServiceService } from './services/auth-service.service';
import { SharedDataServiceService } from './designer/shared-data-service.service';
import { AuthGuard } from './designer/auth.guard';
import { SidebarComponent } from './designer/sidebar/sidebar.component';
import { AddDesignsComponent } from './designer/add-designs/add-designs.component';
import { StoreModule } from '@ngrx/store';
// import 'tailwindcss-dropdown';

//state
import {  reducer } from './admin/admin-state/reducer'; 
import {CategoryEffects}from './admin/admin-state/effects';
import { EffectsModule } from '@ngrx/effects';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    DesignerMailVerificationComponent,
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CloudinaryModule,
    StoreModule.forRoot({categories:reducer}),
    EffectsModule.forRoot([CategoryEffects]),
    
  ],
  providers: [
    AuthServiceService,
    SharedDataServiceService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
