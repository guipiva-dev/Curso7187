import { Component, OnInit } from '@angular/core';

import { CartUtils } from 'src/app/utils/cart.utils';
import { Cart } from './../../../models/cart.model';
import { CartItem } from './../../../models/cart-item.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  cart: Cart;

  constructor() { }

  ngOnInit() {
    this.loadCart();
    console.log(this.cart);
  }

  loadCart() {
    this.cart = CartUtils.get();
  }

  removeItem(item: CartItem) {
    let index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);

    CartUtils.update(this.cart);
  }

  clear() {
    CartUtils.clear();
    this.loadCart();
  }

  obterValorTotal() {
    let total = 0;
    this.cart.items.forEach(item => {
      total += (item.quantity * item.price);
    });

    return total;
  }
}
