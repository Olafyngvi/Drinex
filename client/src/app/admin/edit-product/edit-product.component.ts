import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ShopService } from '../../shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductFormValues } from '../../shared/models/product';
import { IBrand } from '../../shared/models/brand';
import { IType } from '../../shared/models/productType';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product: IProduct;
  productFormValues: ProductFormValues = new ProductFormValues();
  brands: IBrand[];
  types: IType[];
  novi: boolean;

  constructor(
    private adminService: AdminService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();

    // tslint:disable-next-line: deprecation
    forkJoin([types, brands]).subscribe(
      (results) => {
        this.types = results[0];
        this.brands = results[1];
      },
      (error) => {
        console.log(error);
      },
      () => {
        if (this.route.snapshot.url[0].path === 'edit') {
          this.loadProduct();
          this.novi = false;
        } else {
          this.novi = true;
        }
      }
    );
  }

  // tslint:disable-next-line: typedef
  updatePrice(event: any) {
    this.product.price = event;
  }

  // tslint:disable-next-line: typedef
  loadProduct() {
    // tslint:disable-next-line: deprecation
    this.shopService
      .getProduct(+this.route.snapshot.paramMap.get('id'))
      // tslint:disable-next-line: deprecation
      .subscribe((response: any) => {
        const productBrandId =
          this.brands &&
          this.brands.find((x) => x.name === response.productBrand).id;
        const productTypeId =
          this.types &&
          this.types.find((x) => x.name === response.productType).id;
        this.product = response;
        this.productFormValues = { ...response, productBrandId, productTypeId };
      });
  }

  // tslint:disable-next-line: typedef
  getBrands() {
    return this.shopService.getBrands();
  }

  // tslint:disable-next-line: typedef
  getTypes() {
    return this.shopService.getTypes();
  }

  // tslint:disable-next-line: typedef
  onSubmit(product: ProductFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = {
        ...this.product,
        ...product,
        price: +product.price,
      };
      // tslint:disable-next-line: deprecation
      this.adminService
        .updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id'))
        // tslint:disable-next-line: deprecation
        .subscribe((response: any) => {
          this.router.navigate(['/admin']);
        });
    } else {
      const newProduct = { ...product, price: +product.price };
      // tslint:disable-next-line: deprecation
      this.adminService.createProduct(newProduct).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
