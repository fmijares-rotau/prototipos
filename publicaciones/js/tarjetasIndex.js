var sortableContainer = document.getElementById('sortableContainer');
var numeroBucle = 1;
var claseSinDrag = ".filtered";
// Verifica si el widget onboarding existe
const element = document.getElementById('widgetOnboarding');

// Verifica si el widget prestmos existe
const prestamo = document.getElementById('widgetPrestamos');
// Verifica si el widget buzon existe
const buzon = document.getElementById('widget_buzon_alertas');

if (element) {
    if (prestamo && buzon) {
        numeroBucle = 4;
    } else {
        numeroBucle = prestamo || buzon ? 3 : 2;
    }
} else {
    if (prestamo && buzon) {
        numeroBucle = 3;
    } else {
        numeroBucle = prestamo || buzon ? 2 : 1;
    }
}
claseSinDrag = `.filtered:nth-child(-n+${numeroBucle})`;
resetOrden();


var sortable = Sortable.create(sortableContainer, {
    animation: 1100,
    filter: claseSinDrag,
    chosenClass: "chosen",
    ghostClass: "ghost",
    disabled: true,
    dragClass: "drag",
    onStart: () => {
        var widgets = document.querySelectorAll('.cardWidget');
        for (var i = numeroBucle; i < widgets.length; i++) {
            widgets[i].classList.remove('constant-tilt-shake');
        }
    },
    onEnd: function(event) {
        var widgets = document.querySelectorAll('.cardWidget');
        for (var i = numeroBucle; i < widgets.length; i++) {
            widgets[i].classList.add('constant-tilt-shake');
        }
        // Obtén el orden de los elementos después de finalizar el arrastre
        var order = Array.from(sortableContainer.children).map(function(element) { 
            return element.textContent;
        });
        // Obtener los elementos involucrados en el arrastre y el soltado
        const targetItem = event.to.children;
        let fila = 1;
        for (let i = 1; i < targetItem.length; i++) {
            if (i % 2 === 0) {
                if(fila % 2 === 0){
                    targetItem[i].classList.remove("cardsWidth1");
                    targetItem[i].classList.remove("cardsWidth2");
                    targetItem[i].classList.add("cardsWidth2");
                }else{
                    targetItem[i].classList.remove("cardsWidth1");
                    targetItem[i].classList.remove("cardsWidth2");
                    targetItem[i].classList.add("cardsWidth1");
                }
            } else {
                if(fila % 2 === 0){
                    targetItem[i].classList.remove("cardsWidth1");
                    targetItem[i].classList.remove("cardsWidth2");
                    targetItem[i].classList.add("cardsWidth1");
                }else{
                    targetItem[i].classList.remove("cardsWidth1");
                    targetItem[i].classList.remove("cardsWidth2");
                    targetItem[i].classList.add("cardsWidth2");
                }
            }
            if(i % 2 != 0){
                fila++;
            }
        }
        //Funcion para actualizar la lista de widget
        actualizarListaCard();
    },
    onMove(e) {
        return e.related.className.indexOf('filtered') === -1;          
    },
});

function resetOrden() {
    let fila = 1;
    var divs = document.querySelectorAll('.cardWidget');
    for (let i = 1; i < divs.length; i++) {
        if (i % 2 === 0) {
            if(fila % 2 === 0){
                divs[i].classList.remove("cardsWidth1");
                divs[i].classList.remove("cardsWidth2");
                divs[i].classList.add("cardsWidth2");
            }else{
                divs[i].classList.remove("cardsWidth1");
                divs[i].classList.remove("cardsWidth2");
                divs[i].classList.add("cardsWidth1");
            }
        } else {
            if(fila % 2 === 0){
                divs[i].classList.remove("cardsWidth1");
                divs[i].classList.remove("cardsWidth2");
                divs[i].classList.add("cardsWidth1");
            }else{
                divs[i].classList.remove("cardsWidth1");
                divs[i].classList.remove("cardsWidth2");
                divs[i].classList.add("cardsWidth2");
            }
        }
        if(i % 2 != 0){
            fila++;
        }
    }
}

// Obtén una referencia al botón
var toggleButton = document.getElementById('toggleButtonWidgets');

// Agrega un controlador de eventos al botón
toggleButton.addEventListener('click', function() {
    cerrarCabecera();
    toggleDragAndDrop();
}); 

function agregarDiv(vista){
    actualizarListaCard("agregar",vista)
    esperaRespuesta(true);
}

function eliminarCard(divId,titulo,icono){
    var caja = document.getElementById('openModal');
    if(caja != null){
        hideDialog();
        var divElement = document.createElement('div');
        divElement.className = '!px-5';
        var botonPrincipal = document.createElement('a');
        botonPrincipal.innerHTML = aceptar.toUpperCase();
        botonPrincipal.id = 'botonPrincipal';
        botonPrincipal.className = '!text-[#2C2554] hover:!text-[#FFFFFF] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#2C2554] !bg-[#FFFFFF] cursor-pointer buttonModal';
        botonPrincipal.onclick = function(){
            const divAEliminar = document.getElementById(divId);
            if (divAEliminar) {
              divAEliminar.parentNode.removeChild(divAEliminar);
              actualizarListaCard();
              var divContenedor = document.createElement("div");
              var spanText = document.createElement("span");
              var divIcon = document.createElement("div");
              var spanIcon = document.createElement("i");
              divContenedor.classList="flex justify-center items-center p-3 w-[25%] h-full text-center !m-0  cursor-pointer flex flex-col";
              divContenedor.onclick = function(){
                  agregarDiv(divId);
            } 
    
            divIcon.classList.add("cabeceraWidgetIcon");
            if(icono != "bx_bx-category-alt"){
                var iconoMenu = icono.replace(/_/g, ' ');
                // Dividir el string en un array de clases
                var arrayIcono = iconoMenu.split(' ');
                // Agregar cada clase al elemento
                arrayIcono.forEach(clase => {
                    spanIcon.classList.add(clase);
                });
                spanIcon.classList.add("text-[40px]");
                divIcon.append(spanIcon);
            }else{
                var iconImg = document.createElement("img");
                iconImg.alt = divId;
                iconImg.src = "../images/widgets/"+divId+".png";
                iconImg.classList.add("w-[75%]");
                divIcon.append(iconImg);
            }
            
            //spanIcon.classList.add(iconoNuevo);
            divContenedor.append(divIcon);
            spanText.append(titulo.replace(/_/g, " "));
            divContenedor.append(spanText);
            if(document.getElementById('widgetNoDisponible') != null){
                document.getElementById('widgetNoDisponible').classList.add("hidden");
            }
              document.getElementById("widgetDisponibles").append(divContenedor)
            }
            resetOrden();
            hideDialog();
        };
        var botonSecundario = document.createElement('a');
        botonSecundario.innerHTML = cancela.toUpperCase();
        botonSecundario.id = 'botonSecundario';
        botonSecundario.className = '!text-[#333333] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#FFFFFF] !bg-[#D9D9D9] cursor-pointer buttonModal';
        botonSecundario.onclick = function(){
            hideDialog();
        };
        var h2Element = document.createElement('h2');
        h2Element.className="text-[20px]";
        if(eliminarWidget != null && eliminarWidget != ""){
            h2Element.innerHTML = eliminarWidget;
        }else{
            h2Element.innerHTML = aviso;
        }
        var divContent = document.createElement('div');
        divContent.className = 'w-full flex justify-center mb-5 flex-col text-center';
        var divIcon = document.createElement('div');
        divIcon.className = 'w-full flex justify-center text-[#F59E0B] text-[70px]';
        divIcon.innerHTML = '<i class="bx bx-error"></i>';
    
        var divButtons = document.createElement('div');
        divButtons.className = 'w-full flex justify-around';
        divButtons.appendChild(botonPrincipal);
        divButtons.appendChild(botonSecundario);
        divElement.appendChild(divIcon);
        divContent.appendChild(h2Element);
        divElement.appendChild(divContent);
        divElement.appendChild(divButtons);
        caja.appendChild(divElement);
        caja.style.opacity = 1;
        caja.style.pointerEvents = "auto";
    }
}

 //Funcion para actualizar la lista de widget
function actualizarListaCard(tipo = "", widget = ""){
    var divs = document.querySelectorAll('.cardWidget');
    var json = {};
    var fila = 1;
    if(widget != ""){
        json[widget] = {
            "orden": "1",
            "widget": widget,
            "ancho": "cardsWidth2"
            };
            fila++;
    }
    for (var i = 1; i < divs.length; i++) {
        var div = divs[i];
        var id = div.id;
    
        // Omitir el div con ID 'widgetOnboarding'
        if (id === 'widgetOnboarding' || id === 'widgetPrestamos') {
            continue; // Salta a la siguiente iteración del bucle
        }
    
        div.setAttribute('data-orden', i);
        
        if (tipo === "agregar") {
            if (i % 2 === 0) {
                if (fila % 2 === 0) {
                    json[id] = {
                        "orden": i,
                        "widget": div.id,
                        "ancho": "cardsWidth2"
                    };
                } else {
                    json[id] = {
                        "orden": i,
                        "widget": div.id,
                        "ancho": "cardsWidth1"
                    };
                }
            } else {
                if (fila % 2 === 0) {
                    json[id] = {
                        "orden": i,
                        "widget": div.id,
                        "ancho": "cardsWidth2"
                    };
                } else {
                    json[id] = {
                        "orden": i,
                        "widget": div.id,
                        "ancho": "cardsWidth1"
                    };
                }
            }
        } else {
            if (i % 2 === 0) {
                if (fila % 2 === 0) {
                    json[id] = {
                        "orden": i,
                        "widget": div.id,
                        "ancho": "cardsWidth2"
                    };
                } else {
                    json[id] = {
                        "orden": i,
                        "widget": div.id,
                        "ancho": "cardsWidth1"
                    };
                }
            } else {
                if (fila % 2 === 0) {
                    json[id] = {
                        "orden": i,
                        "widget": div.id,
                        "ancho": "cardsWidth1"
                    };
                } else {
                    json[id] = {
                        "orden": i,
                        "widget": div.id,
                        "ancho": "cardsWidth2"
                    };
                }
            }
        }
    
        if (i % 2 != 0) {
            fila++;
        }
    }

    // Convertir el JSON a una cadena
    var jsonString = JSON.stringify(json);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../common/actualizar_widgets.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
        if(xhr.responseText == "listo" && widget != ""){
            // Se agrega LocalStorage 
            localStorage.setItem('recargada', 'true');
            location.reload(true);
        }else if(xhr.responseText == "error"){
            showDialog(agregarWidget);
        }
        }
    };
    xhr.send(JSON.stringify(jsonString));

}

function cerrarCabecera(){
    var cabeceraWidget = document.getElementById('cabeceraWidget');
    cabeceraWidget.classList.toggle('hidden');
}

function toggleDragAndDrop(){
        // Cambia el estado de la opción 'disabled' de Sortable.js
        sortable.option("disabled", !sortable.option("disabled"));
        if(sortable.option("disabled")){
            var widgets = document.querySelectorAll('.cardWidget');
            var button = document.querySelectorAll('.corner-button');
            for (var i = numeroBucle; i < widgets.length; i++) {
                widgets[i].classList.remove('constant-tilt-shake');
                //document.getElementById("btnTarjetaIndex").classList.add('hidden');
            }
            for (var i = 0; i < button.length; i++) {
                button[i].classList.add('hidden');
            }
        }else{
            var widgets = document.querySelectorAll('.cardWidget');
            var button = document.querySelectorAll('.corner-button');
            for (var i = numeroBucle; i < widgets.length; i++) {
                widgets[i].classList.add('constant-tilt-shake');
                //document.getElementById("btnTarjetaIndex").classList.remove('hidden');
            }
            for (var i = 0; i < button.length; i++) {
                button[i].classList.remove('hidden');
            }
        }
}

function eliminarLocalStorageWidget(){
    if (localStorage.getItem('recargada')) {
        // Limpia el almacenamiento local
        localStorage.removeItem('recargada');
    }
}

function filtrarEstatus(contenedorId, selectedValue) {
    const divs = document.querySelectorAll(`#${contenedorId} .pendiente, #${contenedorId} .aprobado, #${contenedorId} .rechazado`);
    const mensajeSinDatos = document.querySelector(`#${contenedorId} .sin-datos`); // Buscamos el mensaje "Sin datos"

    // Mostrar todos los divs inicialmente
    divs.forEach(div => div.style.display = 'flex');
    
    // Ocultar el mensaje "Sin datos" si los elementos son visibles
    if (mensajeSinDatos) {
        mensajeSinDatos.style.display = 'none';
    }

    switch (selectedValue) {
        case '1':
            document.querySelectorAll(`#${contenedorId} .aprobado`).forEach(div => div.style.display = 'none');
            document.querySelectorAll(`#${contenedorId} .rechazado`).forEach(div => div.style.display = 'none');
            break;
        case '2':
            document.querySelectorAll(`#${contenedorId} .pendiente`).forEach(div => div.style.display = 'none');
            document.querySelectorAll(`#${contenedorId} .rechazado`).forEach(div => div.style.display = 'none');
            break;
        case '3':
            document.querySelectorAll(`#${contenedorId} .pendiente`).forEach(div => div.style.display = 'none');
            document.querySelectorAll(`#${contenedorId} .aprobado`).forEach(div => div.style.display = 'none');
            break;
        case 'mostrar':
            // No hacer nada, ya están visibles
            break;
    }

    // Verificamos si todos los elementos están ocultos
    const visibleDivs = Array.from(divs).some(div => div.style.display !== 'none');
    
    // Si no hay elementos visibles, mostramos el mensaje "Sin datos"
    if (!visibleDivs && mensajeSinDatos) {
        mensajeSinDatos.style.display = 'flex';
    }
}