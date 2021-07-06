import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser, GoogleLoginProvider} from 'angularx-social-login';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ExternalAuthDto } from 'src/app/shared/models/externalAuthDto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  user: SocialUser;
  registerForm: FormGroup;
  errors: string[];
  showError: boolean;
  errorMessage: string;

  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService,
              private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }
  signInWithGoogle = () => {
    this.showError = false;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(res => {
      const user: SocialUser = { ...res };
      console.log(user);
      this.user = user;
      const externalAuth: ExternalAuthDto = {
        provider: user.provider,
        idToken: user.idToken
      };
      this.validateExternalAuth(externalAuth);
    }, error => console.log(error));
  }

  // tslint:disable-next-line: typedef
  validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.accountService.externalLogin(externalAuth)
    .subscribe(res => {
      this.router.navigate([this.returnUrl]);
    },
    error => {
      console.log(error);
      this.errorMessage = error;
      this.showError = true;

    });
  }
  signOut(): any{
    // tslint:disable-next-line: no-unused-expression
    this.authService.signOut();
  }

  // tslint:disable-next-line: typedef
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required),
    });
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      console.log(error);
      this.errorMessage = error.error.errors;
      this.showError = true;
    });
  }

  public signOutExternal = () => {
    this.authService.signOut();
  }
}
