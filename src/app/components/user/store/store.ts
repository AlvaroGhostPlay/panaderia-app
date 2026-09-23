import { ChangeDetectorRef, Component } from '@angular/core';
import { Product, ProductCategory } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';
import { Pageable } from '../../components_generics/pageable/pageable';
import { Cart, UpdateCartDetail} from '../../../model/Cart';
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
  cantidad: number = 16;
  currentPage = 0;
  totalPages = 0;
  categoryTitle = 'Pan Dulce';
  cart: Cart = new Cart();
  userId: string = '';
  mostrarCart: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthstateService,
    private cdr: ChangeDetectorRef,
    private paymmentService: PaymmentService,
  ) {}

  ngOnInit() {
    this.userId = <string>this.authService.user?.username;
    this.findAllCategories();
    console.log(this.cantidad);
    console.log(this.productCategory);
    this.findAllProductCategories(this.productCategory, this.cantidad.toString(), this.currentPage.toString());
    this.findCart(this.userId);
  }

  findCart(userId: string | undefined) {
    if (typeof userId === 'string') {
      this.paymmentService.getCart(userId).subscribe({
        next: (data) => {
          console.log('Carrito');
          console.log(data);
          this.cart = data;
          this.mostrarCart = true;
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
    this.findAllProductCategories(this.productCategory, this.cantidad.toString(), this.currentPage.toString());
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
    this.productService.getProductsStore(pagina, cantidad, productCategory, this.userId).subscribe({
      next: (page: any) => {
        console.log(page);
        this.products = page.content ?? [];
        this.currentPage = page.number ?? 0;
        this.totalPages = page.totalPages ?? 0;
        this.cdr.detectChanges();
      },

      error: (err) => {
        this.products = [];
        this.currentPage = 0;
        this.totalPages = 0;
        this.cdr.detectChanges();
      },
    });
  }

  actualizarVariable(event: Event): void {
    const combo = event.target as HTMLSelectElement;
    this.cantidad = Number(combo.value);
    this.currentPage = 0;
    this.findAllProductCategories(this.productCategory, this.cantidad.toString(), this.currentPage.toString());
  }

  changePage(page: number) {
    this.currentPage = page;
    this.findAllProductCategories(this.productCategory, this.cantidad.toString(), this.currentPage.toString());
  }

  addCart(product: Product): void {
    this.paymmentService.createCartOrAddCartDetail(product.productId, this.userId).subscribe({
      next: (data) => {
        console.log(data);
        this.cart = data;
        this.cdr.detectChanges();
      },
    });
  }

  additem(itemId: string, action:string): void {
    const request: UpdateCartDetail = {
      cartDetailAcction: action,
      cartDetailId: itemId,
    };


  }

  addOrRemoveProductFavoriteByUserFromFavorites(
    productId: string,
    userId: string,
    page: number,
    cantidad: number,
    categoria: string,
  ) {
    this.productService
      .addOrRemoveProductFavoriteByUser(productId, userId, page, cantidad, categoria)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.products = data.content;
          this.cdr.detectChanges();
        },
      });
  }
}
