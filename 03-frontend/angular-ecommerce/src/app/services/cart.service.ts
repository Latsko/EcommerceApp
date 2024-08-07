import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;

  constructor() {

    // read data form storage 
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      // compute totals based on hte data that is read from storage
      this.computeCartTotals();
    }
   }

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      // find item in the cart based on item id

      existingCartItem = this.cartItems.find(item => item.id === theCartItem.id);

      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem!.quantity++;

      this.computeCartTotals();
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);

      //compute cart total price and total quantity
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQunatityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQunatityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQunatityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQunatityValue);

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQunatityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.unitPrice * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity},
         unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice.toFixed(2)}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQunatityValue}`);
    console.log('-----');
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if(theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);

    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

}
