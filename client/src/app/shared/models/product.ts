export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  sifra: string;
  oldPrice: number;
  pictureUrl: string;
  productType: string;
  productBrand: string;
  stock: number;
  izdvojen: boolean;
  novo: boolean;
  sale: boolean;
  photos: IPhoto[];
}

export interface IPhoto {
  id: number;
  pictureUrl: string;
  fileName: string;
  isMain: boolean;
}

export interface IProductToCreate {
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  pictureUrl: string;
  productTypeId: number;
  productBrandId: number;
  stock: number;
}

export class ProductFormValues implements IProductToCreate {
  name = '';
  description = '';
  price = 0;
  sifra = '';
  oldPrice = 0;
  pictureUrl = '';
  productBrandId: number;
  productTypeId: number;
  stock = 0;

  constructor(init?: ProductFormValues) {
    Object.assign(this, init);
  }
}
