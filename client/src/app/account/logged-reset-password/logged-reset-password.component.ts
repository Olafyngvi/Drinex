import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoggedResetPasswordDto } from 'src/app/shared/models/loggedResetPassword';
import { PasswordConfirmationValidatorService } from 'src/app/shared/password-confirmation-validator.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-logged-reset-password',
  templateUrl: './logged-reset-password.component.html',
  styleUrls: ['./logged-reset-password.component.scss']
})
export class LoggedResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;
  private email: string;

  constructor(private accountService: AccountService,
              private passConfValidator: PasswordConfirmationValidatorService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    console.log(this.email);
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    this.resetPasswordForm.get('confirm').setValidators([Validators.required,
      this.passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('newpassword'))]);
  }
  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName);
  }

  public resetPassword = (resetPasswordFormValue) => {
    this.showError = this.showSuccess = false;

    const resetPass = { ... resetPasswordFormValue };
    const resetPassDto: LoggedResetPasswordDto = {
      password: resetPass.password,
      newpassword: resetPass.newpassword,
      email: this.email
    };

    this.accountService.loggedResetPassword(resetPassDto)
    .subscribe(() => {
      this.showSuccess = true;
      setTimeout(() => {
        this.accountService.logoutPasswordReset();
      }, 3000);
    },
    error => {
      this.showError = true;
      this.errorMessage = error.error.errors;
      console.log(error);
    });
  }
}
