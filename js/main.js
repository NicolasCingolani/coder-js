function solicitarNombre() {
  alert("Bienvenido a PlayStation Store");
  let nombre = prompt("Ingrese su nombre ");
  while (nombre === "") {
    nombre = prompt("Ingrese su nombre ");
  }
}

function mostrarProductos() {
  let producto;
  do {
    producto = parseInt(
      prompt(
        "Que juego deseas comprar? : \n1) FIFA 23\n2) GRAN TURISMO 7\n3) ELDEN RING\n4) GTA V\n5) LEGO STAR WARS: THE SKYWALKER SAGA "
      )
    );
  } while (
    producto != 1 &&
    producto != 2 &&
    producto != 3 &&
    producto != 4 &&
    producto != 5
  );
  switch (producto) {
    case 1:
      return "FIFA 23";
    case 2:
      return "GRAN TURISMO 7";
    case 3:
      return "ELDEN RING";
    case 4:
      return "GTA V";
    case 5:
      return "LEGO STAR WARS: THE SKYWALKER SAGA";
  }
}

function validarPrecio(producto) {
  if (producto === "FIFA 23") {
    return 11000;
  } else if (producto === "GRAN TURISMO 7") {
    return 10500;
  } else if (producto === "ELDEN RING") {
    return 10250;
  } else if (producto === "GTA V") {
    return 3000;
  } else if (producto === "LEGO STAR WARS: THE SKYWALKER SAGA") {
    return 10000;
  }
}

function cobrar(nombre, precio) {
  alert(
    "Usted lleva el siguiente producto: " + nombre + "\nPrecio: $" + precio
  );
  let pago = parseInt(prompt("Con cuanto pagas?"));
  if (pago > precio) {
    alert("Gracias ! Su vuelto es " + (pago - precio) + "😁");
  } else if (pago < precio) {
    alert("No te alcanza ! 🤷‍♂️");
  } else if (pago === precio) {
    alert("Muchas gracias por su compra! 😊");
  }
}

solicitarNombre();
let productoNombre = mostrarProductos();
let precioProducto = validarPrecio(productoNombre);
cobrar(productoNombre, precioProducto);
