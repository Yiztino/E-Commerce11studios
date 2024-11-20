let listaDeProductos = [];

export async function obtenerDatosDeAPI() {
  try {
    let url = "https://fakestoreapi.com/products";
    let res = await fetch(url);

    if (!res.ok) {
      throw "Error al acceder a la API";
    }

    let json = await res.json();

    console.log(res, json);
    
    let minItemsInStock = 1;
    let maxItemsInStock = 100;
    listaDeProductos = json.map(producto => ({
      id: producto.id,
      nombre: producto.title, 
      precio: producto.price,
      stock: (Math.floor(Math.random() * (maxItemsInStock - minItemsInStock + 1)) + minItemsInStock), 
      tipoProducto: producto.category /*|| "General"*/,
      class: "producto",
      descripcion: producto.description, 
      imagen: producto.image
    }));
    console.log(listaDeProductos); 
  } catch (error) {
    console.warn(error);
  }
}
document.addEventListener("DOMContentLoaded", (e) => {
  obtenerDatosDeAPI(); 
});

export function getProductos(){
  return listaDeProductos;
}