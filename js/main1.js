//Array de productos
const productos = [];

const inventario = async () => {
  const response = await fetch("./js/productos.json");

  const data = await response.json();
  data.forEach((element) => {
    productos.push(element);
  });
  cardsProductos(data);
};

inventario();

//Array de carrito vacío (uso or)
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
const precioTotal = document.querySelector(".total");
const finalizar = document.getElementById("finalizar");
const cancelar = document.getElementById("cancelar");

// Funcion agregar para cualquier array
function cargar(array, objeto) {
  array.push(objeto);
}

// Solicitar nombre (uso operador ternario)
let nombre;
let apellido;
btnEnviar.addEventListener("click", () => {
  nombre = nomb.value;
  apellido = apell.value;
  if (nombre != "" && apellido != "") {
    h2.innerText =
      "Hola " +
      nombre +
      " " +
      apellido +
      ". A continuación podrás realizar tu compra";
    checkbox.checked ? setDatos("localStorage") : setDatos("sessionStorage");
  } else {
    Swal.fire({
      position: "top-and",
      icon: "error",
      title: "Los campos estan vacios",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

btnBorrar.addEventListener("click", () => {
  nomb.value = "";
  apell.value = "";
  localStorage.removeItem("cliente");
  sessionStorage.removeItem("user");
  h2.innerText = "Bienvenido";
});

//local inicio (uso and)
function setDatos(valor) {
  let cliente = { nombre: nomb.value, apellido: apell.value };
  valor === "sessionStorage" &&
    sessionStorage.setItem("user", JSON.stringify(cliente));
  if (valor === "localStorage") {
    localStorage.setItem("cliente", JSON.stringify(cliente));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Su nombre y apellido seran recordados!!!",
      showConfirmButton: false,
      timer: 1500,
    });
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

// Cards de productos (uso destructuring)
function cardsProductos() {
  for (const producto of productos) {
    let { nombre, precio, img, id } = producto;
    let prod = document.createElement("div");
    prod.innerHTML = `<div class="card">
    <h4>${id} - ${nombre}</h4>
    <p> $ ${precio}</p>
    <img src="../img/${img}" alt="">
    <button id="agregar${id}" class="btnAgregar bg-success">Agregar</button>
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

//mostrar carrito de compras (uso destructuring)
function mostrarCarrito() {
  compras.innerHTML = "";
  for (const producto of carrito) {
    let { nombre, precio, id, cantidad } = producto;
    let prodCarrito = document.createElement("div");
    prodCarrito.innerHTML = `<div class="card">
    <h4>${nombre}</h4>
    <p> $ ${precio * cantidad}</p>
    <h5>CANTIDAD: ${cantidad}</h5>
    <button class="btnCarrito btnBorrar bg-danger" id="btn-borrar${id}">Borrar</button>
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
    Swal.fire({
      icon: "success",
      title: "Compra exitosa!!!",
      text: "Su compra finalizo correctamente, esperamos volver a verlo pronto muchas gracias por su visita 😀",
    });

    localStorage.removeItem("carrito");
    for (let index = 0; index < carrito.length; index++) {
      carrito.splice(index, carrito.length);
    }
    console.log("fin");
    console.log(carrito);
    mostrarCarrito();
  });
}

//cancelar
function cancel() {
  cancelar.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro que quieres cancelar tu compra?",
        text: "No podrás recuperar tu carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "BORRADO!",
            "Su carrito fue vaciado.",
            "success"
          );
          localStorage.removeItem("carrito");
          for (let index = 0; index < carrito.length; index++) {
            carrito.splice(index, carrito.length);
          }
          console.log(carrito);
          mostrarCarrito();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "CANCELADO",
            "Puede continuar su compra 🛒",
            "error"
          );
        }
      });
  });
}

mostrarCarrito();
cardsProductos();
fin();
cancel();
