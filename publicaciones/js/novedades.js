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
    divContenido.className = 'divContenido zzInicializar zzCentradoVertical';
    divContenidoHijo.innerHTML = contenido_actualizaciones[posicion_actual]['contenido'];        
    divContenido.appendChild(divContenidoHijo);        
    
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("id", "checkboxActualizaciones");
    check.setAttribute("name", "checkboxActualizaciones");
    check.className = 'checkboxActualizaciones';
    check.checked = false;
    
    var span = document.createElement("span");
    span.className = 'spanActualizaciones';
    span.innerHTML = " No volver a mostrar";
    
    var lab = document.createElement("label");
    lab.setAttribute("for", "checkboxActualizaciones");
    lab.className = 'labelActualizaciones';
    lab.appendChild(check);
    lab.appendChild(span);
    
    var siguienteElement = document.createElement('a');
    siguienteElement.innerHTML = '>';
    siguienteElement.title = 'Siguiente';
    siguienteElement.className = 'siguiente';
    siguienteElement.onclick = function(){
    siguienteElement.onclick = actualizacionSiguiente();
    };

    var button = document.createElement('button');
    button.innerHTML = 'Aceptar';
    button.className = 'buttonmodalActualizaciones';
    button.onclick = function(){
            if(check.checked == false){
                button.onclick = guardaActualizacionesLeidas(false);
            }else{
                button.onclick = guardaActualizacionesLeidas(true);
            }
    };
    
    var divElement = document.createElement('div');
    divElement.className = 'divActualizaciones';
    if(contenido.length > 1){
        divElement.appendChild(siguienteElement);
    }
    divElement.appendChild(divContenido);
    divElement.appendChild(lab);
    divElement.appendChild(button);

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


/*
 * Muestra la siguiente actualizacion
 * */
function actualizacionSiguiente(){
    var divContenido = document.createElement('div');
    var divContenidoHijo = document.createElement('div');
    divContenido.className = 'divContenido zzInicializar zzCentradoVertical';
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
    check.className = 'checkboxActualizaciones';
    check.checked = false;
    
    var span = document.createElement("span");
    span.className = 'spanActualizaciones';
    span.innerHTML = " No volver a mostrar";
    
    var lab = document.createElement("label");
    lab.setAttribute("for", "checkboxActualizaciones");
    lab.className = 'labelActualizaciones';
    lab.appendChild(check);
    lab.appendChild(span);
    
    var anteriorElement = document.createElement('a');
    anteriorElement.innerHTML = '<';
    anteriorElement.title = 'Anterior';
    anteriorElement.className = 'anterior';
    anteriorElement.onclick = function(){
        anteriorElement.onclick = actualizacionAnterior();
    };
    
    var siguienteElement = document.createElement('a');
    siguienteElement.innerHTML = '>';
    siguienteElement.title = 'Siguiente';
    siguienteElement.className = 'siguiente';
    siguienteElement.onclick = function(){
        siguienteElement.onclick = actualizacionSiguiente();
    };

    var button = document.createElement('button');
    button.innerHTML = 'Aceptar';
    button.className = 'buttonmodalActualizaciones';
    button.onclick = function(){
        if(check.checked == false){
            button.onclick = guardaActualizacionesLeidas(false);
        }else{
            button.onclick = guardaActualizacionesLeidas(true);
        }
    };
    
    var divElement = document.createElement('div');
    divElement.className = 'divActualizaciones';
    divElement.appendChild(anteriorElement);
    if(posicion_actual < contenido_actualizaciones.length - 1){
        divElement.appendChild(siguienteElement);
    }
    divElement.appendChild(divContenido);
    divElement.appendChild(lab);
    divElement.appendChild(button);

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
    divContenido.className = 'divContenido zzInicializar zzCentradoVertical';
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
    check.className = 'checkboxActualizaciones';
    check.checked = false;
    
    var span = document.createElement("span");
    span.className = 'spanActualizaciones';
    span.innerHTML = " No volver a mostrar";
    
    var lab = document.createElement("label");
    lab.setAttribute("for", "checkboxActualizaciones");
    lab.className = 'labelActualizaciones';
    lab.appendChild(check);
    lab.appendChild(span);
    
    var anteriorElement = document.createElement('a');
    anteriorElement.innerHTML = '<';
    anteriorElement.title = 'Anterior';
    anteriorElement.className = 'anterior';
    anteriorElement.onclick = function(){
        anteriorElement.onclick = actualizacionAnterior();
    };
    
    var siguienteElement = document.createElement('a');
    siguienteElement.innerHTML = '>';
    siguienteElement.title = 'Siguiente';
    siguienteElement.className = 'siguiente';
    siguienteElement.onclick = function(){
        siguienteElement.onclick = actualizacionSiguiente();
    };

    var button = document.createElement('button');
    button.innerHTML = 'Aceptar';
    button.className = 'buttonmodalActualizaciones';
    button.onclick = function(){
        if(check.checked == false){
            button.onclick = guardaActualizacionesLeidas(false);
        }else{
            button.onclick = guardaActualizacionesLeidas(true);
        }
    };
    
    var divElement = document.createElement('div');
    divElement.className = 'divActualizaciones';
    if(posicion_actual > 0){
    divElement.appendChild(anteriorElement);
    }
    divElement.appendChild(siguienteElement);
    divElement.appendChild(divContenido);
    divElement.appendChild(lab);
    divElement.appendChild(button);

    var caja = document.getElementById('openModal');
    if(caja != null){
        hideDialog();
        caja.appendChild(divElement);
        caja.style.opacity = 1;
        caja.style.pointerEvents = "auto";
    }
}