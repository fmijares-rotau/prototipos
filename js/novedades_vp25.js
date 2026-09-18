/**
 * Funcion muestra un dialogo para mostrar las actualizaciones
 *
 */
function showDialogActualizaciones(contenido){
    var divElement = document.createElement('div');
    contenido_actualizaciones = contenido;
    posicion_actual = 0;
    
    var divContenido = document.createElement('div');
    var divContenidoHijo = document.createElement('div');
    divContenidoHijo.className = 'flex items-center justify-center flex-col';
    divContenido.className = 'divContenido zzInicializar zzCentradoVertical ';
    divContenidoHijo.innerHTML = contenido_actualizaciones[posicion_actual]['contenido'];        
    divContenido.appendChild(divContenidoHijo);        
    
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("id", "checkboxActualizaciones");
    check.setAttribute("name", "checkboxActualizaciones");
    var divSwitch = document.createElement("div");
    var checkSwitch = document.createElement("label");
    checkSwitch.className = 'switch ml-3';
    var sliderCheck = document.createElement("span");
    sliderCheck.className = 'slider round';
    //check.className = 'checkboxActualizaciones';
    check.checked = false;
    
    var span = document.createElement("span");
    span.className = 'spanActualizaciones';
    span.innerHTML = " No volver a mostrar";
    
    var lab = document.createElement("label");
    lab.setAttribute("for", "checkboxActualizaciones");
    //lab.className = 'labelActualizaciones';
    checkSwitch.appendChild(check);
    checkSwitch.appendChild(sliderCheck);
    lab.appendChild(span);
    divSwitch.appendChild(lab);
    divSwitch.appendChild(checkSwitch)
    
    var siguienteElement = document.createElement('a');
    siguienteElement.innerHTML = '<i class="bx bxs-chevron-right"></i>';
    siguienteElement.title = 'Siguiente';
    siguienteElement.className = 'siguiente flex items-center justify-center nextStep cursor-pointer';
    siguienteElement.onclick = function(){
    siguienteElement.onclick = actualizacionSiguiente();
    };

    var button = document.createElement('button');
    button.id = 'botonPrincipal';
    button.className = '!text-[#2C2554] hover:!text-[#FFFFFF] !text-sm !py-2.5 border border-solid border-[#2C2554] !rounded-full !px-5  hover:!bg-[#2C2554] !bg-[#FFFFFF] cursor-pointer buttonModal';
    button.innerHTML = 'Aceptar';
    //button.className = 'buttonmodalActualizaciones';
    button.onclick = function(){
            if(check.checked == false){
                button.onclick = guardaActualizacionesLeidas(false);
            }else{
                button.onclick = guardaActualizacionesLeidas(true);
            }
    };
    
    var divElement = document.createElement('div');
    divElement.className = 'modal-content novedadesBody';
    if(contenido.length > 1){
        divElement.appendChild(siguienteElement);
    }
    divElement.appendChild(divContenido);
    var divButtons = document.createElement('div');
    divButtons.className = 'w-[calc(100%-60px)] flex items-center justify-around !bg-[#FFFFFF] !rounded-full py-[5px] mx-[auto] mb-0 mt-2';
    divButtons.appendChild(divSwitch);
    divButtons.appendChild(button);
    divElement.appendChild(divButtons);

    var caja = document.getElementById('openModal');
    if(caja != null){
        hideDialog();
        caja.appendChild(divElement);
        caja.style.opacity = 1;
        caja.style.pointerEvents = "auto";
    }
}

/**
 * Funcion que guarda las actualizaciones mostradas
 *
 */
function guardaActualizacionesLeidas(noMostrar){    
    if(noMostrar == true){
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/save_actualizaciones_leidas.php";
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    hideDialog();
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send();
        esperaRespuesta(true);
    }else{
        hideDialog();
    }
}


/**
 * Muestra la siguiente actualizacion
 * */
function actualizacionSiguiente(){
    var divContenido = document.createElement('div');
    var divContenidoHijo = document.createElement('div');
    divContenidoHijo.className = 'flex items-center justify-center flex-col';
    divContenido.className = 'divContenido zzInicializar zzCentradoVertical ';
    posicion_actual++;
    if(posicion_actual > contenido_actualizaciones.length - 1){
        posicion_actual = contenido_actualizaciones.length - 1;
        divContenidoHijo.innerHTML = contenido_actualizaciones[posicion_actual]['contenido'];        
        divContenido.appendChild(divContenidoHijo);
    }else{
        divContenidoHijo.innerHTML = contenido_actualizaciones[posicion_actual]['contenido'];        
        divContenido.appendChild(divContenidoHijo);
    }
    
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("id", "checkboxActualizaciones");
    check.setAttribute("name", "checkboxActualizaciones");
    var divSwitch = document.createElement("div");
    var checkSwitch = document.createElement("label");
    checkSwitch.className = 'switch ml-3';
    var sliderCheck = document.createElement("span");
    sliderCheck.className = 'slider round';
    //check.className = 'checkboxActualizaciones';
    //check.className = 'checkboxActualizaciones';
    check.checked = false;
    
    var span = document.createElement("span");
    span.className = 'spanActualizaciones';
    span.innerHTML = " No volver a mostrar";
    
    var lab = document.createElement("label");
    lab.setAttribute("for", "checkboxActualizaciones");
    //lab.className = 'labelActualizaciones';
    checkSwitch.appendChild(check);
    checkSwitch.appendChild(sliderCheck);
    lab.appendChild(span);
    divSwitch.appendChild(lab);
    divSwitch.appendChild(checkSwitch)
    
    var anteriorElement = document.createElement('button');
    anteriorElement.innerHTML = '<i class="bx bxs-chevron-left"></i>';
    anteriorElement.title = 'Anterior';
    anteriorElement.className = 'anterior flex items-center justify-center prevStep cursor-pointer';
    anteriorElement.onclick = function(){
        anteriorElement.onclick = actualizacionAnterior();
    };
    
    var siguienteElement = document.createElement('button');
    siguienteElement.innerHTML = '<i class="bx bxs-chevron-right"></i>';
    siguienteElement.title = 'Siguiente';
    siguienteElement.className = 'siguiente flex items-center justify-center nextStep cursor-pointer';
    siguienteElement.onclick = function(){
        siguienteElement.onclick = actualizacionSiguiente();
    };

    var button = document.createElement('button');
    button.innerHTML = 'Aceptar';
    button.id = 'botonPrincipal';
    button.className = '!text-[#2C2554] hover:!text-[#FFFFFF] !text-sm !py-2.5 !px-5 !rounded-full border border-[#2C2554]  hover:!bg-[#2C2554] !bg-[#FFFFFF] cursor-pointer buttonModal';
    //button.className = 'buttonmodalActualizaciones';
    button.onclick = function(){
        if(check.checked == false){
            button.onclick = guardaActualizacionesLeidas(false);
        }else{
            button.onclick = guardaActualizacionesLeidas(true);
        }
    };
    
    var divElement = document.createElement('div');
    divElement.className = 'modal-content novedadesBody';
    divElement.appendChild(anteriorElement);
    if(posicion_actual < contenido_actualizaciones.length - 1){
        divElement.appendChild(siguienteElement);
    }
    divElement.appendChild(divContenido);
    var divButtons = document.createElement('div');
    divButtons.className = 'w-[calc(100%-60px)] flex items-center justify-around !bg-[#FFFFFF] !rounded-full py-[5px] mx-[auto] mb-0 mt-2';
    divButtons.appendChild(divSwitch);
    divButtons.appendChild(button);
    divElement.appendChild(divButtons);

    var caja = document.getElementById('openModal');
    if(caja != null){
        hideDialog();
        caja.appendChild(divElement);
        caja.style.opacity = 1;
        caja.style.pointerEvents = "auto";
    }
}

function actualizacionAnterior(){
    var divContenido = document.createElement('div');
    var divContenidoHijo = document.createElement('div');
    divContenidoHijo.className = 'flex items-center justify-center flex-col';
    divContenido.className = 'divContenido zzInicializar zzCentradoVertical ';
    posicion_actual--;
    if(posicion_actual < 0){
        posicion_actual = 0;
        divContenidoHijo.innerHTML = contenido_actualizaciones[posicion_actual]['contenido'];        
        divContenido.appendChild(divContenidoHijo);
    }else{
        divContenidoHijo.innerHTML = contenido_actualizaciones[posicion_actual]['contenido'];        
        divContenido.appendChild(divContenidoHijo);
    }
    
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("id", "checkboxActualizaciones");
    check.setAttribute("name", "checkboxActualizaciones");
    //check.className = 'checkboxActualizaciones';
    var divSwitch = document.createElement("div");
    var checkSwitch = document.createElement("label");
    checkSwitch.className = 'switch ml-3';
    var sliderCheck = document.createElement("span");
    sliderCheck.className = 'slider round';
    check.checked = false;
    
    var span = document.createElement("span");
    span.className = 'spanActualizaciones';
    span.innerHTML = " No volver a mostrar";
    
    var lab = document.createElement("label");
    lab.setAttribute("for", "checkboxActualizaciones");
    //lab.className = 'labelActualizaciones';
    checkSwitch.appendChild(check);
    checkSwitch.appendChild(sliderCheck);
    lab.appendChild(span);
    divSwitch.appendChild(lab);
    divSwitch.appendChild(checkSwitch)
    
    var anteriorElement = document.createElement('button');
    anteriorElement.innerHTML = '<i class="bx bxs-chevron-left"></i>';
    anteriorElement.title = 'Anterior';
    anteriorElement.className = 'anterior flex items-center justify-center prevStep cursor-pointer';
    anteriorElement.onclick = function(){
        anteriorElement.onclick = actualizacionAnterior();
    };
    
    var siguienteElement = document.createElement('button');
    siguienteElement.innerHTML = '<i class="bx bxs-chevron-right"></i>';
    siguienteElement.title = 'Siguiente';
    siguienteElement.className = 'siguiente flex items-center justify-center nextStep cursor-pointer';
    siguienteElement.onclick = function(){
        siguienteElement.onclick = actualizacionSiguiente();
    };

    var button = document.createElement('button');
    button.innerHTML = 'Aceptar';
    button.id = 'botonPrincipal';
    button.className = '!text-[#2C2554] hover:!text-[#FFFFFF] !text-sm !py-2.5 !px-5 !rounded-full border border-[#2C2554]  hover:!bg-[#2C2554] !bg-[#FFFFFF] cursor-pointer buttonModal';
    //button.className = 'buttonmodalActualizaciones';
    button.onclick = function(){
        if(check.checked == false){
            button.onclick = guardaActualizacionesLeidas(false);
        }else{
            button.onclick = guardaActualizacionesLeidas(true);
        }
    };
    
    var divElement = document.createElement('div');
    divElement.className = 'modal-content novedadesBody';
    if(posicion_actual > 0){
    divElement.appendChild(anteriorElement);
    }
    divElement.appendChild(siguienteElement);
    divElement.appendChild(divContenido);
    var divButtons = document.createElement('div');
    divButtons.className = 'w-[calc(100%-60px)] flex items-center justify-around !bg-[#FFFFFF] !rounded-full py-[5px] mx-[auto] mb-0 mt-2';
    divButtons.appendChild(divSwitch);
    divButtons.appendChild(button);
    divElement.appendChild(divButtons);

    var caja = document.getElementById('openModal');
    if(caja != null){
        hideDialog();
        caja.appendChild(divElement);
        caja.style.opacity = 1;
        caja.style.pointerEvents = "auto";
    }
}