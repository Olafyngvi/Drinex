import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  email: string;
  name: string;
  orders: IOrder[];
  ordersCount: number;

  constructor(private orderService: OrdersService,
              private breadcrumbService: BreadcrumbService,
              private route: ActivatedRoute) {
                if (this.route.snapshot.params?.email !== undefined) {
                  this.email = atob(this.route.snapshot.params?.email);
                  this.name = atob(this.route.snapshot.params?.name);
                }
                this.breadcrumbService.set('@Orders', '');
              }

  ngOnInit(): void {
    console.log(this.email);
    this.getOrders();
  }

  // tslint:disable-next-line: typedef
  getOrders() {
    if (this.email === undefined) {
      // tslint:disable-next-line: deprecation
      this.orderService.getOrdersForUser().subscribe(
        (orders: IOrder[]) => {
          this.orders = orders;
          this.ordersCount = orders.length;
          this.breadcrumbService.set('@Orders', 'Vaše narudžbe');
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // tslint:disable-next-line: deprecation
      this.orderService.getOrdersByMail(this.email).subscribe(
        (orders: IOrder[]) => {
          this.orders = orders;
          this.ordersCount = orders.length;
          this.breadcrumbService.set('@Orders', 'Narudžbe od ' + this.name);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
