const productos = [
  { nombre: "FIFA 23", precio: 7499 },
  { nombre: "GRAN TURISMO 7", precio: 6799 },
  { nombre: "GTA V", precio: 1399 },
  { nombre: "ELDEN RING", precio: 6799 },
  { nombre: "NBA 2K23", precio: 6799 },
  { nombre: "GOD OF WAR RAGNAROK", precio: 6799 },
  { nombre: "F1 22", precio: 5999 },
  { nombre: "RED DEAD REDEMPTION 2", precio: 6099 },
  { nombre: "THE LAST OF US PART I REMAKE", precio: 8399 },
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
    (producto) => producto.nombre + ": " + "$" + producto.precio
  );
  alert(todosLosProductos.join("\n"));
} else if (seleccion == "no") {
  alert("Gracias por visitarnos, esperamos vuelva pronto!");
}

while (seleccion != "no") {
  let producto = prompt("Agregue un juego al carrito 🛒");
  let precio = 0;

  if (
    producto == "FIFA 23" ||
    producto == "GRAN TURISMO 7" ||
    producto == "GTA V" ||
    producto == "ELDEN RING" ||
    producto == "NBA 2K23" ||
    producto == "GOD OF WAR RAGNAROK" ||
    producto == "F1 22" ||
    producto == "RED DEAD REDEMPTION 2" ||
    producto == "THE LAST OF US PART I REMAKE"
  ) {
    switch (producto) {
      case "FIFA 23":
        precio = 7499;
        break;
      case "GRAN TURISMO 7":
        precio = 6799;
        break;
      case "GTA V":
        precio = 1399;
        break;
      case "ELDEN RING":
        precio = 6799;
        break;
      case "NBA 2K23":
        precio = 6799;
        break;
      case "GOD OF WAR RAGNAROK":
        precio = 6799;
        break;
      case "F1 22":
        precio = 5999;
        break;
      case "RED DEAD REDEMPTION 2":
        precio = 6099;
        break;
      case "THE LAST OF US PART I REMAKE":
        precio = 8399;
        break;
      default:
        break;
    }
    let unidades = parseInt(prompt("¿Cuantas unidades desea llevar?"));

    carrito.push({ producto, unidades, precio });
    console.log(carrito);
  } else {
    alert("Disculpa, no contamos con ese producto 😢");
  }

  seleccion = prompt("¿Desea seguir comprando? Indique si o no");

  while (seleccion === "no") {
    alert("Gracias por su compra! Hasta luego 😊");
    carrito.forEach((carritoFinal) => {
      console.log(
        carritoFinal.producto +
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
