import { Component, OnInit } from '@angular/core';
import { IType } from 'src/app/shared/models/productType';
import { ShopService } from 'src/app/shop/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchInput: string;
  types: IType[];
  public isOpen = false;
  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
    this.getTypes();
  }

  // tslint:disable-next-line: typedef
  getTypes() {
    // tslint:disable-next-line: deprecation
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line: typedef
  search(){
    if (this.searchInput !== undefined) {
      this.router.navigate(['shop', {search: this.searchInput}]);
    }
  }
  // tslint:disable-next-line: typedef
  kategorije(id: number) {
    this.router.navigate(['shop', {type: id}]);
  }
}
