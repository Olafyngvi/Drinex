import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';



@NgModule({
  declarations: [OrdersComponent, OrderDetailedComponent, OrdersAdminComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ],
  exports: [ OrdersComponent ]
})
export class OrdersModule { }
