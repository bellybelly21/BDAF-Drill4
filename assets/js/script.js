import productos from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const botonCarrito = document.getElementById('boton-carrito');
  const offcanvasCarrito = document.getElementById('offcanvas-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarritoElem = document.getElementById('total-carrito');
  const cerrarCarrito = document.getElementById('cerrar-carrito');
  
  botonCarrito.addEventListener('click', () => {
    actualizarCarrito(); 
    offcanvasCarrito.classList.add('open');
  });
  
  cerrarCarrito.addEventListener('click', () => {
    offcanvasCarrito.classList.remove('open');
  });
  
  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    const productosEnCarrito = carrito.productos;
  
    if (productosEnCarrito.length === 0) {
      listaCarrito.innerHTML = '<p>El carrito está vacío.</p>';
      totalCarritoElem.textContent = '';
      return;
    }
  
    productosEnCarrito.forEach((producto, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${index + 1}. ${producto.nombre} - $${producto.precio}
        <button class="eliminar-producto" data-index="${index}">Eliminar</button>
      `;
      listaCarrito.appendChild(li);
    });
  
    const total = carrito.calcularTotal();
    totalCarritoElem.textContent = `Total: $${total}`;
  
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(boton => {
      boton.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        eliminarProductoCarrito(index);
      });
    });
  }
  
  function eliminarProductoCarrito(index) {
    carrito.productos.splice(index, 1); 
    actualizarCarrito(); 
  }
  
  const botonFinalizarCompra = document.getElementById('finalizar-compra');
  botonFinalizarCompra.addEventListener('click', () => {
    carrito.finalizarCompra();
    offcanvasCarrito.classList.remove('open');
  });
  
});

class Carrito {
  constructor() {
    this.productos = []; 
  }

  agregarProducto(producto) {
    this.productos.push(producto);
    alert(`Producto agregado: ${producto.nombre}`);
    actualizarCantidadCarrito();
  }

  eliminarProducto(index) {
    this.productos.splice(index, 1);
    actualizarCantidadCarrito();
  }

  calcularTotal() {
    return this.productos.reduce((total, producto) => total + producto.precio, 0);
  }

  mostrarDetallesCompra() {
    if (this.productos.length === 0) {
      alert(`El carrito está vacío.`);
      return;
    }

    this.productos.forEach((producto, index) => {
      alert(`Detalles de la compra: ${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
  }

  finalizarCompra() {
    if (this.productos.length === 0) {
      alert(`El carrito está vacío.`);
      return;
    }

    const total = this.calcularTotal();
    alert(`Compra finalizada. Total: $${total}`);
    this.mostrarDetallesCompra();
    this.productos = []; 
    alert(`Gracias por su compra!`);
    actualizarCantidadCarrito();
  }
}

const carrito = new Carrito();

function crearCardProducto(producto) {
  if (!producto.nombre || !producto.precio || !producto.imagen) {
    console.error(`Producto inválido: ${producto.nombre}`);
    return;
  }

  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="card-producto">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
      <div class="flex-row">
        <p class="producto-precio">$${producto.precio}</p>
        ${producto.precioAnterior ? `<span class="producto-precioAnterior">$${producto.precioAnterior}</span>` : ''}
      </div>
      <p class="producto-marca">${producto.marca || 'Sin marca'}</p>
      <h2 class="producto-nombre">${producto.nombre}</h2>
      <button class="agregar-carrito">Agregar</button>
      <div class="calificacion flex-row">
        <i class="fa-solid fa-star"></i>
        <p class="producto-calificacion">${producto.calificacion || 'N/A'}</p>
      </div>
    </div>
  `;

  const contenedor = document.getElementById('productos-container');
  contenedor.appendChild(card);

  const botonAgregar = card.querySelector('.agregar-carrito');
  botonAgregar.addEventListener('click', () => {
    carrito.agregarProducto(producto);  
  });
}

productos.forEach(producto => {
  crearCardProducto(producto);
});

function actualizarCantidadCarrito() {
  const cantidadCarritoElem = document.getElementById('cantidad-carrito');
  cantidadCarritoElem.textContent = carrito.productos.length;
}
