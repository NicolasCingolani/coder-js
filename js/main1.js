const productos = [
  { id: 1, nombre: "FIFA 23", precio: 7499 },
  { id: 2, nombre: "GRAN TURISMO 7", precio: 6799 },
  { id: 3, nombre: "GTA V", precio: 1399 },
  { id: 4, nombre: "ELDEN RING", precio: 6799 },
  { id: 5, nombre: "NBA 2K23", precio: 6799 },
  { id: 6, nombre: "GOD OF WAR RAGNAROK", precio: 6799 },
  { id: 7, nombre: "F1 22", precio: 5999 },
  { id: 8, nombre: "RED DEAD REDEMPTION 2", precio: 6099 },
  { id: 9, nombre: "THE LAST OF US PART I REMAKE", precio: 8399 },
];

let carrito = [];

let seleccion = prompt(
  "Bienvenido a PlayStation Store. ¿Desea comprar algún juego? \nIndique si o no"
);

while (seleccion != "si" && seleccion != "no") {
  alert("Por favor ingrese si o no");
  seleccion = prompt("¿Desea comprar un juego si o no?");
}

if (seleccion == "si") {
  alert("A continuación nuestra lista de juegos📜");
  let todosLosProductos = productos.map(
    (producto) =>
      producto.id + ") " + producto.nombre + ": " + "$" + producto.precio
  );
  alert(todosLosProductos.join("\n"));
} else if (seleccion == "no") {
  alert("Gracias por visitarnos, esperamos vuelva pronto!");
}

let filtroMenorPrecio = productos.filter((el) => el.precio < 6000);
console.log(filtroMenorPrecio);

while (seleccion != "no") {
  let producto = prompt("Agregue un juego al carrito indicando su número 🛒");
  let precio = 0;
  let nombre;

  if (
    producto == "1" ||
    producto == "2" ||
    producto == "3" ||
    producto == "4" ||
    producto == "5" ||
    producto == "6" ||
    producto == "7" ||
    producto == "8" ||
    producto == "9"
  ) {
    switch (producto) {
      case "1":
        nombre = "FIFA 23";
        precio = 7499;
        break;
      case "2":
        nombre = "GRAN TURISMO 7";
        precio = 6799;
        break;
      case "3":
        nombre = "GTA V";
        precio = 1399;
        break;
      case "4":
        nombre = "ELDEN RING";
        precio = 6799;
        break;
      case "5":
        nombre = "NBA 2K23";
        precio = 6799;
        break;
      case "6":
        nombre = "GOD OF WAR RAGNAROK";
        precio = 6799;
        break;
      case "7":
        nombre = "F1 22";
        precio = 5999;
        break;
      case "8":
        nombre = "RED DEAD REDEMPTION 2";
        precio = 6099;
        break;
      case "9":
        nombre = "THE LAST OF US PART 1 REMAKE";
        precio = 8399;
        break;
      default:
        break;
    }
    let unidades = parseInt(prompt("¿Cuantas unidades desea llevar?"));

    carrito.push({ producto, nombre, unidades, precio });
    console.log(carrito);
  } else {
    alert("Disculpa, no contamos con ese producto 😢");
  }

  seleccion = prompt("¿Desea seguir comprando? Indique si o no");

  while (seleccion === "no") {
    alert("Gracias por su compra! Hasta luego 😊");
    carrito.forEach((carritoFinal) => {
      console.log(
        carritoFinal.nombre +
          " x " +
          carritoFinal.unidades +
          " = " +
          carritoFinal.precio * carritoFinal.unidades
      );
    });
    break;
  }
}

const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
console.log("El total de su compra es: " + total);
