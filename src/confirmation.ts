import { Modal } from "bootstrap";
import { orderResponse } from "./interfaces";

export function showSuccessModal(orderResponse: orderResponse): void {
  const modal = document.getElementById("successModal");
  if (modal) {
    const successModal = new Modal(modal);

    const modalBody = modal.querySelector(".modal-body");
    if (modalBody) {
      modalBody.innerHTML = `
        <p>Tack för din beställning! Ditt ordernr är ${orderResponse.data.id}.</p>
        <h6>Orderinformation:</h6>
        <ul>
          <li>Namn: ${orderResponse.data.customer_first_name} ${orderResponse.data.customer_last_name}</li>
          <li>Adress: ${orderResponse.data.customer_address}, ${orderResponse.data.customer_postcode} ${orderResponse.data.customer_city}</li>
          <li>Email: ${orderResponse.data.customer_email}</li>
          <li>Telefon: ${orderResponse.data.customer_phone}</li>
        </ul>
      `;
    }
    successModal.show();
  }
}

export function closeModal(): void {
  const modal = document.getElementById("successModal");
  if (modal) {
    const iModal = new Modal(modal);
    iModal.hide();
  }
}