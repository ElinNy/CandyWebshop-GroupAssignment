 let localProducts: IProduct[] = [];
 import { IProduct } from "./interfaces";
 
export async function getProducts(): Promise<IProduct[]> { 
    try {

        const localCart = getCart();
        
        if (localProducts.length === 0) {
            const response = await fetch('https://www.bortakvall.se/api/v2/products');
    
            const products = await response.json();
            
            localProducts = [...products.data];
        }

        localCart.forEach(cartProduct => {
            localProducts.forEach(localProduct => {
                if (cartProduct.id === localProduct.id) {
                    localProduct.stock_quantity = cartProduct.stock_quantity;
                }
            })
        });

        return localProducts

    } catch (error) {
        
        return Promise.reject(error);
    }
}

export function updateProduct(product: IProduct) {
    localProducts.forEach(localProduct => {
        if(localProduct.id === product.id) {
            localProduct = {
                ...localProduct,
                ...product
            }
        }

    })
}

function getCart(): Map<string, IProduct> {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      return new Map(JSON.parse(cartData));
    }
    return new Map();
  }
