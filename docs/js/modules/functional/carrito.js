
const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $listaProductos = d.querySelector("#productos")
const $loader = d.querySelector("#loader");
const $mensajeLoader = d.querySelector("#mensajeLoader")


//console.log(productos);
let carrito = [];

let productos = [];
export function obtenerProductos(){
  productos = getProductos();
}
//console.log(productos);
export function mostrarProductosDisponibles(){
  if(productos==null || productos < 0 || productos.length === 0)
  {console.error("Lista de productos está vacía"); return;}

  for(let producto of productos){
    
    let $producto = d.createElement("article");
    let $productoNombre = d.createElement("h3");
    let $productoImagen = d.createElement("img");
    let $productoDescripcion = d.createElement("p");
    let $productoPrecio = d.createElement("p");
    let $productoStock = d.createElement("p");
    let $buttonAnadir = d.createElement("button");
    let $buttonQuitar = d.createElement("button");
    let $buttonLeerMas = d.createElement("button");
    let $buttonContainer = d.createElement("div");

    $productoNombre.textContent = producto.nombre;
    $productoDescripcion.textContent = producto.descripcion;
    $productoPrecio.textContent = `Precio: $${producto.precio}`;
    $productoStock.textContent = `En stock: ${producto.stock}`;
    $buttonAnadir.textContent = "+";
    $buttonQuitar.textContent = "-";
    $buttonLeerMas.textContent = "Leer más";
    
    $productoImagen.src = producto.imagen; 
    $productoImagen.alt = `Imagen de ${producto.nombre}`;

    $buttonAnadir.id= "btn-anadirACarrito";
    $buttonQuitar.id= "btn-quitarDeCarrito";

    $producto.classList.add(`${producto.class}`);
    $producto.classList.add("container");
    $producto.classList.add("mb-4", "mr-3");
    $producto.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-2" );

    $productoImagen.classList.add("img-fluid");
    
    $productoStock.classList.add("stock");

    $buttonAnadir.classList.add("container", "btnProducto", "btnGreen");
    $buttonQuitar.classList.add("container", "btnProducto", "btnRed");
    $buttonLeerMas.classList.add("btn", "btn-link", "p-0");
    //PARA QUE LOS BOTONES NO TENGAN ESE ESPACIO EN BLANCO RARO
    $buttonContainer.classList.add("card-buttons");
    $buttonContainer.appendChild($buttonAnadir);
    $buttonContainer.appendChild($buttonQuitar);
    //PARA QUE LA DESCRIPCION POS, SE MUESTRE ENTERA, JAJAJA
    $buttonLeerMas.addEventListener("click", () => {
      if ($productoDescripcion.classList.contains("expandido")) {
        $productoDescripcion.classList.remove("expandido");
        $buttonLeerMas.textContent = "Leer más";
      } else {
        $productoDescripcion.classList.add("expandido");
        $buttonLeerMas.textContent = "Leer menos";
      }
    });
    //$buttonAnadir.classList.add("col-sm-1");
    //$buttonQuitar.classList.add("col-sm-1");
    //$buttonAnadir.classList.add("col-lg-2");
    //$buttonQuitar.classList.add("col-lg-2");

    $producto.setAttribute(`data-id`, producto.id);
    $producto.setAttribute(`data-nombre`, producto.nombre);
    $producto.setAttribute(`data-precio`, producto.precio);
    $producto.setAttribute(`data-tipoProducto`, producto.tipoProducto);
    $producto.setAttribute(`data-descripcion`, producto.descripcion);

    let $card = d.createElement("div");
    $card.classList.add("card", "h-100");

    let $cardBody = d.createElement("div");
    $cardBody.classList.add("card-body");
    $productoImagen.classList.add("card-img-top", "img-fluid");
    $productoNombre.classList.add("card-title");
    $productoDescripcion.classList.add("card-text");
    
    $card.appendChild($productoImagen);
    $cardBody.appendChild($productoNombre);
    $cardBody.appendChild($productoDescripcion);
    $cardBody.appendChild($buttonLeerMas); 
    $cardBody.appendChild($productoPrecio);
    $cardBody.appendChild($productoStock);
    $cardBody.appendChild($buttonContainer);
    // $cardBody.appendChild($buttonAnadir);
    // $cardBody.appendChild($buttonQuitar);

    $card.appendChild($cardBody);
    $producto.appendChild($card);

    $listaProductos.appendChild($producto);
    
  } 
}
function agregarAlCarrito(productoNombre, cantidad) {
  for (let producto of productos) {
    if (producto.nombre === productoNombre) {
      if (producto.stock >= cantidad) {
        for(let articulo of carrito){
          if(articulo.nombre === producto.nombre){
            articulo.cantidad += cantidad;
            producto.stock -= cantidad;
            actualizarMuestraStockProductos(articulo.nombre);
            let $producto = d.querySelector(`[data-item-nombre="${articulo.nombre}"]`);
            $producto.textContent = `Hay ${articulo.cantidad} ${producto.nombre}(s) en el carrito`;
            //let $productoStock = $producto.querySelector(".stock");
            //console.log(articulo);
            let totalCarrito = calcularTotal();
            totalCarrito = aplicarDescuento(totalCarrito);
            $totalCarrito.textContent = `${totalCarrito}`;
            console.info(`${cantidad} ${productoNombre}(s) más agregado(s) al carrito`);
            return;
          }
        }
        
        carrito.push({
          nombre: productoNombre,
          cantidad: cantidad,
          precio: producto.precio,
        });
        producto.stock -= cantidad;
        let $producto = d.createElement("li");
        $producto.textContent = `Hay ${cantidad} ${producto.nombre}(s) en el carrito`;
        $producto.setAttribute(`data-item-nombre`, producto.nombre);
        $listaCarrito.appendChild($producto);
        actualizarMuestraStockProductos(producto.nombre);
        console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
        
        let totalCarrito = calcularTotal();
        totalCarrito = aplicarDescuento(totalCarrito);
        $totalCarrito.textContent = `${totalCarrito}`;
      } else {
        console.error(`No hay suficiente stock de ${productoNombre}`);
      }
      return;
    }
  }
  console.error(`El producto "${productoNombre}" no existe.`);
}
// Instrucción 3
function calcularTotal(){
  let total = 0;
  for (let item of carrito){
      total += item.precio * item.cantidad
  }
  return total;
}
//Instruccion 4
function aplicarDescuento(total){
  if(total > 100){
      return total * 0.9;
  }
  return total;
}

//Reto 1
function quitarDelCarrito(productoNombre, cantidad){
  let i=-1;
  for (let producto of carrito) {
    i++;
    if (producto.nombre === productoNombre) {
      if (producto.cantidad > cantidad) {
        producto.cantidad -= cantidad;
        let totalCarrito = calcularTotal();
        totalCarrito = aplicarDescuento(totalCarrito);
        $totalCarrito.textContent = `${totalCarrito}`;
        actualizarStockProductos(producto.nombre, cantidad);
        let $producto = d.querySelector(`[data-item-nombre="${producto.nombre}"]`);
        $producto.textContent = `Hay ${producto.cantidad} ${producto.nombre}(s) en el carrito`;
        //console.info(`${cantidad} ${productoNombre}(s) removido(s) del carrito`);
      } else if(producto.cantidad === cantidad)
      {
        carrito.splice(i,1);
        let totalCarrito = calcularTotal();
        totalCarrito = aplicarDescuento(totalCarrito);
        $totalCarrito.textContent = `${totalCarrito}`;
        actualizarStockProductos(producto.nombre, cantidad);
        let $producto = d.querySelector(`[data-item-nombre="${producto.nombre}"]`);
        $producto.remove();
        //console.info(` ${productoNombre} ha sido removido del carrito`);
      } else
      {
        console.error(`No hay suficiente de ${productoNombre} en el carrito`);
      }
      return;
    }else{ console.error(`El producto "${productoNombre}" no se encuentra en tu carrito.`);}
   
  }
  
}
function actualizarStockProductos(productoNombre, cantidad){
  for (let producto of productos) {
    if (producto.nombre === productoNombre) {
        producto.stock += cantidad; 
        actualizarMuestraStockProductos(producto.nombre);
        //console.info(`Se devolvieron: ${cantidad} ${productoNombre}(s) al stock de la tienda`);
        return;
    }
    //console.error(`El producto "${productoNombre}" no se encuentra en el stock de la tienda.`);
  }
}
function actualizarMuestraStockProductos(productoNombre){
  for(let producto of productos){
    if(productos==null || productos < 0){console.error("Lista de productos está vacía"); return;}
    if(producto.nombre === productoNombre){
      let $producto = d.querySelector(`[data-nombre="${producto.nombre}"]`);
      //console.log($producto);
      let $productoStock = $producto.querySelector(".stock");
      //let $productoStock = $producto.closest(".stock");
      //console.log($productoStock);
      //d.querySelector(".stock");
      $productoStock.textContent = `En stock: ${producto.stock}`;
    }
  } 
}
//Reto 2
function cuentaRegresiva(segundosParaConfirmar){
  let tiempoRestante = segundosParaConfirmar; 
  //console.log("Tiempo restante para confirmar tu compra: ")
  $mensajeLoader.textContent = `Tiempo restante para confirmar tu compra: ${tiempoRestante}`;
  $loader.style.display = `block`;
  let intervalo = setInterval(function() {
    if (tiempoRestante > 0) {
        tiempoRestante--;
        $mensajeLoader.textContent = `Tiempo restante para confirmar tu compra: ${tiempoRestante}`;
    } else {
        clearInterval(intervalo);
        $mensajeLoader.textContent = `¡Compra confirmada!`;
    }
}, 1000);
}
//Instruccion 5
function procesarCompra(){
  //console.log("Procesando compra...");
  $loader.classList.remove("hidden");
  cuentaRegresiva(5);
  setTimeout(function(){
      $loader.style.display = 'none'; 
      $mensajeCompra.classList.remove("hidden");
      
      //console.log("El total con tu descuento fue: " + totalCarrito);
  }, 5000)
}

export function agregarOquitarDelCarrito(){
  d.addEventListener("click", function (e) {
    if (!e.target.matches("button")) {
      //console.log(`Click en algo que no es boton`)
      return false;
    }
    if(e.target.matches(".btnProducto")){
      //console.log("Click en un boton de producto");
      const producto = e.target.closest("article");
      //console.log(producto);
      if(e.target.matches("#btn-anadirACarrito")){
        //console.log("Click en boton de quitar de carrito producto");
        //console.log(e)
        let nombreProducto = producto.getAttribute("data-nombre");
        let cantidad = 1;
        agregarAlCarrito(nombreProducto, cantidad);
      }
      else if(e.target.matches("#btn-quitarDeCarrito")){
        //agregarAlCarrito(e.target.)
        //console.log(e)
        let nombreProducto = producto.getAttribute("data-nombre");
        let cantidad = 1;
        quitarDelCarrito(nombreProducto, cantidad);
      }
      else{console.log("Presioné un botón que no hace nada"); return;}
    }
    /*
    const $producto = e.target;
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));
  
    const $itemCarrito = d.createElement("li");
    $itemCarrito.innerText = `${nombre} - $${precio}`;
  
    $listaCarrito.appendChild($itemCarrito);
  
    let totalActual = parseFloat($totalCarrito.innerText);
    $totalCarrito.innerText = (totalActual + precio).toFixed(2);*/
  });
}

export function comprar(){
  $btnCompra.addEventListener("click", function (e) {
    console.log($listaCarrito.children);
    if ($listaCarrito.children.length > 0) {
      procesarCompra();
    } else {
      alert("El carrito está vacío, no se puede realizar la compra.");
    }
  });
}

