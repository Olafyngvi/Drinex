import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-snizeno',
  templateUrl: './snizeno.component.html',
  styleUrls: ['./snizeno.component.scss']
})
export class SnizenoComponent implements OnInit {
  products: IProduct[];
  pageSize = 3;

  constructor(private shopService: ShopService,
              private basketService: BasketService) {}

  ngOnInit(): void {

    this.shopService.getSaleProducts(this.pageSize).subscribe(response => {
      this.products = response.data;
    });
  }
// tslint:disable-next-line: typedef
addItemToBasket(product: IProduct) {
  this.basketService.addItemToBasket(product);
}
}
