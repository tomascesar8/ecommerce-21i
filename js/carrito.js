class Producto{
    constructor(id, nombre, precio, image){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.image = image;
    }
}

let productos=[
    new Producto(1,'Agua',220,'assets/img/agua.jpg'),
    new Producto(2,'Cerveza', 500, 'assets/img/cerveza.JPG'),
    new Producto(3, 'Pan', 120, 'assets/img/pan.JPG'),
    new Producto(4, 'Chocolate', 250, 'assets/img/chocolate.JPG'),
    new Producto(5, 'Helado 1/4', 650, 'assets/img/helado.JPG'),
    new Producto(6, 'Queso 200grs', 500, 'assets/img/queso.JPG'),
];

function saveLS(objeto, nombre){
    let productosLS = JSON.stringify(objeto);
    localStorage.setItem(nombre, productosLS);
}
saveLS(productos, 'productos')

let carrito;
if(JSON.parse(localStorage.getItem('carrito'))){
    carrito = JSON.parse(localStorage.getItem('carrito'));
}else{
    carrito = [];
}
console.log(carrito);
// console.log(productos);
// localStorage.removeItem('carrito')


carrito.forEach(product=>{
    let productCard = document.createElement('li');
    productCard.innerHTML = `
    <div id="${product.id}" class="card w-100 ">
    <div class="card-body w-100">
    <h5 class="card-title">${product.nombre}</h5>
    <p class="card-text">${product.precio}</p>
        <a href="#" class="btn btn-primary">Eliminar producto</a>
        </div>
        </div>
        `
        let carritoContainer = document.getElementById('carrito-container');
carritoContainer.appendChild(productCard);
carritoContainer.classList.add('d-flex', 'bg-light', 'flex-wrap')
productCard.classList.add('m-1', 'list-unstyled')
});



productos.forEach(producto=>{
    let productCard = document.createElement('div');
    productCard.innerHTML = `
    <div class="card" id=${producto.id} style="width: 18rem;">
        <img src="${producto.image}" class="card-img-top" alt="1.2 Imagen ${producto.nombre}">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
        </div>
        <button onclick="redirigir(event)" class="btn btn-primary w-100 " >Ver producto</button>
        <button onclick="agregarProducto(event)" class="btn btn-success w-100" >Agregar</button>
    </div>
    `;
    productCard.classList.add('col-4','mt-3');
    let productsContainer = document.getElementById('products-container');
    productsContainer.appendChild(productCard);
    }
);

function agregarProducto(event) {
    let productId = event.target.parentElement.id;
    console.log(productId);
    let product = productos.find(producto=>producto.id == productId);
    carrito.push(product);
    let productCard = document.createElement('li');
    productCard.innerHTML = `
    <div id="${product.id}" class="card w-50">
        <div class="card-body">
            <h5 class="card-title">${product.nombre}</h5>
            <p class="card-text">${product.precio}</p>
            <button id="eliminar-producto" type="button" onclick="eliminarProducto(event)" class="btn btn-primary">Eliminar producto</button>
        </div>
    </div>
    `
    console.log(carrito);
    let carritoContainer = document.getElementById('carrito-container');
    carritoContainer.appendChild(productCard);
    conteoCarrito();

    localStorage.setItem('carrito', JSON.stringify(carrito));
};

function eliminarProducto(event) {
    let idLS = (((event.target.parentElement).parentElement).id);
    let posicionEnCarrito = carrito.indexOf(carrito.find(producto=>producto.id == idLS));
    let eliminar = carrito.splice(posicionEnCarrito,1);
    ((event.target.parentElement).parentElement).parentElement.remove() //? COMO ACORTAR LA SELECCION DEL ELEMENTO?
    localStorage.setItem('carrito', JSON.stringify(carrito));
    conteoCarrito();
    console.log(carrito);
    // let carritoLS = JSON.parse(localStorage.getItem('carrito'));
    
}//? PORQUÉ CUANDO ACTUALIZO NO ME DEJA ELIMINAR LOS ITEMS?

function deleteAll(event) {
    carrito = [];
    console.log(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    conteoCarrito();
    window.location.reload();
}

function redirigir(event){
    let idProducto = event.target.parentElement.id;
    window.location.assign(window.location.origin + `/producto.html#${idProducto}`);
}

function conteoCarrito(params) {
    let conteo = carrito.length;
    let cartButton = document.getElementById('cart-button');
    cartButton.innerText = `Carrito (${conteo})`
}


// function mostrarCarrito() {  //? COMO DEJAR DE CREAR EL ELEMENTO CADA VEZ QUE APRIETO LA FUNCION?
//     if(carrito.length===0){
//         console.log('Tu carrito está vacio');
//         let productCard = document.createElement('h5');
//         productCard.innerText = `Tu carrito está vacío`
//         carritoContainer = document.getElementById('modal_body');
//         carritoContainer.appendChild(productCard);
//     }else{
//         carrito.forEach(product=>{
//         let productCard = document.createElement('li');
//         productCard.innerHTML = `
//         <div id="${product.id}" class="card w-50">
//             <div class="card-body">
//                 <h5 class="card-title">${product.nombre}</h5>
//                 <p class="card-text">${product.precio}</p>
//                 <a href="#" class="btn btn-primary">Eliminar producto</a>
//             </div>
//         </div>
//         `
//         console.log(carrito);
//         let carritoContainer = document.getElementById('carrito-container');
//         carritoContainer.appendChild(productCard);
//     });
//     }
// }

// function buscarProducto (){
//     let productoBuscado = (prompt('Buscar producto en carrito:').toLowerCase().trim());
//     console.log(`${productoBuscado} se encuentra en tu carrito? ${carrito.includes(productoBuscado)}`);
//     }


// function filtrarEnCarrito () {
//     let productoFiltrado = (prompt('Filtrar producto en carrito:').toLowerCase().trim());
//     let filtrar = carrito.filter(producto=>producto.includes(productoFiltrado.toLowerCase().trim())); 
//     //? si o si va el includes en el filter?
//     console.log(filtrar);
// }

// function eliminarProducto () { // hacer que funcione con filtrando y no solo con la palabra exacta
//     let eliminarEnCarrito = (prompt('Qué producto querés eliminar?').toLowerCase().trim());
//     let posicion = carrito.indexOf(eliminarEnCarrito);
//     if (posicion === -1){
//         alert('Te olvidase de escribir muñeco');
//     }else{
//         let borrado = carrito.splice(posicion, 1);
//         console.log(`Los productos de tu carrito son:\n- ${carrito.join('\n- ')}`);
//         console.log(`Articulo borrado: ${borrado}`);
//     }
// }