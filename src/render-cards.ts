import { getProducts } from "./api-exchange";
import { IProduct } from "./interfaces";
import { modalDOM } from "./modalRendering";
import { showBtn } from "./quick-view-btn";

const products = await getProducts();
const renderDiv = document.querySelector<HTMLDivElement>("#renderingCards");
let inStock = 0;

export const renderCards = () => {
  products.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  products.map((product) => {
    if (product) {
      const createDiv = document.createElement("div");
      createDiv.classList.add("col-6");
      createDiv.classList.add("col-md-4");
      createDiv.classList.add("col-lg-3");
      createDiv.classList.add("mb-3");
      createDiv.classList.add("modalDiv");
      createDiv.innerHTML = `
                <div class="card h-100">
                    <div id="quick-view">
                        <img id = "filter"
                            src="https://www.bortakvall.se/${product.images.thumbnail}"
                            class="card-img-top"
                            alt="..."
                        />
                        <button class="hide quickviewBtn readMoreBtn" data-id="${product.id}">Snabbvy</button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                    </div>
                    <div class="card-body">
                    <h6 class="card-title">${product.price} kr/skopa</h6>
                    <p class="p-stock" data-product-stock-id="${product.id}" style="font-size: small; color: #7E7E7E;">Lagerstatus: ${product.stock_quantity ? 'I lager' : 'Ej i lager'}</p>
                    </div>
                    <div class="mb-5 d-flex justify-content-around">
                        <button id="readMore" class="btn btn-secondary readMoreBtn hide" data-id="${product.id}">läs mer</button>
                        <button class="btn btn-secondary add-to-cart" data-product-id="${product.id}">lägg till</button>
                    </div>
                </div>
                `;
      renderDiv!.append(createDiv);

      if (product.stock_quantity <= 0) {
        updateButtonStatus(product.id.toString(), true);
      }
    }
  });
  showBtn();
  modalDOM();
}

function countInStock(): void {
  products.forEach((product) => {
    if (product.stock_quantity >= 1) {
      inStock++;
    }
  });
}

function renderInStockCount(): void {
  const divRenderStock = document.querySelector("#divRenderStock");
  if (divRenderStock) {
    divRenderStock.innerHTML = "";
  }
  const stockCountElement = document.createElement("p");
  stockCountElement.style.fontSize = "small";
  stockCountElement.textContent = `Antal produkter i lager: ${inStock} / ${products.length}`;

  if (divRenderStock) {
    divRenderStock.appendChild(stockCountElement);
  }
}

function countAndRenderInStockCount() {
  countInStock();
  renderInStockCount();
}

countAndRenderInStockCount();

export function updateInStockCount(increaseInStock: boolean): void {
  if (increaseInStock) {
    inStock++;
  } else {
    inStock--;
  }
  renderInStockCount();
}

export function updateButtonStatus(productId: string, disable: boolean): void {
  const button: HTMLButtonElement | null = document.querySelector(
    `[data-product-id="${productId}"]`
  );
  if (button) {
    button.disabled = disable;
  }
}

export function updateRenderedStockQuantity(product: IProduct): void {
    const pStock: HTMLElement | null = document.querySelector(`[data-product-stock-id="${product.id}"]`);
    const newInnerHTML: string = `Lagerstatus: ${product.stock_quantity ? 'I lager' : 'Ej i lager'}`;
    if (pStock) {
      pStock.innerHTML = newInnerHTML;
    }
}
