import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';

const routes: Routes = [
  {path: '', component: OrdersComponent},
  {path: ':email/:name', component: OrdersComponent, data: {breadcrumb: {alias: 'Orders'}}},
  {path: 'all', component: OrdersAdminComponent, data: {breadcrumb: {alias: 'OrdersAdmin'}}},
  {path: ':id', component: OrderDetailedComponent, data: {breadcrumb: {alias: 'OrderDetailed'}}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
