class Libro {
    constructor (titulo, autor, precio, img) {
        this.titulo = titulo;
        this.autor = autor;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

let libreria = [];


let catalogo = document.getElementById("catalogo")   
let btnCarrito = document.getElementById("btnCarrito")
let modalBody = document.getElementById("modalBody")
let precioTotal = document.getElementById("precioTotal")




//CARDS

fetch('json/libros.json')
.then(response => response.json())
.then(cardLibros => {
    cardLibros.forEach((productoArray, indice) => {
        catalogo.innerHTML += `
        <div class="card" id="product${indice}" style="width: 13rem; margin: 10px; text-align: center; background-color: transparent; border: none;">
            <img src="./img/${productoArray.img}" class="card-img-top" style="height: 270px;">
            <div class="card-body" style="height: 12rem;">
                <h5 class="card-title" style="color: black">${productoArray.titulo}</h5>
                <p class="card-text" style="color: black">${productoArray.autor}</p>
                <p class="card-text" style="color: black; font-weight: bold">$${productoArray.precio}</p>
                <button id="boton${indice}" class="btn btn-dark"><i class="fas fa-cart-plus"></i></button>
                </div>
        </div>
        `
    });
    
    
    //AGREGO PRODUCTOS AL CARRITO
    
    cardLibros.forEach((productoArray, indice) => {
        document.getElementById(`boton${indice}`).addEventListener('click', () => {
            if(libreria.find(libro => libro.titulo == productoArray.titulo)) {
            let index = libreria.findIndex(libro => libro.titulo == productoArray.titulo);
            libreria[index].cantidad++;
            localStorage.setItem('carrito', JSON.stringify(libreria));
        } else {
            let libro = new Libro (productoArray.titulo, productoArray.autor, productoArray.precio, productoArray.img);
            libreria.push(libro);
            localStorage.setItem('carrito', JSON.stringify(libreria));
        }
    })
});

}) 


btnCarrito.addEventListener('click', () => {
    let librosDelStorage = JSON.parse(localStorage.getItem('carrito'));

    cargarProductosModal(librosDelStorage);
    
})
  


//CARGA AL MODAL


function cargarProductosModal(librosDelStorage) {

    modalBody.innerHTML = "";

    librosDelStorage.forEach((libroCarrito, indice) => {
        modalBody.innerHTML += `
        <div class="card mb-3" id="libroCarrito${indice} "style="max-width: 540px; style="background-color: white">
            <div class="row g-0" style="background-color: white">
            <div class="col-md-4">
                    <img src="./img/${libroCarrito.img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${libroCarrito.titulo}</h5>
                        <p class="card-text">${libroCarrito.autor}</p>
                        <p class="card-text">Cantidad: ${libroCarrito.cantidad}</p>
                        <p class="card-text"><small class="text-muted">Subtotal: $${(libroCarrito.precio * libroCarrito.cantidad)}</small></p>
                        <button class="btn btn-danger" id="btnEliminar${indice}"><i class="fas fa-trash"></i></button>
                    </div>
                    </div>
                    </div>
        </div>
        `
    })


compraTotal(librosDelStorage);

}


//COMPRA TOTAL

function compraTotal(librosDelStorage) {
    acumulador = 0;
    librosDelStorage.forEach((libroCarrito) => {
        acumulador += libroCarrito.precio * libroCarrito.cantidad;
    })

    if(acumulador == 0) {
        precioTotal.innerHTML = "";
        modalBody.innerHTML = "<p>No hay productos agregados en el carrito </p>" 
    } else {
        precioTotal.innerHTML = `Importe total: $${acumulador}`
    }
   
}



//VACIAR CARRITO

function borrarCarrito() {
    libreria= [];
    localStorage.setItem('carrito', '[]');
    document.getElementById('modalBody').html = '';
}

vaciarCarrito.addEventListener('click', () =>
borrarCarrito());



//DOM

$(document).ready(function() {
libreria = JSON.parse(localStorage.getItem('carrito'))
})