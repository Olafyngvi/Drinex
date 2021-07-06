import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';
import { ConfirmationDialogService } from '../../shared/components/confirmation-dialog/confirmation-dialog.service';
import { ForgotPasswordDto } from '../../shared/models/ForgotPasswordDto';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;
  isAdmin$: Observable<boolean>;
  public isOpen = false;

  constructor(
    private cds: ConfirmationDialogService,
    private basketService: BasketService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
  }

  // tslint:disable-next-line: typedef
  logout() {
    this.cds.confirm('Odjava', 'Jeste li sigurni da se želite odjaviti ?', 'Odjavi se', 'Odustani')
    .then(confirmed => {
      if (confirmed) {
        this.accountService.logout();
      }
    });
  }
}
