import { Product } from './product.model';

export class Cart {
  cartId!: string;
  userId!: string;
  state!: boolean;
  updated!: Date;
  totalItems!: number;
  cartDetailResponseDto!: CartItem[];
}

export class CartItem {
  cartDetailId!: string;
  product!: Product;
  quantity!: number;
  updated!: Date;
}
