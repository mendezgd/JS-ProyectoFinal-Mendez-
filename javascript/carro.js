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
                    <div class="col-md-10">
                        <div class="card-body">
                            <h5 class="card-title">${el.nombre}</h5>
                            <p class="card-text">${el.descripcion}</p>
                            
                        </div>
                    </div>
                    <div class="col-md-1">
                        <p class="card-text text-center pt-4">$${el.precio}</p>
                        <button value="${el.id}" class="btn btn-danger btn-sm borrar">Borrar</button>
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
        icon: 'error',
        width: 350,
    })
    refrescarItems();
};

// evento del boton finalizar compra //
eventoFinalizar = function () {
    let botonFinalizar = document.getElementsByClassName('finalizar');
    botonFinalizar.addEventListener('click');
    Swal.fire({
        title: 'Compra Finalizada',
        text: 'recibirá sus productos en 3 días',
        icon: 'success',
        width: 350,
        background: '#FCFDAF',
    })
    refrescarItems();
};

// elimino de la lista por ID //
const removerId = (arr, filtro) => {
    const buscar = arr.filter((el) => {
        return el.id != filtro
    })
    return buscar
}

// refresca lista de items en carrito y recalcula el total //
function refrescarItems() {
    let carroItems = document.getElementById('carro_items');
    let total = 0;
    let campoTotal = document.getElementById('total');
    arrCarrito.forEach(x => {
        total += x.precio
    });
    campoTotal.innerHTML = total
    carroItems.innerHTML = "";
    for (const i of arrCarrito) {

        carroItems.innerHTML += itemHtml(i);

    }
    agregarListener();
}

// agrega listeners a todos los botones //
function agregarListener() {
    let botonesBorrar = document.getElementsByClassName('borrar');
    for (const boton of botonesBorrar) {
        boton.addEventListener('click', eventoBoton);
    }
}



refrescarItems();
