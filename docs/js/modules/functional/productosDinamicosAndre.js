document.addEventListener('DOMContentLoaded', cargarProductos);

//Este js manda a llamar mis datos desde productosAndre.json

async function cargarProductos() {
  try {
    const response = await fetch('../js/modules/functional/productosAndre.json');
    
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }

    const data = await response.json();

    renderizarProductos(data);

  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

function renderizarProductos(data) {
  const promocionesContainer = document.querySelector('.categories');
  const nuevosProductosContainer = document.querySelector('.swiper.mySwiper-2 .swiper-wrapper');

  data.forEach(producto => {
    if (producto.category === 'promotions') {
      promocionesContainer.innerHTML += crearPromoHTML(producto);
    } else if (producto.category === 'new-products') {
      nuevosProductosContainer.innerHTML += crearProductoHTML(producto);
    }
  });

  actualizarBotonesCarrito();
}

function crearPromoHTML(producto) {
  return `
    <div class="categorie">
      <div class="categorie-1">
        <h3>${producto.name}</h3>
        <div class="prices">
          <p class="price-1">$${producto.price + 49}</p>
          <p class="precio">$${producto.price}</p>
        </div>
        <a href="#" class="agregar-carrito btn-3" data-id="${producto.id}">Agregar al carrito</a>
      </div>
      <div class="categorie-img">
        <img src="${producto.image}" alt="${producto.name}">
      </div>
    </div>
  `;
}

function crearProductoHTML(producto) {
  return `
    <div class="swiper-slide">
      <div class="product">
        <img src="${producto.image}" alt="${producto.name}">
        <div class="product-txt">
          <h3>${producto.name}</h3>
          <p>${producto.description}</p>
          <p class="precio">$${producto.price}</p>
          <a href="#" class="agregar-carrito btn-3" data-id="${producto.id}">Agregar al carrito</a>
        </div>
      </div>
    </div>
  `;
}

function actualizarBotonesCarrito() {
  const contenedorPromociones = document.querySelector('.categories');
  const contenedorNuevosProductos = document.querySelector('.swiper.mySwiper-2 .swiper-wrapper');

  // Delegado para los botones de promociones
  contenedorPromociones.addEventListener('click', function (e) {
    if (e.target && e.target.matches('.agregar-carrito')) {
      const producto = e.target.closest('.categorie');
      const infoProducto = {
        id: e.target.dataset.id,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        imagen: producto.querySelector('img').src,
        cantidad: 1
      };
      agregarAlCarrito(infoProducto); 
    }
  });

  contenedorNuevosProductos.addEventListener('click', function (e) {
    if (e.target && e.target.matches('.agregar-carrito')) {
      const producto = e.target.closest('.product');
      const infoProducto = {
        id: e.target.dataset.id,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        imagen: producto.querySelector('img').src,
        cantidad: 1
      };
      agregarAlCarrito(infoProducto);
    }
  });
}
