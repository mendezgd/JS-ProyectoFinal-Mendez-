//declaraciones//
/* const producto = [
    { id: 1, nombre: "Ak47", stock: 10, precio: 2500, img: "prod1.jpg", descripcion: "El AK-47 es un fusil de asalto soviético diseñado por Mijaíl Kaláshnikov en 1947" },
    { id: 2, nombre: "M4A1", stock: 5, precio: 3100, img: "asalto1.jpg", descripcion: "La M4A1 es una carabina de asalto estadounidense que utiliza munición 5,56." },
    { id: 3, nombre: "Desert Eagle", stock: 22, precio: 700, img: "prod3.jpg", descripcion: "La Desert Eagle es una pistola semiautomática capacidad para disparar cartucho .50 Action Express." },
    { id: 4, nombre: "Sniper AWP", stock: 10, precio: 5700, img: "awp2.jpg", descripcion: "El AWP es un rifle de francotirador de cerrojo que utiliza munición calibre .338" },
    { id: 5, nombre: "Chaleco anti-balas", stock: 50, precio: 1000, img: "chaleco1.jpg", descripcion: "El Kevlar es un material sintético resistente y ligero que se utiliza en la fabricación de chalecos antibalas" },
    { id: 6, nombre: "Escopeta", stock: 40, precio: 1200, img: "escopetas1.jpg", descripcion: "Las escopetas están diseñadas para descargar varios proyectiles, como perdigones o postas, en cada disparo." },
    { id: 7, nombre: "Optica", stock: 300, precio: 150, img: "opticas1.jpg", descripcion: "Los visores son dispositivos ópticos que se acoplan al arma para mejorar la precisión del disparo." },
    { id: 8, nombre: "Granada", stock: 22, precio: 400, img: "granadas1.jpg", descripcion: "Estas armas están diseñadas para ser arrojadas desde distancias cortas y causar daño en un radio considerable." },
];
 */
let productos= [];
fetch("./javascript/productos.json")
    .then (response => response.json())
    .then (items => {
        productos = items;
        console.log(productos);
        crearCard(productos);
    });
    
let arrProdFiltrado = [];
let arrCarrito = [];
const iva = 1.21
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
    Swal.fire({
        text: 'item agregado al carro!',
        width: 350,
        padding: '1em',
        color: '#14AE30',
        imageUrl:"/media/mono2.gif",
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

iniciarItems();