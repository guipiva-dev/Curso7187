import { CartItem } from './../models/cart-item.model';
import { Cart } from './../models/cart.model';

export class CartUtils {

    public static get(): Cart {
        
        //Recuperar o carrinho
        let cart = localStorage.getItem('petshopcart');

        // Caso não exista, retornar um novo carrinho
        if(!cart) {
            return new Cart();
        }

        return JSON.parse(cart);
    }

    public static add(id: string, product: string, quantity:number, price: number, image: string) {

        // Recuperar o Carrinho
        let cart = this.get();

        // Criar o item
        let item = new CartItem(id, product, quantity, price, image);

        // Adicionar o item no carrinho
        cart.items.push(item);

        //Atualizar o localStorage
        this.update(cart);
    }

    public static update(cart: Cart) {
        localStorage.setItem('petshopcart', JSON.stringify(cart));
    }

    public static clear() {
        localStorage.removeItem('petshopcart');
    }
}