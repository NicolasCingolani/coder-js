//Array de productos
const productos = [
  { id: 1, nombre: "FIFA 23", precio: 7499, img: "fifa-23.jpg" },
  { id: 2, nombre: "GRAN TURISMO 7", precio: 6799, img: "gran-turismo-7.jpg" },
  { id: 3, nombre: "GTA V", precio: 1399, img: "gta-v.jpg" },
  { id: 4, nombre: "ELDEN RING", precio: 6799, img: "elden-ring.jpg" },
  { id: 5, nombre: "NBA 2K23", precio: 6799, img: "nba-2k23.jpg" },
  {
    id: 6,
    nombre: "GOD OF WAR RAGNAROK",
    precio: 6799,
    img: "god-of-war-ragnarok.jpg",
  },
  { id: 7, nombre: "F1 22", precio: 5999, img: "f1-22.jpg" },
  {
    id: 8,
    nombre: "RED DEAD REDEMPTION 2",
    precio: 6099,
    img: "red-dead-redemption.jpg",
  },
  {
    id: 9,
    nombre: "THE LAST OF US PART I REMAKE",
    precio: 8399,
    img: "the-last-of-us.jpg",
  },
];

//Array de carrito vacío
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Constantes
const h2 = document.getElementById("h2");
const stockProductos = document.getElementById("productos");
const compras = document.getElementById("compras");
const nomb = document.getElementById("nombre");
const apell = document.getElementById("apellido");
const btnEnviar = document.getElementById("btnEnviar");
const btnBorrar = document.getElementById("btnBorrar");
const checkbox = document.getElementById("checkbox");
const precioTotal = document.getElementById("total");
const finalizar = document.getElementById("finalizar");

// Funcion agregar para cualquier array
function cargar(array, objeto) {
  array.push(objeto);
}

// Solicitar nombre
let nombre;
let apellido;
btnEnviar.addEventListener("click", () => {
  nombre = nomb.value;
  apellido = apell.value;
  h2.innerText =
    "Hola " +
    nombre +
    " " +
    apellido +
    ". A continuación podrá realizar su compra";
  if (checkbox.checked) {
    setDatos("localStorage");
  } else {
    setDatos("sessionStorage");
  }
});

btnBorrar.addEventListener("click", () => {
  nomb.value = "";
  apell.value = "";
  localStorage.removeItem("cliente");
});

//local inicio
function setDatos(valor) {
  let cliente = { nombre: nomb.value, apellido: apell.value };
  if (valor === "sessionStorage") {
    sessionStorage.setItem("user", JSON.stringify(cliente));
  }
  if (valor === "localStorage") {
    localStorage.setItem("cliente", JSON.stringify(cliente));
  }
  return cliente;
}

function getDatos(datos) {
  if (datos) {
    nomb.value = datos.nombre;
    apell.value = datos.apellido;
  }
}

getDatos(JSON.parse(localStorage.getItem("cliente")));

// Cards de productos
function cardsProductos() {
  for (const producto of productos) {
    let prod = document.createElement("div");
    prod.innerHTML = `<div class="card">
    <h3>${producto.id} - ${producto.nombre}</h3>
    <p> $ ${producto.precio}</p>
    <img src="../img/${producto.img}" alt="">
    <button id="agregar${producto.id}">Agregar</button>
    </div>`;
    stockProductos.append(prod);
  }
  funcionBoton();
}

// Boton para agregar al carrito
function funcionBoton() {
  for (const producto of productos) {
    document
      .getElementById(`agregar${producto.id}`)
      .addEventListener("click", () => {
        agregarCarrito(producto);
      });
  }
}

function agregarCarrito(producto) {
  let existe = carrito.some((prod) => prod.id === producto.id);
  if (existe === false) {
    producto.cantidad = 1;
    cargar(carrito, producto);
  } else {
    let prodFind = carrito.find((prod) => prod.id === producto.id);
    prodFind.cantidad++;
  }
  mostrarCarrito();
}

function mostrarCarrito() {
  compras.innerHTML = "";
  for (const producto of carrito) {
    let prodCarrito = document.createElement("div");
    prodCarrito.innerHTML = `<div class="card">
    <h3>${producto.nombre}</h3>
    <p> $ ${producto.precio * producto.cantidad}</p>
    <h3>CANTIDAD: ${producto.cantidad}</h3>
    <button class="btnCarrito" id="btn-borrar${producto.id}">Borrar</button>
    </div>`;
    compras.append(prodCarrito);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  borrar();
  let precioTot;
  precioTot = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  precioTotal.innerText = "El valor de su compra es de $" + precioTot;
}

// Boton para borrar
function borrar() {
  carrito.forEach((producto) => {
    document
      .getElementById(`btn-borrar${producto.id}`)
      .addEventListener("click", () => {
        let indice = carrito.findIndex((element) => element.id === producto.id);
        carrito.splice(indice, 1);
        mostrarCarrito();
      });
  });
}

//finalizar
function fin() {
  finalizar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    for (let index = 0; index < carrito.length; index++) {
      carrito.splice(index, carrito.length);
    }
    console.log("fin");
    console.log(carrito);
    mostrarCarrito();
  });
}

mostrarCarrito();
cardsProductos();
fin();
