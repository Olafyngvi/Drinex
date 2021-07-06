import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { OrderParams } from 'src/app/shared/models/orderParams';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.scss']
})
export class OrdersAdminComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  orders: IOrder[];

  orderParams: OrderParams;
  totalCount: number;
  statusOptions = [
    {name: 'Sve', value: ''},
    {name: 'U pripremi', value: 'Pending'},
    {name: 'Poslana', value: 'Shipped'},
    {name: 'Isporučena', value: 'Delivered'}
  ];
  constructor(private ordersService: OrdersService,
              private breadCrumbs: BreadcrumbService) {
    this.orderParams = this.ordersService.getOrderParams();
  }

  ngOnInit(): void {
    this.breadCrumbs.set('@OrdersAdmin', 'Sve narudžbe');
    this.getOrders();
  }

  // tslint:disable-next-line: typedef
  getOrders() {
    // tslint:disable-next-line: deprecation
    this.ordersService.getAllOrders().subscribe(response => {
      this.orders = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  onStatusSelected(status: string) {
    const params = this.ordersService.getOrderParams();
    params.status = status;
    this.ordersService.setOrderParams(params);
    this.getOrders();
  }

  // tslint:disable-next-line: typedef
  onPageChanged(event: any) {
    const params = this.ordersService.getOrderParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.ordersService.setOrderParams(params);
      this.getOrders();
    }
  }

  // tslint:disable-next-line: typedef
  onSearch() {
    const params = this.ordersService.getOrderParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.ordersService.setOrderParams(params);
    this.getOrders();
  }

  // tslint:disable-next-line: typedef
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.orderParams = new OrderParams();
    this.ordersService.setOrderParams(this.orderParams);
    this.getOrders();
  }
}
