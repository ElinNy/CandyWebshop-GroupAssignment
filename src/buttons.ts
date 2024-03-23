import { getProducts } from "./api-exchange";
import { addToCart } from "./shoppingcart";

export function addCandyToCart() {
    let addToCartButtons = document.querySelectorAll('.add-to-cart');
    let clickEvent = async (e: Event) => {
        const target: HTMLElement = e.target as HTMLElement;
        const id: number = parseInt(target.getAttribute('data-product-id') as string);
        const products = await getProducts();
        let selectedProduct = products.find(product => product.id === id);
        if (selectedProduct) { 
            addToCart(selectedProduct);
        } else {
            console.error('Product not found');
        }
    };
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', clickEvent)
    })
}

