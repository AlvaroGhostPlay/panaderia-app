import { ChangeDetectorRef, Component } from '@angular/core';
import { Product, ProductCategory } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  imports: [],
  selector: 'store',
  templateUrl: './store.html',
})
export class Store {
  products: Product[] = [];
  categories: ProductCategory[] = [];
  productCategory: string = 'DULCE';
  cantidad:string = '16';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.findAllCategories();
    this.cantidad= '16';
    this.findAllProductCategories(this.productCategory, this.cantidad);
  }

  changeCategory(categoryId: string) {
    console.log('change category', categoryId);
    this.productCategory = categoryId;
    this.findAllProductCategories(this.productCategory, this.cantidad);
  }

  findAllCategories(): void {
    this.productService.getAllProductCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this.categories = categories;
        this.cdr.detectChanges();
      },
    });
  }

  findAllProductCategories(productCategory: string, cantidad: string): void {
    this.productService.getProductsStore('0', cantidad, productCategory).subscribe({
      next: (page: any) => {
        this.products = page.content;
        this.cdr.detectChanges();
      },
    });
  }

  actualizarVariable(event: Event): void {
    const combo = event.target as HTMLSelectElement;
    this.cantidad = combo.value;
    this.findAllProductCategories(this.productCategory, this.cantidad);
  }

  addCart(): void {}

  removeCart(): void {}
}
