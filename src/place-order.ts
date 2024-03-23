import { IProduct } from "./interfaces";
import { ContactInfo } from "./interfaces";
import { Product } from "./interfaces";
import { orderResponse } from "./interfaces"
import { productsInCart } from "./shoppingcart";
import { showSuccessModal, closeModal} from "./confirmation";

let productInfoArray: Product[] = [];
let orderTotal: number = 0;

getProductsInCart();

export const postOrder = async (order: ContactInfo) => {
  try {
    const requestOrder = await fetch(
      "https://www.bortakvall.se/api/v2/users/27/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
    const res: orderResponse = await requestOrder.json();

    if (!requestOrder.ok) {
      throw new Error("could not send post");
    }
    showSuccessModal(res);
  } catch (error) {
    alert("Beställningen kunde inte skickas, plz try again");
  }
};

const closeBtn = document.getElementById("closeBtn");
closeBtn?.addEventListener("click", () => {
  closeModal();
});

export function submitOrder() {
  const sendOrder = document.getElementById("CheckoutForm");
  sendOrder?.addEventListener("submit", async (event) => {
    event.preventDefault();
    getProductsInCart();
    const contactInfo: ContactInfo = {
      customer_first_name:
        document.querySelector<HTMLInputElement>("#nameId")?.value || "",
      customer_last_name:
        document.querySelector<HTMLInputElement>("#lastNameId")?.value || "",
      customer_address:
        document.querySelector<HTMLInputElement>("#adressId")?.value || "",
      customer_postcode:
        document.querySelector<HTMLInputElement>("#postNrId")?.value || "",
      customer_city:
        document.querySelector<HTMLInputElement>("#ortId")?.value || "",
      customer_phone:
        document.querySelector<HTMLInputElement>("#telNrId")?.value || "",
      customer_email:
        document.querySelector<HTMLInputElement>("#emailId")?.value || "",
      order_items: productInfoArray,
      order_total: orderTotal,
    };
    await postOrder(contactInfo);
  });
}

function getProductsInCart() {
  const productsItems: IProduct[] = [];
  productsInCart.forEach((product) => productsItems.push(product));
  for (let i = 0; i < productsItems.length; i++) {
    let selectedProducts: Product = {
      product_id: productsItems[i].id,
      qty: productsItems[i].quantity,
      item_price: productsItems[i].price,
      item_total: 0,
    };
    selectedProducts.item_total =
    selectedProducts.qty * selectedProducts.item_price;
    orderTotal = orderTotal += selectedProducts.item_total;
    productInfoArray.push(selectedProducts);
  }
  return productInfoArray;
}