import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderParams } from '../shared/models/orderParams';
import { IPagination, Pagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  pagination = new Pagination();
  orderParams = new OrderParams();

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getAllOrders() {
    let params = new HttpParams();

    if (this.orderParams.status) {
      params = params.append('status', this.orderParams.status);
    }

    if (this.orderParams.search) {
      params = params.append('search', this.orderParams.search);
    }

    params = params.append('pageIndex', this.orderParams.pageNumber.toString());
    params = params.append('pageSize', this.orderParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'orders/all', { observe: 'response', params })
      .pipe(
        map(response => {
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }

  // tslint:disable-next-line: typedef
  setOrderParams(params: OrderParams) {
    this.orderParams = params;
  }

  // tslint:disable-next-line: typedef
  getOrderParams() {
    return this.orderParams;
  }

  // tslint:disable-next-line: typedef
  getOrdersByMail(mail: string) {
    return this.http.get(this.baseUrl + 'orders/' + mail + '/all');
  }

  // tslint:disable-next-line: typedef
  getOrdersForUser() {
    return this.http.get(this.baseUrl + 'orders');
  }

  // tslint:disable-next-line: typedef
  getOrderDetailed(id: number) {
    return this.http.get(this.baseUrl + 'orders/' + id);
  }

  // tslint:disable-next-line: typedef
  getOrderForAdmin(id: number) {
    return this.http.get(this.baseUrl + 'orders/admin/' + id);
  }

  // tslint:disable-next-line: typedef
  updateOrder(id: number) {
    return this.http.put(this.baseUrl + 'orders/' + id, {});
  }
}
