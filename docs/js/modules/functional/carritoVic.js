let carrito = [];

const carritoContainer = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');

document.addEventListener('DOMContentLoaded', cargarCarrito);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
agregarCarritoBtns.forEach(btn => btn.addEventListener('click', agregarAlCarrito));

function cargarCarrito() {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    renderizarCarrito();
    calcularTotal();

}

function agregarAlCarrito(e) {
    e.preventDefault();
    const producto = e.target.closest('.categorie, .product');
    const infoProducto = {
        id: e.target.dataset.id,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        imagen: producto.querySelector('img').src,
        cantidad: 1
    };

    const existe = carrito.some(item => item.id === infoProducto.id);
    if (existe) {
        const productos = carrito.map(item => {
            if (item.id === infoProducto.id) item.cantidad++;
            return item;
        });
        carrito = [...productos];
    } else {
        carrito.push(infoProducto);
    }

    guardarCarrito();
    renderizarCarrito();
    calcularTotal();
}

function calcularTotal() {
    const total = carrito.reduce((acc, producto) => {
        return acc + (parseFloat(producto.precio.replace('$', '')) * producto.cantidad);
    }, 0);

    const totalCarrito = document.querySelector('#total-carrito');
    totalCarrito.textContent = `$${total.toFixed(2)}`;
}


function renderizarCarrito() {
    carritoContainer.innerHTML = ''; 

    carrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><button class="eliminar-producto btn-eliminar" data-id="${producto.id}">Eliminar</button></td>
        `;

        carritoContainer.appendChild(row);
    });

    document.querySelectorAll('.eliminar-producto').forEach(btn =>
        btn.addEventListener('click', eliminarProducto)
    );
}



function eliminarProducto(e) {
    e.preventDefault();
    const productoId = e.target.dataset.id;

    const producto = carrito.find(item => item.id === productoId);

    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad--;
        } else {
            carrito = carrito.filter(item => item.id !== productoId);
        }
    }

    guardarCarrito();
    renderizarCarrito();
    calcularTotal();
}




function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
    calcularTotal();

}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
