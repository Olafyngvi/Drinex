import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogService } from '../shared/components/confirmation-dialog/confirmation-dialog.service';
import { IBrand } from '../shared/models/brand';
import { IProduct, ProductFormValues } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from '../shop/shop.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  productFormValues: ProductFormValues = new ProductFormValues();
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  shopParams: ShopParams;
  sortOptions = [
    { name: 'Abecedno', value: 'name' },
    { name: 'Cijena: Niža prema višoj', value: 'priceAsc' },
    { name: 'Cijena: Viša prema nižoj', value: 'priceDesc' },
  ];

  constructor(
    private cds: ConfirmationDialogService,
    private shopService: ShopService,
    private adminService: AdminService
  ) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.GetProducts();
    this.getBrands();
    this.getTypes();
  }

  // tslint:disable-next-line: typedef
  GetProducts(useCache = false) {
    // tslint:disable-next-line: deprecation
    this.shopService.getProducts(useCache).subscribe(
      (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line: typedef
  getBrands() {
    // tslint:disable-next-line: deprecation
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'Sve' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  getTypes() {
    // tslint:disable-next-line: deprecation
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'Svi' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.GetProducts(true);
    }
  }
  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.GetProducts();
  }

  // tslint:disable-next-line: typedef
  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.GetProducts();
  }
  // tslint:disable-next-line: typedef
  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.GetProducts();
  }
  // tslint:disable-next-line: typedef
  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.GetProducts();
  }

  // tslint:disable-next-line: typedef
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.GetProducts();
  }

  // tslint:disable-next-line: typedef
  deleteProduct(id: number) {
    this.cds
      .confirm(
        'Pažnja',
        'Jeste li sigurni da želite obrisati odabrani proizvod ?',
        'Obriši',
        'Odustani'
      )
      .then((confirmed) => {
        if (confirmed) {
          // tslint:disable-next-line: deprecation
          this.adminService.deleteProduct(id).subscribe((response: any) => {
            this.products.splice(
              this.products.findIndex((p) => p.id === id),
              1
            );
            this.totalCount--;
          });
        }
      });
  }

  // tslint:disable-next-line: typedef
  izdvoji(product: IProduct) {
    // tslint:disable-next-line: deprecation
    this.adminService.izdvoji(product, product.id).subscribe(() => {
      console.log(product);
    });
  }
  new(product: IProduct) {
    // tslint:disable-next-line: deprecation
    this.adminService.new(product, product.id).subscribe(() => {
      console.log(product);
    });
  }
  sale(product: IProduct) {
    // tslint:disable-next-line: deprecation
    this.adminService.new(product, product.id).subscribe(() => {
      console.log(product);
    });
  }
}
