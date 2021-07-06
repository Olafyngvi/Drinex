import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, AfterViewInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  search: string;
  type: string;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    {name: 'Abecedno', value: 'name'},
    {name: 'Cijena: niža prema višoj', value: 'priceAsc'},
    {name: 'Cijena: viša prema nižoj', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService,
              private route: ActivatedRoute) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.search = this.route.snapshot.paramMap.get('search');
    this.type = this.route.snapshot.paramMap.get('type');
    const params = this.shopService.getShopParams();
    if (this.search !== null) {
      params.search = this.search;
      params.pageNumber = 1;
    }
    params.typeId = +this.type;
    this.shopService.setShopParams(params);
    this.getProducts(false);
    this.getBrands();
    this.getTypes();
  }

  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    if (this.search !== null) {
      this.searchTerm.nativeElement.value = this.search;
    }
  }
  // tslint:disable-next-line: typedef
  onIzdvojenSelected() {
    const params = this.shopService.getShopParams();
    if (params.izdvojen !== null) {
      params.izdvojen = null;
    } else {
      params.izdvojen = true;
    }
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onNovoSelected() {
    const params = this.shopService.getShopParams();
    if (params.novo !== null) {
      params.novo = null;
    } else {
      params.novo = true;
    }
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  // tslint:disable-next-line: typedef
  getProducts(useCache = false) {
    // tslint:disable-next-line: deprecation
    this.shopService.getProducts(useCache).subscribe(response => {
      console.log(response);
      this.products = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  onAkcijaSelected() {
    const params = this.shopService.getShopParams();
    if (params.akcija !== null) {
      params.akcija = null;
    } else {
      params.akcija = true;
    }
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  getBrands() {
    // tslint:disable-next-line: deprecation
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'Svi'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getTypes() {
    // tslint:disable-next-line: deprecation
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'Svi'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  // tslint:disable-next-line: typedef
  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

}
