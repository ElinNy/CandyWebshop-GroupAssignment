import { updateProduct } from "./api-exchange";
import { IProduct } from "./interfaces";
import { updateButtonStatus, updateInStockCount, updateRenderedStockQuantity } from "./render-cards";

export let productsInCart: Map<string, IProduct> = new Map();

if (document.readyState !== 'loading') {
  initializeCart();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    initializeCart();
  });
}

function getCart(): Map<string, IProduct> {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    return new Map(JSON.parse(cartData));
  }
  return new Map();
}

function saveCart(cart: Map<string, IProduct>): void {
  localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
}

function initializeCart(): void {
  productsInCart = getCart();
  renderCart();
  updateTotalPrice();
}

export function addToCart(product: IProduct): void {
  const productKey = product.name;
  if (productsInCart.has(productKey)) {
    const existingProduct = productsInCart.get(productKey)!;
    existingProduct.quantity++;
    updateExistingProductInCart(existingProduct);
  } else {
    product.quantity = 1;
    productsInCart.set(productKey, product);
    renderProductInCart(product);
  }
  product.stock_quantity--;
  updateProduct(product)
  saveCart(productsInCart);
  updateTotalPrice();
  if (product.stock_quantity <= 0) {
    updateInStockCount(false);
    updateButtonStatus(product.id.toString(), true);
    updateRenderedStockQuantity(product);
  }
}

function removeItemFromCart(productName: string): void {
    const existingProduct = productsInCart.get(productName)!;
    existingProduct.quantity--;
    if (existingProduct.quantity === 0) {
      productsInCart.delete(productName);
      removeRenderedItem(productName);
    } else {
      updateExistingProductInCart(existingProduct);
    }

    const initialStock = existingProduct.stock_quantity;
    existingProduct.stock_quantity++;

    if (initialStock === 0 && existingProduct.stock_quantity > 0) {
      updateButtonStatus(existingProduct.id.toString(), false);
      updateInStockCount(true);
      updateRenderedStockQuantity(existingProduct);
    }

    updateProduct(existingProduct)
    saveCart(productsInCart);
    updateTotalPrice();
}

function removeRenderedItem(productName: string): void {
    const li = document.getElementById(productName);
    if (li) {
      li.remove();
    }
}

function trashButton(productName: string): HTMLElement {
    const removeButton: HTMLElement = document.createElement("button");
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash");
    removeButton.appendChild(icon);
    removeButton.setAttribute("class", "btn");
    removeButton.classList.add("btn-primary");
    removeButton.classList.add("btn-sm");
    removeButton.classList.add('deleteBtn');
    removeButton.setAttribute("data-trash", productName);
    removeButton.addEventListener('click', function(){
        removeItemFromCart(productName);
    });
    return removeButton;
}

function renderProductInCart(product: IProduct): void {
  const hoverItem = `${product.name}, ${product.price} kr/st | Antal ${product.quantity} st, ${product.price * product.quantity}kr`;
  const hoverUl = document.querySelector("ul");
  let createLi = document.createElement("li");
  createLi.style.fontSize = "small";
  createLi.setAttribute("id", product.name);
  createLi.setAttribute("product_id", product.id.toString());
  createLi.setAttribute("item_price",product.price.toString() );
  createLi.setAttribute("qty", product.quantity.toString());
  createLi.innerHTML = hoverItem;
  const removeButton = trashButton(product.name);
  createLi.append(removeButton);
  hoverUl!.append(createLi);
}

function updateExistingProductInCart(product: IProduct): void {
  const li = document.getElementById(product.name);
  const removeButton = trashButton(product.name);
  if (li) {
    li.innerHTML = `${product.name}, ${product.price} kr/st | Antal ${product.quantity} st, ${product.price * product.quantity}kr`;
    li.append(removeButton);
  }
}

function renderCart(): void {
  productsInCart.forEach((product) => {
    renderProductInCart(product);
  });
}

function updateTotalPrice(): void {
  const totalDiv = document.querySelector("#total-div");
  if (totalDiv) {
    const total = Array.from(productsInCart.values()).reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    let totalSum = document.querySelector("#total-sum");
    if (totalSum) {
      totalSum.innerHTML = total.toString() + ' kr';
      totalDiv.append(totalSum);
    }
  }
}