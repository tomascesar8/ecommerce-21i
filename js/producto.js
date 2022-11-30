let productos = JSON.parse(localStorage.getItem('productos'));

let idProducto = window.location.hash.slice(1);
console.log(idProducto);
let mostrarProducto = productos.find(producto=>producto.id == idProducto);
console.log(mostrarProducto)
let paginaProducto = document.createElement('div');
paginaProducto.classList.add('container', 'd-flex', 'flex-column', 'justify-content-center', 'vh-100');
paginaProducto.innerHTML = `
<h1 class="text-center bg-primary m-0 p-3">${mostrarProducto.nombre}</h1>
<div class="d-flex justify-content-center bg-secondary"><img id="product-img" src="${mostrarProducto.image}" alt="1.2 Imagen ${mostrarProducto.nombre}"></div>
<h3 class="text-center bg-success p-2">$${mostrarProducto.precio} </h3>
`
let padre = document.getElementById('div-product-container');
padre.appendChild(paginaProducto)