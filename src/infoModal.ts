import { Modal } from "bootstrap"

export function openModal(): void {
  const modal = document.getElementById("infoModal");
  if (modal) {
    const iModal = new Modal(modal);
    iModal.show();
  }
}

export function closeModal(): void {
  const modal = document.getElementById("infoModal");
  if (modal) {
    const iModal = new Modal(modal);
    iModal.hide();
  }
}