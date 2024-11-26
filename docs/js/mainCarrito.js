import { obtenerDatosDeAPI } from "./modules/functional/datosDeArticulos.js";
import { obtenerProductos, mostrarProductosDisponibles, agregarOquitarDelCarrito, comprar } from "./modules/functional/carrito.js";

async function inicializarTienda() {
    await obtenerDatosDeAPI();
    obtenerProductos();
    mostrarProductosDisponibles();
    agregarOquitarDelCarrito();
    comprar();
}
  
inicializarTienda();
