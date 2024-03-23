import { productsInCart } from "./shoppingcart";

export function CartCheckout() {
    let allLi = document.querySelectorAll('li');
    let button = document.querySelectorAll('button');
    productsInCart.forEach((product)=>{
        for(let i= 0; i<allLi.length; i++){
            if(product.name === allLi[i].id){
                allLi[i].setAttribute('images', product.images.toString() );
                allLi[i].insertAdjacentHTML("afterbegin",
                    `<img src="https://www.bortakvall.se${ product.images.thumbnail}"
                    style = 
                    "width: 4rem; 
                    border-radius: 100%; 
                    margin-right: 1rem; 
                    margin-bottom: 1rem;">`);
            }
            button[i].classList.add('deleteBtn');
            button[i].addEventListener('click',()=>{
                window.location.reload();
            })
        }
    })
}