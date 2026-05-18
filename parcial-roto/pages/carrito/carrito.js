const CLAVE_CARRITO = "carrito";

function obtenerCarrito() 
{
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (carritoGuardado === null) 
    {
        return [];
    }

    return JSON.parse(carritoGuardado);
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");

    let carrito = obtenerCarrito();

    const filasProductos = tabla.querySelectorAll("tr:not(.fila-header-carrito)");
    filasProductos.forEach(fila => fila.remove());

    const productosValidos = carrito.filter(producto => producto.cantidad >= 1);

    let totalFinal = 0;

    productosValidos.forEach(producto => 
    {
        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = producto.nombre;

        const celdaCantidad = document.createElement("td");
        celdaCantidad.textContent = producto.cantidad;

        const celdaPrecioUnitario = document.createElement("td");
        celdaPrecioUnitario.textContent = `$${producto.precio}`;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaPrecioUnitario);

        tabla.appendChild(fila);

        totalFinal += producto.precio * producto.cantidad;
    });

    const valorFinal = document.getElementById("valor-final");

    // Si no hay productos, se muestra $0
    if (productosValidos.length === 0) 
    {
        valorFinal.textContent = "El valor final a pagar es de: 0$";
    } 
    else 
    {
        valorFinal.textContent = `El valor final a pagar es de: $${totalFinal}`;
    }
}

function limpiarCarrito() 
{
    // Revalidación para que el usuario confirme si quiere limpiar su carrito
    const confirmarBorrado = confirm("¿Estás seguro de que querés vaciar tu carrito?");

    if (!confirmarBorrado) 
    {
        return;
    }

    localStorage.removeItem(CLAVE_CARRITO);

    cargarProductosCarrito();

    // Se agrega un delay para que se vea el alert después de que ya no se muestren los productos
    setTimeout(() => 
    {
        alert("Carrito limpiado correctamente");
    }, 0);
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});