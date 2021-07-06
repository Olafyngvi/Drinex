import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ExternalAuthDto } from '../shared/models/externalAuthDto';
import { AuthResponseDto } from '../shared/models/authResponseDto ';
import { AuthService } from 'angularx-social-login';
import { ForgotPasswordDto } from '../shared/models/ForgotPasswordDto';
import { ResetPasswordDto } from '../shared/models/ResetPasswordDto';
import { LoggedResetPasswordDto } from '../shared/models/loggedResetPassword';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private isAdminSource = new ReplaySubject<boolean>(1);
  isAdmin$ = this.isAdminSource.asObservable();
  // tslint:disable-next-line: no-inferrable-types
  private baseUrlForgotPassword: string  = '/client/src/app/account/forgot-password';
  cookieService: any;



  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  // tslint:disable-next-line: typedef
  loadCurrentUser(token: string) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }
  public externalLogin = (body: ExternalAuthDto) => {
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.baseUrl + 'account/externallogin', body).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }

  public forgotPassword = (body: ForgotPasswordDto) => {
    return this.http.post(this.baseUrl + 'account/forgotpassword', body);
  }

  public resetPassword = (body: ResetPasswordDto) => {
    return this.http.post(this.baseUrl + 'account/resetpassword', body);
  }

  public loggedResetPassword = (body: LoggedResetPasswordDto) => {
    return this.http.post(this.baseUrl + 'account/loggedresetpassword', body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  // tslint:disable-next-line: typedef
  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }
  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }
  // tslint:disable-next-line: typedef
  logoutPasswordReset() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.authService.signOut();
    this.router.navigateByUrl('account/login');
  }

  // tslint:disable-next-line: typedef
  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  // tslint:disable-next-line: typedef
  sendForgotPasswordEmail(email: string) {
    return this.http.post<any>(
      this.baseUrlForgotPassword + '/' + email,
      {},
      {
        headers: { Accept: 'application/json', 'No-Auth': 'True', 'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')}
      }
    )
    .pipe(
      map(
        (result) => {
          return result;
        },
        (error) => {
          return error;
        }
      )
    );
  }

  // tslint:disable-next-line: typedef
  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  // tslint:disable-next-line: typedef
  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

  isAdmin(token: string): boolean {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role.indexOf('Admin') > -1) {
        return true;
      }
    }
  }

}
