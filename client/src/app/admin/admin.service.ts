import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IProduct, ProductFormValues } from '../shared/models/product';
import { UsersParams } from '../shared/models/usersParams';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  pagination = new Pagination();
  usersParams = new UsersParams();

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  getUsers() {
    let params = new HttpParams();

    if (this.usersParams.search) {
      params = params.append('search', this.usersParams.search);
    }

    params = params.append('sort', this.usersParams.sort);
    params = params.append('pageIndex', this.usersParams.pageNumber.toString());
    params = params.append('pageSize', this.usersParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'Account/users', { observe: 'response', params })
      .pipe(
        map(response => {
          this.pagination = response.body;
          return this.pagination;
        })
      );
    // return this.http.get(this.baseUrl + 'Account/users');
  }
  // tslint:disable-next-line: typedef
  setUsersParams(params: UsersParams) {
    this.usersParams = params;
  }

  // tslint:disable-next-line: typedef
  getUsersParams() {
    return this.usersParams;
  }

  // tslint:disable-next-line: typedef
  createProduct(product: ProductFormValues) {
    return this.http.post(this.baseUrl + 'products', product);
  }

  // tslint:disable-next-line: typedef
  updateProduct(product: ProductFormValues, id: number) {
    return this.http.put(this.baseUrl + 'products/' + id, product);
  }

  // tslint:disable-next-line: typedef
  izdvoji(product: IProduct, id: number) {
    return this.http.put(this.baseUrl + 'products/promote/' + id, product);
  }

  // tslint:disable-next-line: typedef
  new(product: IProduct, id: number) {
    return this.http.put(this.baseUrl + 'products/new/' + id, product);
  }

  // tslint:disable-next-line: typedef
  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  // tslint:disable-next-line: typedef
  uploadImage(file: File, id: number) {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');
    return this.http.put(this.baseUrl + 'products/' + id + '/photo', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // tslint:disable-next-line: typedef
  deleteProductPhoto(photoId: number, productId: number) {
    return this.http.delete(
      this.baseUrl + 'products/' + productId + '/photo/' + photoId
    );
  }

  // tslint:disable-next-line: typedef
  setMainPhoto(photoId: number, productId: number) {
    return this.http.post(
      this.baseUrl + 'products/' + productId + '/photo/' + photoId,
      {}
    );
  }
}
