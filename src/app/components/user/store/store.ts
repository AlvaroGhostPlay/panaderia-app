import { ChangeDetectorRef, Component } from '@angular/core';
import { Product, ProductCategory } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';
import { Pageable } from '../../components_generics/pageable/pageable';
import { Cart } from '../../../model/Cart';
import { AuthService } from '../../../services/auth.service';
import { PaymmentService } from '../../../services/paymment.service';
import { AuthstateService } from '../../../services/authstate.service';

@Component({
  imports: [Pageable],
  selector: 'store',
  templateUrl: './store.html',
})
export class Store {
  products: Product[] = [];
  categories: ProductCategory[] = [];
  productCategory: string = 'DULCE';
  cantidad: string = '16';
  currentPage = 0;
  totalPages = 0;
  categoryTitle = 'Pan Dulce';
  cart: Cart = new Cart();
  userId: string | undefined = '';
  mostrarCart: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthstateService,
    private cdr: ChangeDetectorRef,
    private paymmentService: PaymmentService,
  ) {}

  ngOnInit() {
    this.userId = this.authService.user?.username;
    this.findAllCategories();
    console.log(this.cantidad);
    console.log(this.productCategory);
    this.findAllProductCategories(this.productCategory, this.cantidad, this.currentPage.toString());
    this.findCart(this.userId);
  }

  findCart(userId: string | undefined) {
    if (typeof userId === 'string') {
      this.paymmentService.getCart(userId).subscribe({
        next: (data) => {
          this.cart = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
          if (err.error.status === 404) {
            this.mostrarCart = false;
          } else {
            this.mostrarCart = true;
          }
        },
      });
    }
  }

  changeCategory(category: ProductCategory) {
    console.log('change category', category);
    this.productCategory = category.productCategoryId;
    this.categoryTitle = category.typeName;
    this.currentPage = 0;
    console.log(this.productCategory);
    console.log(this.currentPage.toString());
    this.findAllProductCategories(this.productCategory, this.cantidad, this.currentPage.toString());
    this.cdr.detectChanges();
  }

  findAllCategories(): void {
    this.productService.getAllProductCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this.categories = categories;
        this.cdr.detectChanges();
      },
    });
  }

  findAllProductCategories(productCategory: string, cantidad: string, pagina: string): void {
    console.log('1. Entró a findAllProductCategories');
    console.log('Parámetros:', productCategory, cantidad, pagina);

    this.productService.getProductsStore(pagina, cantidad, productCategory).subscribe({
      next: (page: any) => {
        console.log('2. RESPUESTA PRODUCTS:', page);

        this.products = page.content ?? [];
        this.currentPage = page.number ?? 0;
        this.totalPages = page.totalPages ?? 0;

        console.log(this.products);

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('2. ERROR PRODUCTS:', err);

        this.products = [];
        this.currentPage = 0;
        this.totalPages = 0;

        this.cdr.detectChanges();
      },

      complete: () => {
        console.log('3. Petición completada');
      },
    });
  }

  actualizarVariable(event: Event): void {
    const combo = event.target as HTMLSelectElement;
    this.cantidad = combo.value;
    this.findAllProductCategories(this.productCategory, this.cantidad, this.currentPage.toString());
  }

  changePage(page: number) {
    this.currentPage = page;
    this.findAllProductCategories(this.productCategory, this.cantidad, this.currentPage.toString());
  }

  addCart(): void {}

  removeCart(): void {}
}
