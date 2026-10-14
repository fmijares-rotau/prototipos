document.addEventListener('DOMContentLoaded', function () {
    // Code to be executed when the DOM is ready
    if (document.getElementById('sin_fichaje')) {
        // El elemento existe
        setTimeout(irAIndex, 1000);
    }
});

// Obtén una referencia al elemento del spinner
const spinner = document.getElementById('loading');

// Asegúrate de que el spinner esté visible mientras la página carga.
// Es ideal si el spinner es visible por defecto mediante CSS.
// Este script se encargará de ocultarlo cuando la carga finalice.
if (spinner) {
    spinner.style.display = 'block';
}

// Oculta el spinner cuando la carga de la página ha finalizado.
window.addEventListener('load', function () {
    if (spinner) {
        spinner.style.display = 'none';
    }
});

function crearCookie(checkbox) {
    var estado = checkbox.checked ? 1 : 0;
    if (estado == 1) {
        // Crear la cookie con tiempo de expiración en 24 horas
        var fechaExpiracion = new Date();
        fechaExpiracion.setTime(fechaExpiracion.getTime() + (24 * 60 * 60 * 1000)); // 24 horas en milisegundos
        var expires = "expires=" + fechaExpiracion.toUTCString();

        // Establecer la cookie
        document.cookie = "noMostrar24=1; " + expires;
    } else {
        document.cookie = "noMostrar24=1; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }



}
function actualizarCampo(checkbox) {
    var estado = checkbox.checked ? 1 : 0;

    // Crear objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud AJAX
    xhr.open("POST", "../common/mostrarModalFichaje.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Enviar los datos al servidor
    xhr.send("estadoCheckbox=" + estado);
}

function totalFichajes(callback) {
    // Crear objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var callbackCount = 0; // Contador para el número de ejecuciones del callback

    // Configurar la solicitud AJAX
    xhr.open("POST", "../common/mostrarModalFichaje.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Enviar los datos al servidor
    xhr.send("fichajes=1");

    // Manejar la respuesta del servidor
    xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
            if (callbackCount < 2) { // Verificar si el callback se ha ejecutado menos de 2 veces
                var respuesta = xhr.responseText;
                callback(respuesta);
                callbackCount++; // Incrementar el contador
            }
        } else {
            console.error("Error en la solicitud AJAX");
        }
    };
}

function toggleTabIndex(tabName) {
    $(".tab").removeClass("active_tab_fichaje");
    $(".tab" + tabName).addClass("active_tab_fichaje");
    $(".ContenedorFichaje").css("display", "none");
    $("." + tabName).css("display", "flex");
    if (tabName != "fichaje") {
        $(".boton_fichar ").css("display", "none");
    } else {
        $(".boton_fichar ").css("display", "flex");
    }
}

if (document.getElementById("contendor_reloj_index") && document.getElementById("contendor_reloj_index2")) {
    var spacing = 10,
        //contains values for hours, minutes, seconds
        times, times2,
        //text elements
        elements = {
            H: document.getElementById("H"),
            M: document.getElementById("M"),
            S: document.getElementById("S")
        },
        elements2 = {
            H_2: document.getElementById("H_2"),
            M_2: document.getElementById("M_2"),
            S_2: document.getElementById("S_2")
        }

    //set text colors
    Object.keys(elements).forEach((k, i) => {
        switch (i) {
            case 0:
                elements[k].style.color = "#412DB6";
                break;
            case 1:
                elements[k].style.color = "	#412DB699";
                break;
            case 2:
                elements[k].style.color = "#412DB666";
                break;
            default:
                break;
        }
    });

    //set text colors
    Object.keys(elements2).forEach((k, i) => {
        switch (i) {
            case 0:
                elements2[k].style.color = "#2D3748CC";
                break;
            case 1:
                elements2[k].style.color = "#2D3748CC";
                break;
            case 2:
                elements2[k].style.color = "#2D3748CC";
                break;
            default:
                break;
        }
    });

    //update time values and text once per second
    function updateTime(diferencia = 0) {
        var time = new Date();
        if (diferencia === 0) {
            times = {
                H: time.getHours(),
                M: time.getMinutes(),
                S: time.getSeconds()
            };

            //update text
            Object.keys(times).forEach(k =>
                elements[k].innerHTML =
                //pad with 0s if needed
                String(times[k]).length > 1 ?
                    times[k] :
                    times[k] = "0" + times[k]
            );

            times2 = {
                H_2: time.getHours(),
                M_2: time.getMinutes(),
                S_2: time.getSeconds()
            };

            //update text
            Object.keys(times2).forEach(k =>
                elements2[k].innerHTML =
                //pad with 0s if needed
                String(times2[k]).length > 1 ?
                    times2[k] :
                    times2[k] = "0" + times2[k]
            );

            setTimeout(updateTime, 1000);
        } else {
            var diferenciaHoraria = diferencia;
            time.setHours(time.getHours() + diferenciaHoraria);
            // Obtiene las partes de la fecha y hora
            var hora = time.getHours();
            var minutos = time.getMinutes();
            var segundos = time.getSeconds();
            times = {
                H: hora,
                M: minutos,
                S: segundos
            };
            times2 = {
                H_2: hora,
                M_2: minutos,
                S_2: segundos
            };

            //update text
            Object.keys(times).forEach(k =>
                elements[k].innerHTML =
                //pad with 0s if needed
                String(times[k]).length > 1 ?
                    times[k] :
                    times[k] = "0" + times[k]
            );

            //update text
            Object.keys(times2).forEach(k =>
                elements2[k].innerHTML =
                //pad with 0s if needed
                String(times2[k]).length > 1 ?
                    times2[k] :
                    times2[k] = "0" + times2[k]
            );
        }
    }
    //start
    updateTime();
}

if (document.getElementById("contendor_reloj_index") && !document.getElementById("contendor_reloj_index2")) {
    var spacing = 10,
        //contains values for hours, minutes, seconds
        times, times2,
        //text elements
        elements = {
            H: document.getElementById("H"),
            M: document.getElementById("M"),
            S: document.getElementById("S")
        }

    //set text colors
    Object.keys(elements).forEach((k, i) => {
        switch (i) {
            case 0:
                elements[k].style.color = "#412DB6";
                break;
            case 1:
                elements[k].style.color = "	#412DB699";
                break;
            case 2:
                elements[k].style.color = "#412DB666";
                break;
            default:
                break;
        }
    });

    //update time values and text once per second
    function updateTime(diferencia = 0) {
        var time = new Date();
        if (diferencia === 0) {
            times = {
                H: time.getHours(),
                M: time.getMinutes(),
                S: time.getSeconds()
            };

            //update text
            Object.keys(times).forEach(k =>
                elements[k].innerHTML =
                //pad with 0s if needed
                String(times[k]).length > 1 ?
                    times[k] :
                    times[k] = "0" + times[k]
            );

            setTimeout(updateTime, 1000);
        } else {
            var diferenciaHoraria = diferencia;
            time.setHours(time.getHours() + diferenciaHoraria);
            // Obtiene las partes de la fecha y hora
            var hora = time.getHours();
            var minutos = time.getMinutes();
            var segundos = time.getSeconds();
            times = {
                H: hora,
                M: minutos,
                S: segundos
            };

            //update text
            Object.keys(times).forEach(k =>
                elements[k].innerHTML =
                //pad with 0s if needed
                String(times[k]).length > 1 ?
                    times[k] :
                    times[k] = "0" + times[k]
            );
        }
    }
    //start
    updateTime();
}

function listaFichajes(resp, flag = 0) {
    // Llamar a la función totalFichajes y pasar una función de devolución de llamada
    totalFichajes(function (total) {
        var caja = document.getElementById('openModal');
        setTimeout(() => {
            if (caja != null) {
                console.log(total);
                caja.appendChild(genContenidoComfirmIndex(total, resp, flag));
                caja.style.opacity = 1;
                caja.style.pointerEvents = "auto";
            } else {
                console.log("no es null")
            }
        }, 500);
    });
}

function irAIndex() {
    esperaRespuesta(true);
    window.location.href = "index.php";

}
function genContenidoComfirmIndex(total, resp, flag, widget = "") {
    if (flag === 1) {
        var widget = document.getElementById('widget_fichaje_web');
        var divElement = document.createElement('div');
        divElement.className = '!py-5 ';
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = 'X';
        anchorElement.title = 'Close';
        anchorElement.className = 'close';
        anchorElement.onclick = function () {
            hideDialog();
        };
        //divElement.appendChild(anchorElement);
        var okButton = document.createElement('a');
        okButton.id = 'botonPrincipal';
        okButton.className = '!text-[#2C2554] hover:!text-[#FFFFFF] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#2C2554] !bg-[#FFFFFF] cursor-pointer buttonModal';
        if (widget) {
            okButton.innerHTML = cerrar.toUpperCase();
            okButton.onclick = function () {
                hideDialog();
            };
        } else {
            okButton.innerHTML = continuar.toUpperCase();
            okButton.onclick = function () {
                hideDialog();
                esperaRespuesta(true);
                irAIndex();
            };
        }
        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = salir.toUpperCase();
        cancelButton.id = 'botonSecundario';
        cancelButton.className = '!text-[#333333] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#FFFFFF] !bg-[#D9D9D9] cursor-pointer buttonModal';
        cancelButton.onclick = function () {
            hideDialog();
            esperaRespuesta(true);
            logout();
        };

        //var pElement = document.createElement('p');
        //pElement.innerHTML = "Ha realizado un Fichaje";
        //pElement.className = 'text-center mb-5 text-[25px]';
        var divIcon = document.createElement('div');
        divIcon.className = 'w-full flex justify-center text-[#06B6D4] text-[70px]';
        divIcon.innerHTML = '<i class="bx bx-error-circle" ></i>';
        var divButtons = document.createElement('div');
        divButtons.className = 'w-full flex justify-around mt-1';
        divButtons.appendChild(okButton);
        if (!widget) {
            divButtons.appendChild(cancelButton);
        }
        divElement.appendChild(divIcon);
        //divElement.appendChild(pElement);
        var fichajes = document.createElement('div');
        fichajes.className = 'overflow-x-hidden overflow-y-auto min-h-auto max-h-[20vh] mt-[.5rem] p-[.5rem]';
        var hTitulo = document.createElement('h2');
        hTitulo.className = "text-center text-[25px]";
        hTitulo.innerHTML = resp;
        var pTitulo = document.createElement('p');
        pTitulo.className = "text-center text-[25px]";
        pTitulo.innerHTML = fichajes_dia + " <?php echo date('d-m-Y'); ?>";
        divElement.appendChild(hTitulo);
        divElement.appendChild(pTitulo);
        var array_js = JSON.parse(total);
        for (var i = 0; i < array_js.length; i++) {
            var fecha = array_js[i].FECHA;
            var nombreTipo = array_js[i].NOMBRE_TIPO;
            var nombreIncidencia = array_js[i].NOMBRE_INCIDENCIA;
            var p = document.createElement('p');
            p.innerHTML = nombreTipo + " " + nombreIncidencia;
            if (nombreTipo == "Salida") {
                p.className = 'text-center mb-5 text-[#E05260]';
            } else {
                p.className = 'text-center mb-5 text-[#2BD47D]';
            }
            var p2 = document.createElement('p');
            p2.innerHTML = " " + fecha;
            p2.className = 'text-center mb-5';
            var divFichajes = document.createElement('div');
            divFichajes.className = 'flex justify-between';
            divFichajes.appendChild(p);
            divFichajes.appendChild(p2);
            fichajes.appendChild(divFichajes);
        }
        divElement.appendChild(fichajes);
        divElement.appendChild(divButtons);

        return divElement;
    } else {
        var divElement = document.createElement('div');
        divElement.className = '!py-5 ';
        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = salir.toUpperCase();
        cancelButton.id = 'botonPrimario';
        cancelButton.className = '!text-[#333333] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#FFFFFF] !bg-[#D9D9D9] cursor-pointer buttonModal';
        cancelButton.onclick = function () {
            hideDialog();
        };

        //var pElement = document.createElement('p');
        //pElement.innerHTML = "Ha realizado un Fichaje";
        //pElement.className = 'text-center mb-5 text-[25px]';
        var divIcon = document.createElement('div');
        divIcon.className = 'w-full flex justify-center text-[#06B6D4] text-[70px]';
        divIcon.innerHTML = '<i class="bx bx-error-circle" ></i>';
        var divButtons = document.createElement('div');
        divButtons.className = 'w-full flex justify-around mt-1';
        divButtons.appendChild(cancelButton);
        divElement.appendChild(divIcon);
        //divElement.appendChild(pElement);
        var pTitulo = document.createElement('p');
        pTitulo.className = "text-center text-[25px]";
        pTitulo.innerHTML = resp;
        divElement.appendChild(pTitulo);
        divElement.appendChild(divButtons);

        return divElement;
    }
}


function selectorFichaje(selector, sentido) {
    const elemento = document.querySelector(selector);
    if (elemento.value != "" || elemento.value != null) {
        const valorSeleccionado = elemento.value + sentido;
        // Validar si el elemento existe
        if (elemento) {
            fichajeManual(5, 37, valorSeleccionado, null)
        }
    }
}

// Agregar un evento al botón para llamar a la función al hacer clic
const entradaBoton = document.getElementById('entrada_boton');
if (entradaBoton) {
    entradaBoton.addEventListener('click', function (e) {
        e.preventDefault();
        // Llamada a la función con el selector
    });
}

const salidaBoton = document.getElementById('salida_boton');
if (salidaBoton) {
    salidaBoton.addEventListener('click', function (e) {
        e.preventDefault();
        // Llamada a la función con el selector
    });
}

// Agregar evento para detectar cambios en el selector
const selectorIncidencias = document.getElementById('selectorIncidencias');
if (selectorIncidencias) {
    selectorIncidencias.addEventListener('change', actualizarBotones);
}

// Inicializar el estado de los botones al cargar la página
//actualizarBotones();

function actualizarBotones() {
    const selector = document.getElementById('selectorIncidencias');
    const selectedOption = selector.options[selector.selectedIndex];
    // Capturar el valor del atributo data-texto-alternativo-entrada
    const textoAlternativoEntrada = selectedOption.getAttribute('data-texto-alternativo-entrada');
    const textoAlternativoSalida = selectedOption.getAttribute('data-texto-alternativo-salida');
    const ocultaEntrada = selectedOption.getAttribute('data-oculta-entrada');
    const ocultaSalida = selectedOption.getAttribute('data-oculta-salida');
    const entrada = document.getElementById('entrada_boton');
    var textoOriginalEntrada = selectedOption.getAttribute('data-texto-original-entrada');
    const salida = document.getElementById('salida_boton');
    var textoOriginalSalida = selectedOption.getAttribute('data-texto-original-salida');

    // Obtener el valor seleccionado
    const valorSeleccionado = selector.value;
    // Verificar si el valor termina en _1 o _2
    if (valorSeleccionado != "") {
        if (ocultaEntrada) {
            entrada.disabled = false; // DesHabilitar botón Entrada
            entrada.className = "flex justify-center items-center text-center !w-[50%] md:w-auto px-[20px] py-[20px] rounded-full h-[30px] !border !border-solid !border-[#4753674D] hover:bg-white text-sm font-medium bg-[#F5F6F8] hover:!text-[#475367] !text-[#475367]";
            entrada.onclick = function (e) {
                e.preventDefault();
                showDialog(boton_fichaje_deshabilitado);
            };
        } else {
            entrada.disabled = false; // Habilitar botón Entrada
            entrada.className = "cursor-pointer flex justify-center items-center text-center !w-[50%] md:w-auto px-[20px] py-[20px] rounded-full h-[30px] !border !border-solid !border-[#64BE58] hover:bg-white  text-sm  font-medium hover:!text-[#64BE58] bg-[#64BE58] !text-[#FFFFFF]";
        }
        if (textoAlternativoEntrada != "") {
            entrada.innerHTML = textoAlternativoEntrada;
        } else {
            entrada.innerHTML = textoOriginalEntrada;
        }
        if (ocultaSalida) {
            salida.disabled = true;  // DesHabilitar botón Salida
            salida.className = "flex justify-center items-center text-center !w-[50%] md:w-auto px-[20px] py-[20px] rounded-full h-[30px] !border !border-solid !border-[#4753674D] hover:bg-white text-sm font-medium bg-[#F5F6F8] hover:!text-[#475367] !text-[#475367]";
            salida.onclick = function (e) {
                e.preventDefault();
                showDialog(boton_fichaje_deshabilitado);
            };
        } else {
            salida.disabled = false;  // Habilitar botón Salida
            salida.className = "cursor-pointer flex justify-center items-center text-center !w-[50%] md:w-auto px-[20px] py-[20px] rounded-full h-[30px] !border !border-solid !border-[#EF703A] hover:bg-white text-sm font-medium bg-[#EF703A] hover:!text-[#EF703A] !text-[#FFFFFF]";
        }
        if (textoAlternativoSalida != "") {
            salida.innerHTML = textoAlternativoSalida;
        } else {
            salida.innerHTML = textoOriginalSalida;
        }
        entrada.style.display = "flex";
        salida.style.display = "flex";
    } else {
        entrada.disabled = true; // Deshabilitar botón Entrada si no hay selección
        entrada.innerHTML = textoOriginalEntrada;
        entrada.style.display = "none";
        entrada.className = "flex justify-center items-center text-center !w-[50%] md:w-auto px-[20px] py-[20px] rounded-full h-[30px] !border !border-solid !border-[#4753674D] hover:bg-white text-sm font-medium bg-[#F5F6F8] hover:!text-[#475367] !text-[#475367]";
        salida.disabled = true;   // Deshabilitar botón Salida si no hay selección
        salida.innerHTML = textoOriginalSalida;
        salida.style.display = "none";
        salida.className = "flex justify-center items-center text-center !w-[50%] md:w-auto px-[20px] py-[20px] rounded-full h-[30px] !border !border-solid !border-[#4753674D] hover:bg-white text-sm font-medium bg-[#F5F6F8] hover:!text-[#475367] !text-[#475367]";
    }
}

function listaFichajesQuick(resp, flag = 0) {
    // Llamar a la función totalFichajes y pasar una función de devolución de llamada
    totalFichajes(function (total) {
        var caja = document.getElementById('openModal');
        setTimeout(() => {
            if (caja != null) {
                console.log(total);
                caja.appendChild(genContenidoComfirmIndexQuick(total, resp, flag));
                caja.style.opacity = 1;
                caja.style.pointerEvents = "auto";
            } else {
                console.log("no es null")
            }
        }, 500);
    });
}

function genContenidoComfirmIndexQuick(total, resp, flag, widget = "") {
    if (flag === 1) {
        var widget = document.getElementById('widget_fichaje_web');
        var divElement = document.createElement('div');
        divElement.className = '!py-5 ';
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = 'X';
        anchorElement.title = 'Close';
        anchorElement.className = 'close';
        anchorElement.onclick = function () {
            hideDialog();
        };

        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = salir.toUpperCase();
        cancelButton.id = 'botonSecundario';
        cancelButton.className = '!text-[#333333] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#FFFFFF] !bg-[#D9D9D9] cursor-pointer buttonModal';
        cancelButton.onclick = function () {
            hideDialog();
            esperaRespuesta(true);
            logoutQuick();
        };

        var divIcon = document.createElement('div');
        divIcon.className = 'w-full flex justify-center text-[#06B6D4] text-[70px]';
        divIcon.innerHTML = '<i class="bx bx-error-circle" ></i>';
        var divButtons = document.createElement('div');
        divButtons.className = 'w-full flex justify-around mt-1';
        if (!widget) {
            divButtons.appendChild(cancelButton);
            setTimeout(function () {
                cancelButton.click();
            }, 5000);
        }
        divElement.appendChild(divIcon);
        var fichajes = document.createElement('div');
        fichajes.className = 'overflow-x-hidden overflow-y-auto min-h-auto max-h-[20vh] mt-[.5rem] p-[.5rem]';
        var hTitulo = document.createElement('h2');
        hTitulo.className = "text-center text-[25px]";
        hTitulo.innerHTML = resp;
        var pTitulo = document.createElement('p');
        pTitulo.className = "text-center text-[25px]";
        pTitulo.innerHTML = fichajes_dia + " <?php echo date('d-m-Y'); ?>";
        divElement.appendChild(hTitulo);
        //   divElement.appendChild(pTitulo);
        var array_js = JSON.parse(total);
        for (var i = 0; i < array_js.length; i++) {
            var fecha = array_js[i].FECHA;
            var nombreTipo = array_js[i].NOMBRE_TIPO;
            var nombreIncidencia = array_js[i].NOMBRE_INCIDENCIA;
            var p = document.createElement('p');
            p.innerHTML = nombreTipo + " " + nombreIncidencia;
            if (nombreTipo == "Salida") {
                p.className = 'text-center mb-5 text-[#E05260]';
            } else {
                p.className = 'text-center mb-5 text-[#2BD47D]';
            }
            var p2 = document.createElement('p');
            p2.innerHTML = " " + fecha;
            p2.className = 'text-center mb-5';
            var divFichajes = document.createElement('div');
            divFichajes.className = 'flex justify-between';
            divFichajes.appendChild(p);
            divFichajes.appendChild(p2);
            fichajes.appendChild(divFichajes);
        }
        // divElement.appendChild(fichajes);
        divElement.appendChild(divButtons);

        return divElement;
    } else {
        var divElement = document.createElement('div');
        divElement.className = '!py-5 ';
        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = salir.toUpperCase();
        cancelButton.id = 'botonPrimario';
        cancelButton.className = '!text-[#333333] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#FFFFFF] !bg-[#D9D9D9] cursor-pointer buttonModal';
        cancelButton.onclick = function () {
            hideDialog();
        };

        var divIcon = document.createElement('div');
        divIcon.className = 'w-full flex justify-center text-[#06B6D4] text-[70px]';
        divIcon.innerHTML = '<i class="bx bx-error-circle" ></i>';
        var divButtons = document.createElement('div');
        divButtons.className = 'w-full flex justify-around mt-1';
        divButtons.appendChild(cancelButton);
        divElement.appendChild(divIcon);
        //divElement.appendChild(pElement);
        var pTitulo = document.createElement('p');
        pTitulo.className = "text-center text-[25px]";
        pTitulo.innerHTML = resp;
        divElement.appendChild(pTitulo);
        divElement.appendChild(divButtons);

        return divElement;
    }
}

function selectorFichajeQuick(selector, sentido) {
    const elemento = document.querySelector(selector);
    if (elemento.value != "" || elemento.value != null) {
        const valorSeleccionado = elemento.value + sentido;
        // Validar si el elemento existe
        if (elemento) {
            fichajeManualQuick(5, 37, valorSeleccionado, null)
        }
    }
}

