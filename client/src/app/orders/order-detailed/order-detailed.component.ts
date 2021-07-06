import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;
  isAdmin$: Observable<boolean>;

  constructor(
    private cds: ConfirmationDialogService,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private orderService: OrdersService,
    private accountService: AccountService
  ) {
    this.breadcrumbService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    this.isAdmin$ = this.accountService.isAdmin$;
    // tslint:disable-next-line: deprecation
    this.isAdmin$.subscribe((admin) => {
      if (admin) {
        this.orderService
          .getOrderForAdmin(+this.route.snapshot.paramMap.get('id'))
          // tslint:disable-next-line: deprecation
          .subscribe(
            (order: IOrder) => {
              this.order = order;
              this.breadcrumbService.set(
                '@OrderDetailed',
                `Order# ${order.id} - ${order.status}   -   ${order.buyerEmail}`
              );
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        this.orderService
          .getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
          // tslint:disable-next-line: deprecation
          .subscribe(
            (order: IOrder) => {
              console.log(order);
              this.order = order;
              this.breadcrumbService.set(
                '@OrderDetailed',
                `Narudžba# ${order.id} - ${order.status}   -   ${order.buyerEmail}`
              );
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }

  // tslint:disable-next-line: typedef
  setShipped(id: number) {
    this.cds
      .confirm(
        'Pažnja',
        'Jeste li sigurni da želite označiti narudžbu kao poslanu ?',
        'Pošalji',
        'Odustani'
      )
      .then((confirmed) => {
        // tslint:disable-next-line: deprecation
        this.orderService.updateOrder(id).subscribe(
          () => {
            console.log('Order updated');
            this.router.navigate(['/orders/all']);
          },
          (error) => {
            console.log(error);
          }
        );
      });
  }
}
