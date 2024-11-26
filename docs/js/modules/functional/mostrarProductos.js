import { getProductos } from "../functional/datosDeArticulos.js";

const d = document;
const $listaProductos = d.querySelector("#productos")


let productos = [];

export function obtenerProductos(){
  productos = getProductos();
}

export function mostrarProductosDisponibles(){
  if(productos==null || productos < 0 || productos.length === 0)
  {console.error("Lista de productos está vacía"); return;}
  $listaProductos.innerHTML = "";
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
