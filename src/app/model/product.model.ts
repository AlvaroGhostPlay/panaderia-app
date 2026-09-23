export class Product {
  productId!: string;
  productName!: string;
  price!: number;
  imageUrl!: string;
  offer!: boolean;
  productCategory!: ProductCategory[];
  favorite!: boolean;
}

export class Cart{
  product !: Product;
  subtotal !: number;
  iva !: number;
  total !: number;
}

export class ProductCategory {
  productCategoryId!: string;
  typeName!: string;
  productCount!: number;
}
