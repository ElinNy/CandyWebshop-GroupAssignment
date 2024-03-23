import{M as c,p as l}from"./shoppingcart-tECp4d_l.js";function d(t){const e=document.getElementById("successModal");if(e){const o=new c(e),r=e.querySelector(".modal-body");r&&(r.innerHTML=`
        <p>Tack för din beställning! Ditt ordernr är ${t.data.id}.</p>
        <h6>Orderinformation:</h6>
        <ul>
          <li>Namn: ${t.data.customer_first_name} ${t.data.customer_last_name}</li>
          <li>Adress: ${t.data.customer_address}, ${t.data.customer_postcode} ${t.data.customer_city}</li>
          <li>Email: ${t.data.customer_email}</li>
          <li>Telefon: ${t.data.customer_phone}</li>
        </ul>
      `),o.show()}}function i(){const t=document.getElementById("successModal");t&&new c(t).hide()}let a=[],n=0;s();const u=async t=>{try{const e=await fetch("https://www.bortakvall.se/api/v2/users/27/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await e.json();if(!e.ok)throw new Error("could not send post");d(o)}catch{alert("Beställningen kunde inte skickas, plz try again")}},m=document.getElementById("closeBtn");m?.addEventListener("click",()=>{i()});function y(){document.getElementById("CheckoutForm")?.addEventListener("submit",async e=>{e.preventDefault(),s();const o={customer_first_name:document.querySelector("#nameId")?.value||"",customer_last_name:document.querySelector("#lastNameId")?.value||"",customer_address:document.querySelector("#adressId")?.value||"",customer_postcode:document.querySelector("#postNrId")?.value||"",customer_city:document.querySelector("#ortId")?.value||"",customer_phone:document.querySelector("#telNrId")?.value||"",customer_email:document.querySelector("#emailId")?.value||"",order_items:a,order_total:n};await u(o)})}function s(){const t=[];l.forEach(e=>t.push(e));for(let e=0;e<t.length;e++){let o={product_id:t[e].id,qty:t[e].quantity,item_price:t[e].price,item_total:0};o.item_total=o.qty*o.item_price,n=n+=o.item_total,a.push(o)}return a}function f(){let t=document.querySelectorAll("li"),e=document.querySelectorAll("button");l.forEach(o=>{for(let r=0;r<t.length;r++)o.name===t[r].id&&(t[r].setAttribute("images",o.images.toString()),t[r].insertAdjacentHTML("afterbegin",`<img src="https://www.bortakvall.se${o.images.thumbnail}"
                    style = 
                    "width: 4rem; 
                    border-radius: 100%; 
                    margin-right: 1rem; 
                    margin-bottom: 1rem;">`)),e[r].classList.add("deleteBtn"),e[r].addEventListener("click",()=>{window.location.reload()})})}f();y();
