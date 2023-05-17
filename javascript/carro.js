// declaraciones //
let local = localStorage.getItem("carrito");
let carrito = JSON.parse(local);
let arrCarrito = [];
// checkeo si la variable en el storage esta vacia, porque sino da error //
if (carrito) {
    arrCarrito = carrito.items

}
//funcion crea cartas en carro //
function itemHtml(el) {
    cardItem = `
            <div class="card m-1">
                <div class="row g-0">
                    <div class="col-md-1">
                        <img src="../media/${el.img}" class="img-fluid rounded-start" alt="${el.nombre}" >
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">${el.nombre}</h5>
                            <p class="card-text">${el.descripcion}</p>
                            
                        </div>
                    </div>
                    <div class="col-md-2">
                        <p class="card-text text-center m-0 p-0 mb-2">Cantidad: ${el.cant}<br>$${el.precio}</p>
                        <div class= "text-center">
                        <button value="${el.id}" class="btn btn-danger btn-sm borrar">Borrar</button>
                        </div>
                    </div>
                </div>
            </div>`;
    return cardItem;
}

// evento del boton borrar //
eventoBoton = function (e) {
    arrCarrito = removerId(arrCarrito, e.target.value);
    let carrito = { items: arrCarrito };
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
        title: 'item eliminado!',
        background: '#FBFEF9',
        icon: 'error',
        width: 350,
    })
    refrescarItems();
};

// elimino de la lista por ID //
const removerId = (arr, filtro) => {
    const quitar = arr.filter((el) => {
        return el.id != filtro
    })
    return quitar
}

// refresca lista de items en carrito y recalcula el total //
function refrescarItems() {
    let carroItems = document.getElementById('carro_items');
    let total = 0;
    let campoTotal = document.getElementById('total');
    arrCarrito.forEach(x => {
        total += x.precio * x.cant
    });
    campoTotal.innerHTML = total
    carroItems.innerHTML = "";
    for (const i of arrCarrito) {

        carroItems.innerHTML += itemHtml(i);

    }
    agregarListener();
}

// agrega listeners a todos los botones borrar //
function agregarListener() {
    let botonesBorrar = document.getElementsByClassName('borrar');
    for (const boton of botonesBorrar) {
        boton.addEventListener('click', eventoBoton);
    }
}

// finaliza la compra // 
function sweetfinalizar() {
    Swal.fire({
        title: 'Desea finalizar su compra?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Compra finalizada, sus productos llegarán en 3 días!', '', 'success')
            finalizarCarro();
            refrescarItems();
        } else if (result.isDenied) {
            Swal.fire('puede seguir modificando', '', 'info')
        }
    })
}

// finaliza la compra evento y funcion //
const finalizarBoton = document.querySelector('#finalizar')
finalizarBoton.addEventListener('click', sweetfinalizar);

function finalizarCarro() {
    arrCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(arrCarrito));
}


refrescarItems();