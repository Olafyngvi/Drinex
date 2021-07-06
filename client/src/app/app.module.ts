import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { SuccessfulComponent } from './contact/successful.component';
import { ServisComponent } from './servis/servis.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule, GoogleLoginProvider, AuthServiceConfig} from 'angularx-social-login';
import { SlideshowComponent } from './servis/slideshow/slideshow.component';
import { FiskalizacijaComponent } from './servis/fiskalizacija/fiskalizacija.component';
import { PolovnoComponent } from './servis/polovno/polovno.component';
import { FooterComponent } from './servis/footer/footer.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('310477454057-rvsedr66u7dvktiiv6fjq9ah8u4b8dt9.apps.googleusercontent.com')
  }
]);
// tslint:disable-next-line: typedef
export function provideConfig() {
  return config;
}
// tslint:disable-next-line: typedef
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    SuccessfulComponent,
    ServisComponent,
    SlideshowComponent,
    FiskalizacijaComponent,
    PolovnoComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    NgxSpinnerModule,
    CommonModule,
    NgbModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: AuthServiceConfig,
    useFactory: provideConfig},
    Meta,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
