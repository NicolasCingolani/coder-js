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
let carrito = [];

//Prompt bienvenida
let seleccion = prompt(
  "Bienvenido a PlayStation Store. ¿Desea comprar algún juego? \nIndique si o no"
);

while (seleccion != "si" && seleccion != "no") {
  alert("Por favor ingrese si o no");
  seleccion = prompt("¿Desea comprar un juego si o no?");
}

//.map para recorrer y mostrar porductos del array
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

//.filter para filtar por precio
let filtroMenorPrecio = productos.filter((el) => el.precio < 6000);
console.log(filtroMenorPrecio);

//Ciclo while + swith para seleccionar el producto a comprar
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

  //Ciclo while para finalizar compra y forEach para recorrer carrito
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

//creo li con el array de productos en cards
const ul = document.getElementById("lista");
for (const producto of productos) {
  let li = document.createElement("li");

  li.innerHTML = `<div class = "card">
  <h3> ${producto.id} - ${producto.nombre}</h3>
  <p>$ ${producto.precio}</p>
  <img src="../img/${producto.img}" alt="">
  </div>`;

  ul.append(li);
}

//.reduce para generar nuevo array con el total de la compra
const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
console.log("El total de su compra es: " + total);
