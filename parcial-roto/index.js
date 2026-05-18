// Clave usada en LocalStorage para persistir el array del carrito
const CLAVE_CARRITO = "carrito";

//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    // Si no hay datos guardados, devolvemos un array vacío
    if (carritoGuardado === null) 
    {
        return [];
    }

    return JSON.parse(carritoGuardado);
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    const carritoFiltrado = carrito.filter(producto => producto.cantidad > 0);

    console.log(carritoFiltrado);

    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carritoFiltrado));
}

function obtenerDatosProductoDesdeBoton(elementoBoton) 
{
    const contenedorProducto = elementoBoton.parentElement;
    const nombre = contenedorProducto.querySelector(".nombre-producto").textContent.trim();
    const precioTexto = contenedorProducto.querySelector(".precio-producto").textContent.trim();

    const precio = parseInt(precioTexto.replace("$", ""), 10);

    return { nombre, precio };
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    const datosProducto = obtenerDatosProductoDesdeBoton(elementoClickeado);

    let carrito = obtenerCarrito();

    const indiceProducto = carrito.findIndex(producto => producto.nombre === datosProducto.nombre);

    if (indiceProducto === -1) 
    {
        carrito.push({
            nombre: datosProducto.nombre,
            precio: datosProducto.precio,
            cantidad: 1
        });
    } 
    else 
    {
        carrito[indiceProducto].cantidad += 1;
    }

    guardarCarrito(carrito);

    alert(`Un/una: ${datosProducto.nombre} fue agregado/a al carrito`);
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    const datosProducto = obtenerDatosProductoDesdeBoton(elementoClickeado);

    let carrito = obtenerCarrito();

    if (carrito.length === 0) 
    {
        alert("No hay ningún producto guardado en el carrito");
        return;
    }

    const indiceProducto = carrito.findIndex(producto => producto.nombre === datosProducto.nombre);

    if (indiceProducto === -1) 
    {
        alert(`No hay más ${datosProducto.nombre} en el carrito`);
        return;
    }

    carrito[indiceProducto].cantidad -= 1;

    guardarCarrito(carrito);

    alert(`Un/una: ${datosProducto.nombre} fue eliminado/a del carrito`);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
