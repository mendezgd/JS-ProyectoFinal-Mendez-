//declaraciones//

// Ahora traemos los productos desde el json //
let productos = [];
fetch("./javascript/productos.json")
    .then(response => response.json())
    .then(items => {
        productos = items;
        iniciarItems();
    });

let arrProdFiltrado = [];
let arrCarrito = [];
let total = 0
let local = localStorage.getItem("carrito");
let carrito = JSON.parse(local);
if (carrito) {
    if (carrito.items) {
        arrCarrito = carrito.items
    };
}

// filtrado de nombre //
const buscarNombre = (arr, filtro) => {
    const buscar = arr.filter((el) => {
        let minus = el.nombre.toLowerCase();
        return minus.includes(filtro.toLowerCase());
    })
    return buscar
}

// get y query html //
const productosDin = document.getElementById('productosDin');
const inputBuscar = document.querySelector('input[type="search"]');
const botonesAgregar = document.getElementsByClassName('agregar');
const listaCarrito = document.getElementById('listaCarrito');
const finalizarCompra = document.getElementsByClassName('finalizar');

// funcion crea cards //
function crearCard(el) {
    let htmlCard = `
                <div class="col">
                <div class="card" style="width: 18rem;">
                    <img src="./media/${el.img}" alt="${el.nombre}" class="card-img-top" width="288px" height="250px">
                    <div class="card-body">
                        <h5 class="card-title">${el.nombre}</h5>
                        <p class="card-text">${el.descripcion}</p>
                        <button value="${el.id}" class="btn btn-primary btn-sm agregar" data-bs-toggle="button">Agregar al carro</button>
                        <p>Precio:(en dolares) $${el.precio}</p>
                    </div>
                </div>
            </div>`;
    return htmlCard;
}

// buscador //
showInput = addEventListener('input', () => {
    let items = buscarNombre(productos, inputBuscar.value);
    productosDin.innerHTML = "";
    for (const item of items) {

        productosDin.innerHTML += crearCard(item);
    }
    agregarListener();
})

// muestra items en listado //
function iniciarItems() {
    productosDin.innerHTML = "";
    for (const item of productos) {

        productosDin.innerHTML += crearCard(item);
    }
    agregarListener();
}

// evento del boton agregar // 

eventoBoton = function (e) {
    let found = buscarId(productos, e.target.value);
    arrCarrito.push(found);
    let carrito = { items: arrCarrito, };
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
    Swal.fire({
        text: 'item agregado al carro!',
        width: 350,
        padding: '1em',
        color: '#14AE30',
        imageUrl: "./media/mono2.gif",
        imageAlt: 'mono con un arma',
        background: '#fac85b',

    })
};

// agrego listener a todos los botones //

function agregarListener() {
    let botonesAgregar = document.getElementsByClassName('agregar');
    for (const boton of botonesAgregar) {
        boton.addEventListener('click', eventoBoton);

    }
}

// buscar item por id //
const buscarId = (arr, filtro) => {
    const buscar = arr.find((el) => {
        return el.id == filtro
    })
    return buscar
}

/* iniciarItems(); */