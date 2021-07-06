import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit {
  products: IProduct[];
  pageSize = 4;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getNewProducts(this.pageSize).subscribe(response => {
      this.products = response.data;
    });
  }

}
