import productos from './data.js';

function crearCardProducto(producto) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
      <div class="flex-row"><p class="producto-precio">$${producto.precio}</p><span class="producto-precioAnterior">$${producto.precioAnterior}</span></div>
      <p class="producto-marca">${producto.marca}</p>
      <h2 class="producto-nombre">${producto.nombre}</h2>
      <button class="agregar-carrito">Agregar al carrito</button>
      <div><p class="producto-calificacion">${producto.calificacion}</p></div>
    `;
  
    const contenedor = document.getElementById('productos-container');
    contenedor.appendChild(card);
  }

  productos.forEach(producto => {
    crearCardProducto(producto);
  });