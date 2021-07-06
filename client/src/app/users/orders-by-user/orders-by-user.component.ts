import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders-by-user',
  templateUrl: './orders-by-user.component.html',
  styleUrls: ['./orders-by-user.component.scss']
})
export class OrdersByUserComponent implements OnInit {
  @Input() orders: IOrder[];
  ordersCount: number;
  constructor() { }

  ngOnInit(): void {
    console.log('from orders comp')
    console.log(this.orders);
  }
}
