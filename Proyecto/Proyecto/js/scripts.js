// asigna a la variable Clickbutton todos los elementos que tengan la clase .button
const Clickbutton = document.querySelectorAll(".button");

// asigna a la variable tbody todos los elementos que tengan la clase .tbody
const tbody = document.getElementsByTagName("tbody");

// se asigna un arreglo vasio a la variable carrito
let carrito = [];

// se crea un evento Listener por cada elemento encontrado en la variable Clickbutton 
Clickbutton.forEach((btn) => {
btn.addEventListener("click", addToCarritoItem);
//  console.log(btn); // mostramos cuantos elementos existen con la clase .button 
});

// esta funcion captura el evento de cada button y asi poder seleccionar los elementos superiores contenidos en ese div
function addToCarritoItem(e) {
  const button = e.target;
  const item = button.closest(".card");
  const tipoPedido = item.querySelector(".tipo-pedido").textContent;
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  // se crea una lista de elementos para cada button
  const newItem = {
    tipopedido: tipoPedido,
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };
addItemCarrito(newItem);
addLocalStorage();
}

function addItemCarrito(newItem) {
  const alert = document.querySelector(".alert");
  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");
  carrito.push(newItem);
}

function renderCarrito() {
  tbody.innerHTML="";
    for (let i = 0; i < carrito.length; i++) {
      $("#tbody").append('<tr>'+
                          '<td class="col-0 px-3">'+i+'</td>'+
                          '<td class="col-2 px-3"><img src="'+carrito[i].img+'" class="card-img-top w-50"> <p>' +carrito[i].title + '</p></td>'
                          +'<td class="col-2 px-3"><p>'+carrito[i].tipopedido+'</p></td>'
                          +'<td class="col-2 px-3"><p>'+carrito[i].precio+'</p></td>'
                          +'<td class="col-2 px-3"><input type="number" min="1" value="'+carrito[i].cantidad+'" class="input__elemento"></td>'
                          +'<td class="col-3 px-3"><button class="deleteCarrito btn btn-danger" onClick="deleteCarrito('+ i +')">Delete</button></td>'
                          +'<td class="col-3 px-3"><p>'+ (carrito[i].cantidad * carrito[i].precio) +'</p></td>'
                          +'</tr>');
    }  
}


function deleteCarrito(i) {
  if(confirm('Estas seguro de eliminar este pedido del carrito?')){
    console.log('Deleting carrito',carrito[i]);
    carrito.splice(i,1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.reload();
  }
}

function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
  carrito = storage;
   renderCarrito();
  }
};


