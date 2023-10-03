
// Variable global para el contador
var contador = 0;
// Función para agregar los datos a la tabla
function agregarDatos() {

    // Obtener los valores del formulario
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;

    // Crear una nueva fila en la tabla
    var fila = document.createElement("tr");

    // Crear las celdas para cada valor
    var celdaNombre = document.createElement("td");
    celdaNombre.innerHTML = nombre;
    fila.appendChild(celdaNombre);

    var celdaApellido = document.createElement("td");
    celdaApellido.innerHTML = apellido;
    fila.appendChild(celdaApellido);

    var celdaEmail = document.createElement("td");
    celdaEmail.innerHTML = email;
    fila.appendChild(celdaEmail);

    // Crear el botón de eliminación
    var celdaEliminar = document.createElement("td");
    var eliminarBtn = document.createElement("button");
    eliminarBtn.className = "eliminar-btn";
    eliminarBtn.innerHTML = "Completado";
    eliminarBtn.onclick = function() {
        eliminarFila(this);
        // Aumentar el contador y actualizar el elemento <span>
        contador++;
        document.getElementById("contador").textContent = contador;

        // Guardar el valor del contador en las cookies
        guardarContadorEnCookies(contador);
    };
    celdaEliminar.appendChild(eliminarBtn);
    fila.appendChild(celdaEliminar);

    // Agregar la fila a la tabla
    document.getElementById("tablaDatos").getElementsByTagName("tbody")[0].appendChild(fila);

    // Agregar los datos al array y guardarlos en las cookies
    var datos = {
        nombre: nombre,
        apellido: apellido,
        email: email
    };
    guardarEnCookies(datos);
}

function guardarContadorEnCookies(contador) {
    document.cookie = "contador=" + contador;
}


// Función para eliminar una fila
// Función para eliminar una fila
function eliminarFila(button) {
    var fila = button.parentNode.parentNode; // Obtener la fila padre del botón
    fila.remove(); // Eliminar la fila

    // Obtener los datos de las cookies
    var datosGuardados = obtenerDesdeCookies();

    // Encontrar el índice de la fila que se eliminó
    var index = -1;
    for (var i = 0; i < datosGuardados.length; i++) {
        if (datosGuardados[i].nombre === fila.cells[0].innerHTML &&
            datosGuardados[i].apellido === fila.cells[1].innerHTML &&
            datosGuardados[i].email === fila.cells[2].innerHTML) {
            index = i;
            break;
        }
    }

    // Si se encontró el índice, eliminar el dato correspondiente de los datos guardados
    if (index !== -1) {
        datosGuardados.splice(index, 1);
        // Actualizar los datos en las cookies
        document.cookie = "datos=" + JSON.stringify(datosGuardados);
    }
}


// Función para guardar los datos en las cookies
function guardarEnCookies(datos) {
    // Obtener el array de datos de las cookies (si existe)
    var datosGuardados = obtenerDesdeCookies();

    // Agregar los nuevos datos al array
    datosGuardados.push(datos);

    // Convertir el array a JSON y guardarlo en las cookies
    document.cookie = "datos=" + JSON.stringify(datosGuardados);
}

// Función para obtener los datos desde las cookies
function obtenerDesdeCookies() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith("datos=")) {
            // Encontrado el cookie de datos, obtener su valor
            var datosJSON = cookie.substring("datos=".length);
            return JSON.parse(datosJSON);
        }
    }
    // Si no se encuentra, devolver un array vacío
    return [];
}

// Cargar los datos guardados en las cookies al cargar la página
window.onload = function() {
    // Verificar si hay un contador almacenado en las cookies
    var contadorCookie = obtenerContadorDesdeCookies();
    if (contadorCookie !== null) {
        contador = parseInt(contadorCookie);
        document.getElementById("contador").textContent = contador;
    }

    var datosGuardados = obtenerDesdeCookies();
    for (var i = 0; i < datosGuardados.length; i++) {
        var datos = datosGuardados[i];
        agregarFilaDesdeCookies(datos);
    }
}

function obtenerContadorDesdeCookies() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith("contador=")) {
            // Encontrado el cookie del contador, obtener su valor
            return cookie.substring("contador=".length);
        }
    }
    // Si no se encuentra, devolver null
    return null;
}


// Función para agregar una fila de datos desde las cookies
function agregarFilaDesdeCookies(datos) {
    // Crear una nueva fila en la tabla
    var fila = document.createElement("tr");

    // Crear las celdas para cada valor
    var celdaNombre = document.createElement("td");
    celdaNombre.innerHTML = datos.nombre;
    fila.appendChild(celdaNombre);

    var celdaApellido = document.createElement("td");
    celdaApellido.innerHTML = datos.apellido;
    fila.appendChild(celdaApellido);

    var celdaEmail = document.createElement("td");
    celdaEmail.innerHTML = datos.email;
    fila.appendChild(celdaEmail);

    // Crear el botón de eliminación
    var celdaEliminar = document.createElement("td");
    var eliminarBtn = document.createElement("button");
    eliminarBtn.className = "eliminar-btn";
    eliminarBtn.innerHTML = "Completado";
    eliminarBtn.onclick = function() {
        eliminarFila(this);
    };
    celdaEliminar.appendChild(eliminarBtn);
    fila.appendChild(celdaEliminar);

    // Agregar la fila a la tabla
    document.getElementById("tablaDatos").getElementsByTagName("tbody")[0].appendChild(fila);
}