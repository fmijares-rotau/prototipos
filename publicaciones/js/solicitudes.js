/**
 *  Funciones utilizadas por los menus de solicitudes
 */

/**
 * Funcion cambia el estado de un justificante
 *
 */
function cambiaEstado(menu_opcion,submenu_opcion,idJustificante,estado,accion){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idJustificante);
    formData.append('estado',estado);
    
    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_justificante.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        if(accion == accionLista){
                            irAContenido(menu_activo,menu_opcion,submenu_opcion);
                        }else if(accion == accionVista){
                            verElemento(menu_opcion,submenu_opcion,idJustificante);
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de Permiso
 *
 */
function cambiaSolicitud(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);
    
    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }


    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que Cambia de Estado multiples solicitudes
 *
 */
function cambiaSolicitudMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);

        var url = "";
        var ajax = objetoAjax();;
        url = "../common/set_estado_solicitud_multiple.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);

                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){

                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

        //limpiarFiltros(menu_opcion,submenu_opcion,accionLista,null);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que Cambia de Estado multiples solicitudes cambio horario viaje
 *
 */
function cambiaSolicitudCambioHorarioViajeMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);

        var url = "";
        var ajax = objetoAjax();;
        url = "../common/set_estado_solicitud_cambio_horario_viaje_multiple.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);
                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){

                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

        //limpiarFiltros(menu_opcion,submenu_opcion,accionLista,null);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que Cambia de Estado multiples solicitudes cambio horario 
 *
 */
function cambiaSolicitudCambioHorarioMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);

        var url = "";
        var ajax = objetoAjax();;
        url = "../common/set_estado_solicitud_cambio_horario_multiple.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);
                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){

                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

        //limpiarFiltros(menu_opcion,submenu_opcion,accionLista,null);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que Cambia de Estado multiples solicitudes cambio horario Guardia
 *
 */
function cambiaSolicitudCambioHorarioGuardiaMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);

        var url = "";
        var ajax = objetoAjax();;
        url = "../common/set_estado_solicitud_cambio_horario_guardia_multiple.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);
                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){

                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

        //limpiarFiltros(menu_opcion,submenu_opcion,accionLista,null);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion acepta una solicitud de permiso
 *
 */
function aceptaSolicitud(menu_opcion,submenu_opcion,idSolicitud,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',filtroEstadoAceptado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();
    url = "../common/set_estado_solicitud.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accionVista,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion acepta una solicitud de permiso
 *
 */
function rechazaSolicitud(menu_opcion,submenu_opcion,idSolicitud,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',filtroEstadoRechazado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accionVista,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion acepta una solicitud de permiso
 *
 */
function aceptaCancelar(menu_opcion,submenu_opcion,idSolicitud,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',filtroEstadoCancelado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accionVista,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion acepta una solicitud de permiso
 *
 */
function rechazaCancelar(menu_opcion,submenu_opcion,idSolicitud,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',filtroEstadoCancelacionRechazada);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accionVista,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de horas
 *
 */
function cambiaSolicitudHoras(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_horas.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de horas
 *
 */
function cambiaSolicitudHorasPeriodicas(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_horas_periodicas.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de cambio de horario
 *
 */
function cambiaSolicitudCambioHorario(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();
    url = "../common/set_estado_solicitud_cambio_horario.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de cambio de horario viaje
 *
 */
function cambiaSolicitudCambioHorarioViaje(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();
    url = "../common/set_estado_solicitud_cambio_horario_viaje.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de cambio de horario guardia
 *
 */
function cambiaSolicitudCambioHorarioGuardia(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();
    url = "../common/set_estado_solicitud_cambio_horario_guardia.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de horas
 *
 */
function cambiaSolicitudHorasExtras(menu_opcion,submenu_opcion,idSolicitud,accion){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_horas_extras.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.id_notificaciones != null){
                            enviaNotificacionTabla(menu_opcion,submenu_opcion,jsonData.id_notificaciones,accionLista);
                        }else if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que Cambia de Estado multiples solicitudes de fichaje
 *
 */
function cambiaSolicitudHorasExtrasMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);
        
        var url = "";
        var ajax = objetoAjax();
        url = "../common/set_estado_solicitud_horas_extras_multiple.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);

                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){

                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

    }else{
        showDialog(invalidOption);
    }
}


/**
 * Funcion cambia el estado de una solicitud de horas
 *
 */
function cambiaSolicitudSemanalesBolsa(menu_opcion,submenu_opcion,idSolicitud,estado,accion){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }
    var textObservacionesResp = document.getElementById("observaciones_responsable");
    if(textObservacionesResp != null){
        formData.append('observaciones_responsable',textObservacionesResp.value);
    }
    var textTiempohora = document.getElementById("numero_horas");
    if(textTiempohora != null){
        formData.append('numero_horas',textTiempohora.value);
    }
    var textTiempominutos = document.getElementById("numero_minutos");
    if(textTiempominutos != null){
        formData.append('numero_minutos',textTiempominutos.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_semanales_bolsa.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que Cambia de Estado multiples de las solicitudes de las Horas
 * 
 */
function cambiaSolicitudSemanalesBolsaMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);
        
        var url = "";
        var ajax = objetoAjax();
        url = "../common/set_estado_solicitud_semanales_multiple.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);
                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){
                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
        //limpiarFiltros(menu_opcion,submenu_opcion,accionLista,null);
    }else{
        showDialog(invalidOption);
    }
}
/**
 * Funcion cambia el estado de una solicitud de horas
 *
 */
function cambiaSolicitudJornadaIrregular(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_jornada_irregular.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de horas
 *
 */
function cambiaSolicitudFichajes(menu_opcion,submenu_opcion,idSolicitud,accion){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }
    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_fichajes.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);
                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.id_notificaciones != null){
                            enviaNotificacionTabla(menu_opcion,submenu_opcion,jsonData.id_notificaciones,accionLista);
                        }else if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            //enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de horas
 *
 */
function cambiaSolicitudParesFichajes(menu_opcion,submenu_opcion,idSolicitud,accion){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }
    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_pares_fichajes.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);
                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.id_notificaciones != null){
                            enviaNotificacionTabla(menu_opcion,submenu_opcion,jsonData.id_notificaciones,accionLista);
                        }else if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            //enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que Cambia de Estado multiples solicitudes de fichaje
 *
 */
function cambiaSolicitudFichajeMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);
        
        var url = "";
        var ajax = objetoAjax();
        url = "../common/set_estado_solicitud_fichaje_multiple.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);

                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){

                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que Cambia de Estado multiples solicitudes de fichaje
 *
 */
function cambiaSolicitudParesFichajesMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);
        
        var url = "";
        var ajax = objetoAjax();
        url = "../common/set_estado_solicitud_pares_fichajes_multiple.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);

                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){

                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que Cambia de Estado multiples solicitudes de fichaje
 *
 */
function cambiaSolicitudCursosMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);
        
        var url = "";
        var ajax = objetoAjax();
        url = "../common/set_estado_solicitud_cursos_multiples.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);

                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){

                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

    }else{
        showDialog(invalidOption);
    }
}


/**
 * Funcion que Cambia de Estado multiples de las solicitudes de las Horas
 * 
 */
function cambiaSolicitudHorasMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);
        
        var url = "";
        var ajax = objetoAjax();
        url = "../common/set_estado_solicitud_horas_multiples.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);
                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){
                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
        //limpiarFiltros(menu_opcion,submenu_opcion,accionLista,null);
    }else{
        showDialog(invalidOption);
    }
}


/**
 * Funcion que Cambia de Estado multiples de las solicitudes de las Horas
 * 
 */
function cambiaSolicitudHorasPeriodicasMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);
        
        var url = "";
        var ajax = objetoAjax();
        url = "../common/set_estado_solicitud_horas_periodicas_multiples.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);
                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){
                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
        //limpiarFiltros(menu_opcion,submenu_opcion,accionLista,null);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion cambia el estado de una solicitud de teletrabajo
 *
 */
function cambiaSolicitudTeletrabajo(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_teletrabajo.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de teletrabajo
 *
 */
function cambiaSolicitudHorasTeletrabajo(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_horas_teletrabajo.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);
                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.id_notificaciones != null){
                            enviaNotificacionTabla(menu_opcion,submenu_opcion,jsonData.id_notificaciones,accionLista);
                        }else if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            //enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}



/**
 * Funcion cambia el estado de una solicitud de cursos
 *
 */
function cambiaSolicitudCursos(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    // Verificar si el campo edad_base_sepe existe en el formulario
    var edadBaseSepeElement = document.querySelector('[name="edad_base_sepe"]');
    if (edadBaseSepeElement) {
        // Verificar si el campo tiene un valor
        var edadBaseSepeValue = edadBaseSepeElement.value.trim();
        if (edadBaseSepeValue === "") {
            alert("El campo edad del sepe no tiene un valor. Por favor, ingrese un valor.");
            return; // Detener la ejecución si el campo no tiene valor
        }else{
            formData.append('edadBaseSepe',edadBaseSepeValue);
        }
    }

    var situacionLaboralElement = document.querySelector('[name="situacion_laboral"]');
    if (situacionLaboralElement) {
        // Verificar si el campo tiene un valor
        var situacionLaboralValue = situacionLaboralElement.value.trim();
        if (situacionLaboralValue === "") {
            alert("El campo situacion laboral no tiene un valor. Por favor, ingrese un valor.");
            return; // Detener la ejecución si el campo no tiene valor
        }else{
            formData.append('situacionLaboral',situacionLaboralValue);
        }
    }

    var nivelEstudiosElement = document.querySelector('[name="nivel_estudios"]');
    if (nivelEstudiosElement) {
        // Verificar si el campo tiene un valor
        var nivelEstudioValue = nivelEstudiosElement.value.trim();
        if (nivelEstudioValue === "") {
            alert("El campo nivel de estudio no tiene un valor. Por favor, ingrese un valor.");
            return; // Detener la ejecución si el campo no tiene valor
        }else{
            formData.append('nivelEstudios',nivelEstudioValue);
        }
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_cursos.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de viaje
 *
 */
function cambiaSolicitudViajes(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_viajes.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de fichaje automatico
 *
 */
function cambiaSolicitudFichajeAutomatico(menu_opcion,submenu_opcion,idSolicitud,accion){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_fichaje_automatico.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que envia a la cola de procesos una solicitud de cancelacion de permiso
 *
 */
function cancelaSolicitud(menu_opcion,submenu_opcion,idSolicitud,filtro,motivo){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){

        if(comunicacion != null){
            esperaRespuesta(true);
            var headers = {};
            var obj={
                    idioma: lang,
                    seccion_emp_id:menu_opcion,
                    elemento_emp_id:submenu_opcion,
                    motivo:motivo,
                    id:idSolicitud
                };
            comunicacion.enviarPeticion('/queue/vacation-queue',headers, obj,'CANCELORDER');
            esperaRespuesta(false);
            showDialog(mensaje_solicitud_vacaciones_procesando);
            irAContenido(menu_activo,menu_opcion,submenu_opcion);
            flagColaEmpleado = 1;
        }
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion cambia el estado de una solicitud de amortizacion
 * 
 */
function cambiaSolicitudAmortizacion(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_amortizaciones.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que Cambia de Estado multiples de las solicitudes de las Amortizaciones
 * 
 */
function cambiaSolicitudAmortizacionesMultiple(menu_opcion,submenu_opcion,estado,accion){
    var arrIdElementos = new Array();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        var arrInput = document.getElementsByTagName('input');
        for (var i = 0;i < arrInput.length;i++){
            if(arrInput[i].type == 'checkbox' && arrInput[i].name == 'id' && arrInput[i].checked == true){
                arrIdElementos.push(arrInput[i].value);
            }
        }
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('ids',arrIdElementos.join());
        formData.append('estado',estado);
        var url = "";
        var ajax = objetoAjax();
        url = "../common/set_estado_solicitud_amortizaciones_multiples.php";
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);
                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                            return;
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            window.location = "../inc/salir.php";
                        }else if(jsonData.estado == 0){
                            if(jsonData.solicitudes != null){
                                enviaNotificacionMultiple(menu_opcion,submenu_opcion,jsonData.solicitudes,jsonData.errores);
                            }
                            idSeleccionadas = new Array();
                            toggleAccionMultiple(null);
                        }
                    }else{
                        showDialog("No se han encontrado resultados con los parametros introducidos");
                    }
                }else if(ajax.status==404){
                    showDialog("La pagina no existe");
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
    }else{
        showDialog("No es una opción válida");
    }
}

/**
 * Funcion que muestra el formulario para justificar una ausencia
 *
 */
function justificar(menu_opcion,submenu_opcion,fecha,idEmpleado,filtro){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('fecha',fecha);
    formData.append('id',idEmpleado);
    formData.append('filtro',filtro);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_new_justificante.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        document.getElementById("content").innerHTML = arr_aux[1];
                    }
                    inputsPersonalizadosForm();
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que muestra el formulario para justificar una ausencia que se redirija a solcitudes
 *
 */
function justificarSol(menu_opcion,submenu_opcion,fecha,idEmpleado,filtro){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('fecha',fecha);
    formData.append('id',idEmpleado);
    formData.append('filtro',filtro);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_new_justificante_sol.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        document.getElementById("content").innerHTML = arr_aux[1];
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que muestra el formulario para generar una solicitud de horas justificar un retraso
 *
 */
function justificaRetraso(menu_opcion,submenu_opcion,idEmpleados,fechaFichaje,retraso){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idEmpleados);
    formData.append('ff',fechaFichaje);
    formData.append('re',retraso);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_new_justificante_retraso.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        document.getElementById("content").innerHTML = arr_aux[1];
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que guarda un justificante de ausencia
 *
 */
function guardaJustificante(menu_opcion,submenu_opcion){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var formulario = document.getElementById("nuevo_elemento");
        var longitudFormulario = formulario.elements.length;
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        var re = /^\w+$/;
        //var re2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        for (var i=0; i <= (longitudFormulario - 1);i++) {
            if(formulario.elements[i].required == true && formulario.elements[i].value == ""){
                showDialog(mensaje_faltan_campos);
                formulario.elements[i].classList.add("requerido");
                return false;
            }else if(formulario.elements[i].name == "name" && !re.test(formulario.elements[i].value)){
                showDialog(formulario.elements[i].name + mensaje_error_caracteres);
                return false;
            }
            if(formulario.elements[i].type != 'file'){
                if(formulario.elements[i].type == "checkbox"){
                    if(formulario.elements[i].checked == true){
                        formData.append(formulario.elements[i].name, formulario.elements[i].value);
                    }
                }else{
                    formData.append(formulario.elements[i].name, formulario.elements[i].value);
                }
            }else if(formulario.elements[i].value != ''){
                var files = formulario.elements[i].files;
                formData.append(formulario.elements[i].name, files[0], files[0].name);
            }
        }
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/save_justificante.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var arr_aux = html_txt.split("|");
                        if(arr_aux[0] == 1){
                            showDialog(arr_aux[1]);
                        }else if(arr_aux[0] == 2){
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        }else{
                            showDialog(arr_aux[1]);
                            irAContenido(menu_activo,menu_opcion,submenu_opcion);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que guarda una solicitud de horas que justifica un retraso
 *
 */
function guardaJustRetraso(menu_opcion,submenu_opcion,vista){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var formulario = document.getElementById("nuevo_elemento");
        var longitudFormulario = formulario.elements.length;
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('vw', vista);
        var re = /^\w+$/;
        //var re2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        for (var i=0; i <= (longitudFormulario - 1);i++) {
            if(formulario.elements[i].required == true && formulario.elements[i].value == ""){
                showDialog(mensaje_faltan_campos);
                formulario.elements[i].classList.add("requerido");
                return false;
            }
            if(formulario.elements[i].type != 'file'){
                if(formulario.elements[i].type == "checkbox"){
                    if(formulario.elements[i].checked == true){
                        formData.append(formulario.elements[i].name, formulario.elements[i].value);
                    }
                }else{
                    formData.append(formulario.elements[i].name, formulario.elements[i].value);
                }
            }else if(formulario.elements[i].value != ''){
                var files = formulario.elements[i].files;
                formData.append(formulario.elements[i].name, files[0], files[0].name);
            }
        }
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/save_justificante_retraso.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var arr_aux = html_txt.split("|");
                        if(arr_aux[0] == 1){
                            showDialog(arr_aux[1]);
                        }else if(arr_aux[0] == 2){
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        }else{
                            showDialog(arr_aux[1]);
                            var jsonData = JSON.parse(arr_aux[0]);
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que guarda una solicitud de horas que justifica un retraso
 *
 */
function guardaJustifcacionSol(menu_opcion,submenu_opcion,vista){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var formulario = document.getElementById("nuevo_elemento");
        var longitudFormulario = formulario.elements.length;
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('vw', vista);
        var re = /^\w+$/;
        //var re2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        for (var i=0; i <= (longitudFormulario - 1);i++) {
            if(formulario.elements[i].required == true && formulario.elements[i].value == ""){
                showDialog(mensaje_faltan_campos);
                formulario.elements[i].classList.add("requerido");
                return false;
            }
            if(formulario.elements[i].type != 'file'){
                if(formulario.elements[i].type == "checkbox"){
                    if(formulario.elements[i].checked == true){
                        formData.append(formulario.elements[i].name, formulario.elements[i].value);
                    }
                }else{
                    formData.append(formulario.elements[i].name, formulario.elements[i].value);
                }
            }else if(formulario.elements[i].value != ''){
                var files = formulario.elements[i].files;
                formData.append(formulario.elements[i].name, files[0], files[0].name);
            }
        }
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/save_justificante_solicitudes.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var arr_aux = html_txt.split("|");
                        if(arr_aux[0] == 1){
                            showDialog(arr_aux[1]);
                        }else if(arr_aux[0] == 2){
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        }else{
                            showDialog(arr_aux[1]);
                            var jsonData = JSON.parse(arr_aux[0]);
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que muestra datos del justificante
 *
 */
function verJustificante(menu_opcion,submenu_opcion,idJustificante,origen){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idJustificante);
    formData.append('ori',origen);
    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_view_justificante.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        document.getElementById("content").innerHTML = arr_aux[1];
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que muestra datos de la solicitud de horas que justifica retraso
 *
 */
function verJustRetraso(menu_opcion,submenu_opcion,idSolicitudHoras,origen){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitudHoras);
    formData.append('ori',origen);
    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_view_justificante_retraso.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        document.getElementById("content").innerHTML = arr_aux[1];
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que muestra el formulario para generar una solicitud de horas justificar un retraso
 *
 */
function cambiaFichaje(menu_opcion,submenu_opcion,idFichaje){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('fi',idFichaje);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_new_cambio_fichaje.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        document.getElementById("content").innerHTML = arr_aux[1];
                        $(function () {
                            $.datepicker.setDefaults($.datepicker.regional[idiomaNavegador]);
                            $("#fecha").datepicker({
                                firstDay: 1,
                                dateFormat: "dd-mm-yy"
                            });
                        });
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que guarda una solicitud de horas que justifica un retraso
 *
 */
function guardaModificaFichaje(menu_opcion,submenu_opcion){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= 14 && !isNaN(submenu_opcion)){
        var formulario = document.getElementById("nuevo_elemento");
        var longitudFormulario = formulario.elements.length;
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        var re = /^\w+$/;
        //var re2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        for (var i=0; i <= (longitudFormulario - 1);i++) {
            if(formulario.elements[i].required == true && formulario.elements[i].value == ""){
                showDialog(mensaje_faltan_campos);
                formulario.elements[i].classList.add("requerido");
                return false;
            }
            if(formulario.elements[i].type != 'file'){
                if(formulario.elements[i].type == "checkbox"){
                    if(formulario.elements[i].checked == true){
                        formData.append(formulario.elements[i].name, formulario.elements[i].value);
                    }
                }else{
                    formData.append(formulario.elements[i].name, formulario.elements[i].value);
                }
            }else if(formulario.elements[i].value != ''){
                var files = formulario.elements[i].files;
                formData.append(formulario.elements[i].name, files[0], files[0].name);
            }
        }
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/save_modifica_fichaje.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var arr_aux = html_txt.split("|");
                        if(arr_aux[0] == 1){
                            showDialog(arr_aux[1]);
                        }else if(arr_aux[0] == 2){
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        }else{
                            showDialog(arr_aux[1]);
                            var jsonData = JSON.parse(arr_aux[0]);
                            if(jsonData.mensaje != ""){
                                enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje);
                            }else{
                                limpiarFiltros(menu_opcion,submenu_opcion,accionLista,null);
                            }
                            
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que gestiona la corrección de fichajes
 *
 */
function corregirFichaje(menu_opcion,submenu_opcion,idError,idFichaje){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('fi',idFichaje);
    formData.append('ef',idError);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gestionar_correccion_fichaje.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        if(arr_aux.length == 3){
                            //Caso de borrado, se muestra dialogo
                            showDialog(arr_aux[2]);
                            irAContenido(menu_activo,menu_opcion,submenu_opcion);
                        }else{
                            document.getElementById("content").innerHTML = arr_aux[1];
                            $(function () {
                                $.datepicker.setDefaults($.datepicker.regional[idiomaNavegador]);
                                $("#fecha").datepicker({
                                    firstDay: 1,
                                    dateFormat: "dd-mm-yy"
                                });
                            });
                        }
                        
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion cambia el estado de una solicitud de horas
 *
 */
function cambiaSolicitudPeligrosidad(menu_opcion,submenu_opcion,idSolicitud,accion){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);

    var textRespuesta = document.getElementById("respuesta");
    if(textRespuesta != null){
        formData.append('respuesta',textRespuesta.value);
    }

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/set_estado_solicitud_niveles_peligrosidad.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        if(jsonData.id_notificaciones != null){
                            enviaNotificacionTabla(menu_opcion,submenu_opcion,jsonData.id_notificaciones,accionLista);
                        }else if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }

                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}




/**
 * Funcion cambia el estado de una solicitud de cambio de categoria
 *
 */
function cambiaSolicitudCambioCategorias(menu_opcion,submenu_opcion,idSolicitud,estado,accion,nivelSolicitud){
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id',idSolicitud);
    formData.append('estado',estado);
    formData.append('nivel',nivelSolicitud);

    var url = "";
    var ajax = objetoAjax();
    url = "../common/set_estado_solicitud_cambio_categorias.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var jsonData = JSON.parse(html_txt);

                    if(jsonData.estado == 1){
                        showDialog(jsonData.mensaje);
                        return;
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        window.location = "../inc/salir.php";
                    }else if(jsonData.estado == 0){
                        if(jsonData.lista_empleados != null){
                            var listaNotificar = document.getElementById("lista_empleados");
                            if(listaNotificar != null){
                                listaNotificar.value = jsonData.lista_empleados;
                            }else{
                                var formulario = document.getElementById("nuevo_elemento");
                                var nuevoInput = document.createElement("input");
                                nuevoInput.type = "hidden";
                                nuevoInput.id = "lista_empleados";
                                nuevoInput.value = jsonData.lista_empleados;
                                formulario.appendChild(nuevoInput);
                            }
                            enviaNotificacion(menu_opcion,submenu_opcion,jsonData.mensaje_notificacion,accion,idSolicitud,viewGestor,jsonData.mensaje,jsonData.asunto);
                        }else{
                            if(accion == accionLista){
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else if(accion == accionVista){
                                verElemento(menu_opcion,submenu_opcion,idSolicitud);
                            }else if(accion == accionEdicion){
                                editaElemento(menu_opcion,submenu_opcion,idSolicitud,viewGestor);
                            }
                        }
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}