import { getProducts } from "./api-exchange";
import { openModal } from "./infoModal";

const products = await getProducts();
const modalDiv =  document.querySelector<HTMLDivElement>("#renderingCards");
let insertModal= document.createElement('div');

export function modalDOM(){ 
    let i =0;
    let temp = document.querySelectorAll('.readMoreBtn');
    products.forEach(()=>{
        temp[i].addEventListener('click', (e)=>{
            const target: HTMLElement = e.target as HTMLElement; 
            const id: number = parseInt(target.getAttribute('data-id') as string);
            let selectedProduct = products.find(product => product.id === id);
                
            if(selectedProduct){
                insertModal.innerHTML = `        
                    <div class="modal" id="infoModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">${selectedProduct?.name}</h5>
                                    <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    ></button>
                                </div>
                                <div class="modal-body" data-quantity-id="${selectedProduct.id}">
                                    <p>${selectedProduct?.description} Nuvarande lager: ${selectedProduct.stock_quantity} st</p>
                                </div>
                            </div>
                        </div>
                    </div>`;  
            }
            openModal();
        });
         modalDiv?.append(insertModal);
         i++;
    });        
}