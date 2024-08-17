import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../data-access/products-state.service';
import { ProductService } from '../../data-access/products.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { ProductDetailStateService } from '../../data-access/product-detail-state.service';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
  providers : [ProductStateService,ProductService,ProductDetailStateService],
})
export default class ProductListComponent {
  productsState = inject(ProductStateService)
  cartState = inject(CartStateService).state;

  changePage(){
    const page = this.productsState.state.page() + 1;
    this.productsState.changePage$.next(page);
  }

  addToCart(product : Product){
    this.cartState.add({
      product,
      quantity:1,
    });
  }
}
