/**
 *  Funciones para creacion de Tickes
 */

/**
 * Funcion que cambia el contenido del section
 *
 */
function irASoporte(){
    
    // $('body').click(function(e){
    //     e.preventDefault();
    //     e.stopImmediatePropagation(); //charles ma is right about that, but stopPropagation isn't also needed
    // });
    
    var url = "";
    var ajax = objetoAjax();
    url = "../common/gen_soporte.php?pag=" + numeroPagina;
    ajax.open("GET", url, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                if(paginasImpresion == 0){
                    esperaRespuesta(false);
                }
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else if(html_txt.indexOf("Fatal error") >= 0){
                        showDialog(mensaje_error_tiempo_maximo_ejecucion);
                    }else{
                        document.getElementById('submenu').innerHTML = '';
                        document.getElementById("content").innerHTML = arr_aux[1];
                        $(function () {
                            $.datepicker.setDefaults($.datepicker.regional[idiomaNavegador]);
                            $("#fecha_inicio").datepicker({
                                firstDay: 1,
                                dateFormat: "dd-mm-yy"
                            });
                        });
                        $(function () {
                            $.datepicker.setDefaults($.datepicker.regional[idiomaNavegador]);
                            $("#fecha_fin").datepicker({
                                firstDay: 1,
                                dateFormat: "dd-mm-yy"
                            });
                        });
                        $(function () {
                            $("#filtro_tickets_topico").pqSelect({
                                singlePlaceholder: seleccionar_topico,
                                radio: true,
                                search: true
                            }).on("change", function (evt) {
                                var val = $(this).val();
                                filtraSoporte(filtroTicketsTopico,val,accionLista);
                            });
                        });
                        $(function () {
                            $("#filtro_tickets_tipo").pqSelect({
                                singlePlaceholder: tic_seleccionar_tipo,
                                radio: true,
                                search: true
                            }).on("change", function (evt) {
                                var val = $(this).val();
                                filtraSoporte(filtroTicketsTipo,val,accionLista);
                            });
                        });
                        $(function () {
                            $("#filtro_tickets_asunto").pqSelect({
                                singlePlaceholder: seleccionar_asunto,
                                radio: true,
                                search: true
                            }).on("change", function (evt) {
                                var val = $(this).val();
                                filtraSoporte(filtroTicketsAsunto,val,accionLista);
                            });
                        });
                        $(function () {
                            $("#filtro_tickets_status").pqSelect({
                                singlePlaceholder: seleccionar_status,
                                radio: true,
                                search: true
                            }).on("change", function (evt) {
                                var val = $(this).val();
                                filtraSoporte(filtroTicketsStatus,val,accionLista);
                            });
                        });
                        $(function () {
                            $("#selector").pqSelect({
                                singlePlaceholder: seleccionar_busqueda,
                                radio: true,
                                search: true
                            }).on("change", function (evt) {
                                var val = $(this).val();
                                setfiltroSoporte(val);
                            });
                        });
                        $(function () {
                            $("#filtro_empresas").pqSelect({
                                multiplePlaceholder: seleccionar_empresa,
                                displayText: mensaje_filtro_seleccionados,
                                deselect: true,
                                selectallText: seleccionar_todos,
                                checkbox: true,
                                maxDisplay: 6,
                                search: true
                            }).on("change", function (evt) {
                                var val = $(this).val();
                                // var idEmpresas = document.getElementById('id_empresas');
                                // if(idEmpresas != null){
                                //     idEmpresas.value = val;
                                //     var selFiltroCentros = document.getElementById('filtro_centros');
                                //     if(selFiltroCentros != null){
                                //         filtraElemento(menu_opcion,submenu_opcion,filtroEmpresas,val,accionFormulario,filtro);
                                //     }
                                // }else{
                                    filtraSoporte(filtroEmpresas,val,accionLista);
                                // }
                            });
                        });
                        $(function () {
                            $("#filtro_empleados").pqSelect({
                                singlePlaceholder: seleccionar_empleado,
                                radio: true,
                                search: true
                            }).on("change", function (evt) {
                                var val = $(this).val();
                                filtraSoporte(filtroSelEmpleados,val,accionLista);
                            });
                        });
                        $(function() {
                            $(".paginar").click(function(){
                                numeroPagina++;
                                irASoporte();
                            });
                        });
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status==500){
                showDialog(mensaje_error_tiempo_maximo_ejecucion);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    if(accionesEjecutando <= 0){
        esperaRespuesta(true);
    }
    ajax.send(null);
}

/**
 * Funcion que cambia el content por formulario de un nuevo elemento
 *
 */
function nuevoSoporte(elementoId,filtro){
    var url = "";
    var ajax = objetoAjax();
    roles = new Array();
    url = "../common/gen_new_soporte.php?" + (elementoId != null? "&id=" + elementoId:"") + (filtro != null? "&filtro=" + filtro:"");
    ajax.open("GET", url, true);
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
            }else if(ajax.status==500){
                showDialog("Error code");
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
            mipaginaActual(mensaje_soporte_nuevo);
        }
    };
    
    esperaRespuesta(true);
    ajax.send(null);
}

/**
 * Funcion que guarda el contenido de un formulario
 *
 */
function guardaSoporte(flag_mobil){
        
        var formulario = document.getElementById("nuevo_elemento");
        var longitudFormulario = formulario.elements.length;
        var formData = new FormData();
        var formData2 = new FormData(formulario);
        var jsonObj = {};
        var flagSeleccionadas = false;
        
        var re = /^\w+$/;
        var re2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        var arrRadios = new Array();
        var arrCheckedRadios = new Array();
        var notificar = false;
        for (var i=0; i <= (longitudFormulario - 1);i++) {
            if(formulario.elements[i].required == true && formulario.elements[i].value == ""){
                showDialog(mensaje_faltan_campos);
                formulario.elements[i].classList.add("requerido");
                return false;
            }

            if(formulario.elements[i].type != 'file'){
                if(formulario.elements[i].name == "id_empleados" && formulario.elements[i].value == ""){
                    if(idEmpleadoSel > 0){
                        if(flag_mobil == undefined || flag_mobil == 0){
                            formData.append(formulario.elements[i].name, idEmpleadoSel);
                        }else if(formulario.elements[i].name != ""){
                            jsonObj[formulario.elements[i].name] =  idEmpleadoSel;
                        }
                        idEmpleadoSel = 0;
                    }else{
                        showDialog(mensaje_faltan_campos);
                        return false;
                    }
                }else{
                    if(flag_mobil == undefined || flag_mobil == 0){
                        formData.append(formulario.elements[i].name, formulario.elements[i].value);
                    }else if(formulario.elements[i].name != ""){
                        jsonObj[formulario.elements[i].name] =  formulario.elements[i].value;
                    }
                }
            }else if(formulario.elements[i].value != ''){
                var files = formulario.elements[i].files;
                if(flag_mobil == undefined || flag_mobil == 0){
                    formData.append(formulario.elements[i].name, files);                  
                }else if(formulario.elements[i].name != ""){
                    jsonObj[formulario.elements[i].name] =   Base64.encode(files[0].name);
                }
            }
        }
        for (var i = 0;i < arrCheckedRadios.length;i++){
            if(arrCheckedRadios[i] == 0){
                showDialog(mensaje_faltan_campos);
                return false;
            }
        }
        
        var url = "";
        var ajax = objetoAjax();
        url = "../common/save_soporte.php";
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    informeProcess = 0;
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
                            tab_activo = null;
                            if(notificar == false){
                                showDialog(arr_aux[1]);
                                irASoporte();
                            }else{
                                var jsonData = JSON.parse(arr_aux[0]);
                                if(jsonData.notificacion == null || jsonData.notificacion == true){
                                    if(jsonData.id_notificaciones == null){
                                        if(jsonData.lista_empleados != null){
                                            var listaNotificar = document.getElementById("lista_empleados");
                                            listaNotificar.value = jsonData.lista_empleados.join();
                                        }
                                        idSeleccionadas = new Array();
                                        enviaNotificacion(jsonData.mensaje,accionLista,null,viewEmpleado,arr_aux[1],jsonData.asunto);
                                    }else{
                                        enviaNotificacionTabla(jsonData.id_notificaciones,accionLista);
                                    }
                                }else{
                                    showDialog(arr_aux[1]);
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
        informeProcess = 1;
        if(flag_mobil == undefined || flag_mobil == 0){
            ajax.send(formData2);
        }else{
            ajax.send(JSON.stringify(jsonObj));
        }
        esperaRespuesta(true);
}

/**
 * Funcion que muestra opciones a configurar para generar una vista u informe
 *
 */
function verSoporte(elemento_id){
    
    var url = "";
    var ajax = objetoAjax();
    url = "../common/gen_view_soporte.php?id=" + elemento_id;
    ajax.open("GET", url, true);
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
                        if (arr_aux[2]===undefined) {
                            document.getElementById("content").innerHTML = arr_aux[1];
                        }else {
                            document.getElementById("content").innerHTML = arr_aux[1];
                            $("#acordeon").accordion({
                                heightStyle: "content",
                                collapsible: true,
                                active: parseInt(arr_aux[2])
                            });
                        }
                        toggleAccionActivar(null);
                        toggleAccionDesactivar(null);
                        $("#acordeon3" ).accordion({
                            heightStyle: "content",
                            collapsible: false
                        });
                        $(".ui-accordion-content").show();
                    }
                }else{
                    showDialog(noResults);
                }
                mipaginaActual(mensaje_soporte_gestionar);
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    esperaRespuesta(true);
    ajax.send(null);
}

/**
 * Funcion que setea la fecha y hora para mostrar Presentes
 *
 */
function fechaBusquedaSoporte(flagReset,accion){
    var fecha = null;
    var hora = null;
    var fecha_inicio = null;
    var fecha_fin = null;
    if(flagReset < 2 || flagReset > 5){
        fecha = document.getElementById('fecha_busqueda');
        hora = document.getElementById('hora_busqueda');
        if(flagReset == prevWeek){
            var arr_fecha = fecha.value.split("-");
            var fechaPrevWeek = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaPrevWeek.getTime();
            //Retrocedemos 7 dias
            var fechaPrevWeekMilisegundos = fechaMilisegundos - (7*24*60*60*1000);
            var nuevaFecha = new Date(fechaPrevWeekMilisegundos);
            fecha.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
        }else if(flagReset == nextWeek){
            var arr_fecha = fecha.value.split("-");
            var fechaNextWeek = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaNextWeek.getTime();
            //Avanzamos 7 dias
            var fechaNextWeekMilisegundos = fechaMilisegundos + (7*24*60*60*1000);
            var nuevaFecha = new Date(fechaNextWeekMilisegundos);
            fecha.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
        }
        if(flagReset == 8){
            var arr_fecha = fecha.value.split("-");
            var fechaDiaAnterior = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaDiaAnterior.getTime();
            //Retrocedemos 1 dia
            var fechaDiaAnteriorMilisegundos = fechaMilisegundos - (1*24*60*60*1000);
            var nuevaFecha = new Date(fechaDiaAnteriorMilisegundos);
            fecha.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
        }else if(flagReset == 9){
            var arr_fecha = fecha.value.split("-");
            var fechaDiaPosterior = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaDiaPosterior.getTime();
            //Avanzamos 1 dia
            var fechaDiaPosteriorMilisegundos = fechaMilisegundos + (1*24*60*60*1000);
            var nuevaFecha = new Date(fechaDiaPosteriorMilisegundos);
            fecha.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
            
        }else if(flagReset == 10){
            var arr_fecha = fecha.value.split("-");
            
            var fechaDiaAnterior = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaDiaAnterior.getTime();
            $val=0;
            
            if(arr_fecha[1]=="02"){
                $val=29;
            }else{
                $val=31;
            }
            
            //Retrocedemos 1 mes
            var fechaDiaAnteriorMilisegundos = fechaMilisegundos - ($val*24*60*60*1000);
            var nuevaFecha = new Date(fechaDiaAnteriorMilisegundos);
            fecha.value = addZero(1) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
            //fecha.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
        }else if(flagReset == 11){
            var arr_fecha = fecha.value.split("-");
            var fechaDiaPosterior = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaDiaPosterior.getTime();
            $val=0;
            
            if(arr_fecha[1]=="02"){
                $val=29;
            }else{
                $val=31;
            }
            
            //Avanzamos 1 mes
            var fechaDiaPosteriorMilisegundos = fechaMilisegundos + ($val*24*60*60*1000);
            var nuevaFecha = new Date(fechaDiaPosteriorMilisegundos);
            fecha.value = addZero(1) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
            //fecha.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
        }
    }else{
        fecha_inicio = document.getElementById('fecha_inicio');
        if(flagReset == semanaAnterior){
            var arr_fecha = fecha_inicio.value.split("-");
            var fechaInicio = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaInicio.getTime();
            //Retrocedemos 7 dias
            var fechaInicioMilisegundos = fechaMilisegundos - (7*24*60*60*1000);
            var nuevaFecha = new Date(fechaInicioMilisegundos);
            fecha_inicio.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
        }else if(flagReset == semanaPosterior){
            var arr_fecha = fecha_inicio.value.split("-");
            var fechaInicio = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaInicio.getTime();
            //Avanzamos 7 dias
            var fechaInicioMilisegundos = fechaMilisegundos + (7*24*60*60*1000);
            var nuevaFecha = new Date(fechaInicioMilisegundos);
            fecha_inicio.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
        }

        fecha_fin = document.getElementById('fecha_fin');
        if(accion == accionComparar){
            var arr_fecha = fecha_inicio.value.split("-");
            var fechaInicio = new Date(arr_fecha[2],(arr_fecha[1] - 1),arr_fecha[0],0,0,0,0);
            var fechaMilisegundos = fechaInicio.getTime();
            //Añadimos 11 dias en milisegundos
            var fechaFinMilisegundos = fechaMilisegundos + (11*24*60*60*1000);
            var nuevaFecha = new Date(fechaFinMilisegundos);
            fecha_fin.value = addZero(nuevaFecha.getDate()) + "-" + addZero(nuevaFecha.getMonth() + 1) + "-" + nuevaFecha.getFullYear();
        }

        if(flagReset == busquedaHoy){
            var fechaHoy = new Date();
            var fechaMilisegundos = fechaHoy.getTime();
            //Retrocedemos 6 dias
            var fechaInicioMilisegundos = fechaMilisegundos - (6*24*60*60*1000);
            var nuevoInicio = new Date(fechaInicioMilisegundos);
            fecha_inicio.value = addZero(nuevoInicio.getDate()) + "-" + addZero(nuevoInicio.getMonth() + 1) + "-" + nuevoInicio.getFullYear();
            //Añadimos 5 dias en milisegundos
            var fechaFinMilisegundos = fechaMilisegundos + (5*24*60*60*1000);
            var nuevoFin = new Date(fechaFinMilisegundos);
            fecha_fin.value = addZero(nuevoFin.getDate()) + "-" + addZero(nuevoFin.getMonth() + 1) + "-" + nuevoFin.getFullYear();
        }
    }
    if(flagReset == resetFecha){
        ahora = new Date();
        fecha.value = addZero(ahora.getDate()) + "-" + addZero(ahora.getMonth() + 1) + "-" + ahora.getFullYear();
        hora.value = addZero(ahora.getHours()) + ":" + addZero(ahora.getMinutes()) + ":" + addZero(ahora.getSeconds());
    }

    if(fecha != null && hora != null){
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/set_fecha_busqueda.php?d=" + fecha.value + "&h=" + hora.value;
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var arr_aux = html_txt.split("|");
                        if(arr_aux[0] == 1){
                            //Do nothing
                        }else if(arr_aux[0] == 2){
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        }else{
                            if(accion == accionLista){
                                irASoporte();
                            }else if(accion == accionFormulario){
                                nuevoSoporte(null);
                            }else if(accion == accionEdicion){
                                var elementoId = arr_aux[1];
                                //editaSoporte(elementoId);
                            }else if(accion == accionVista){
                                var elementoId = 0;
                                if(document.getElementById("id") != null){
                                    elementoId = document.getElementById("id").value;
                                }
                                verSoporte(elementoId);
                            }
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }
                else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(null);
    }else if(fecha_inicio != null && fecha_fin != null){
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/set_fecha_busqueda.php?ini=" + fecha_inicio.value + "&fin=" + fecha_fin.value;
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
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
                                irASoporte();
                            }else if(accion == accionFormulario){
                                nuevoSoporte(null);
                            }else if(accion == accionEdicion){
                                var elementoId = arr_aux[1];
                                //editaSoporte(elementoId);
                            }else if(accion == accionVista){
                                var elementoId = 0;
                                if(document.getElementById("id") != null){
                                    elementoId = document.getElementById("id").value;
                                }
                                verSoporte(elementoId);
                            }
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }
                else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(null);
    }
}

/**
 * Funcion que cancela el formulario actual y vuelve atras
 *
 */
function cancelarsoporte(){
    irASoporte();
}

/**
 * 
 * Funcion para guardar las obervaciones de denuncias anonimas
 *
 */
function guardaMensajesTickets(formulario){
    // $('body').click(function(e){
    //     e.preventDefault();
    //     e.stopImmediatePropagation(); //charles ma is right about that, but stopPropagation isn't also needed
    // });
    var longitudFormulario = formulario.elements.length;
    var formData = new FormData();    
    var formData2 = new FormData(formulario);
    for (var i=0; i <= (longitudFormulario - 1);i++) {
        if(formulario.elements[i].required == true && formulario.elements[i].value == ""){
            showDialog(mensaje_faltan_campos);
            formulario.elements[i].classList.add("requerido");
            return false;
        }
        if(formulario.elements[i].type != 'file' && formulario.elements[i].value != ''){
            if(formulario.elements[i].type == "checkbox"){
                if(formulario.elements[i].checked == true){
                    formData.append(formulario.elements[i].name, 'Cerrada');
                } else {
                    formData.append(formulario.elements[i].name, 'Abierta');
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
    url = "../common/save_mensajes_tickets.php";
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
                        let ticket = JSON.parse(arr_aux[1]);
                        document.getElementById('acordeon3').innerHTML = '';
                        document.getElementById('body').value = '';
                        document.getElementById('anexos').innerHTML = '';
                        //console.log(ticket); 
                        texto =``;    
                        ultimaRespuesta='';
                        primero = true;
                        ticket.responses.forEach(function(respuesta, index){          
                            if (respuesta.autor=='Soporte' && primero) {
                                ultimaRespuesta=respuesta.fecha_Creacion;
                                primero = false;
                            }                   
                            fformat = formaFecha(respuesta.fecha_Creacion); 
                            texto +=`<h3 style="padding: 0.5em 1.5em 0.5em 1.7em;"> ${respuesta.autor}, ${fformat}</h3>`
                            texto +=`<div> `;
                            pos = index+1;
                            nombre ='respuesta'+pos;
                            var resp = respuesta[nombre]; 
                            texto +=`<p>${resp.replace(/(<([^>]+)>)/ig, '')}</p>`;
                            texto +=`</div> `;
                        });
                        
                        // fformat = formaFecha(ticket.body[0].fecha_Creacion);
                        // texto +=`<h3 style="padding: 0.5em 1.5em 0.5em 1.7em;">Descripción ${fformat}</h3>`
                        // texto +=`<div> `;
                        // texto +=`<p> ${ticket.body[0].descripcion}</p>`;
                        // texto +=`</div> `;
                        fformat = formaFecha(ultimaRespuesta);
                        document.getElementById('fe_last').innerHTML = fformat;
                        fformat = formaFecha(ticket.lastUserResponseDate);
                        document.getElementById('lastUserRes').innerHTML = fformat;
                        document.getElementById('acordeon3').innerHTML = texto;
                        $("#acordeon3" ).accordion("refresh");
                        $(".ui-accordion-content").show();
                        // showDialog('Cargado');  
                        irASoporte();                          
                        
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
    ajax.send(formData2);
    esperaRespuesta(true);
    // }else{
    //     showDialog(invalidOption);
    // }
}

function filtrguardaSoporteaSoporte(elementoFiltrar,elemIds,accion,filtro){
    // $('body').click(function(e){
    //     e.preventDefault();
    //     e.stopImmediatePropagation(); //charles ma is right about that, but stopPropagation isn't also needed
    // });
    
    // alert(elemIds);

    //alert(elementoFiltrar);

    var jsonObj  = {};
    jsonObj.elem = elementoFiltrar;
    if(elemIds != null
            //Filtro Tikets Topicos
            && elementoFiltrar != filtroTicketsTopico
            //Filtro Tikets Tipo
            && elementoFiltrar != filtroTicketsTipo
            //Filtro Tikets Asunto
            && elementoFiltrar != filtroTicketsAsunto
            //Filtro Tikets Status
            && elementoFiltrar != filtroTicketsStatus
            //Filtro Tikets Descripcion
            && elementoFiltrar != filtroTicketsDescripcion
            //Filtro Tikets Descripcion
            && elementoFiltrar != filtroTicketsNumero
            //Filtro Tikets Descripcion
            && elementoFiltrar != filtroEmpresas
            //Filtro Tikets Descripcion
            && elementoFiltrar != filtroSelEmpleados){
        //Select de multiple seleccion
        jsonObj.ids = elemIds.join();
    }else if(elemIds != null &&
            (elementoFiltrar == filtroEmpleados
                    //Filtro Tickets Topicos Mauro M.
                    || elementoFiltrar == filtroTicketsTopico
                    //Filtro Tickets Tipos Mauro M.
                    || elementoFiltrar == filtroTicketsTipo
                    //Filtro Tickets Tipos Mauro M.
                    || elementoFiltrar == filtroTicketsAsunto
                    //Filtro Tickets Tipos Mauro M.
                    || elementoFiltrar == filtroTicketsStatus
                    //Filtro Tickets Tipos Mauro M.
                    || elementoFiltrar == filtroTicketsDescripcion
                    //Filtro Tickets Tipos Mauro M.
                    || elementoFiltrar == filtroTicketsNumero
                    //Filtro Tickets Tipos Mauro M.
                    || elementoFiltrar == filtroEmpresas)
                    //Filtro Tickets Tipos Mauro M.
                    || elementoFiltrar == filtroSelEmpleados){
        //Select de selección unica
        jsonObj.ids = elemIds;
    }else{
        jsonObj.ids = "";
    }
    if(elementoFiltrar == filtroTicketsTopico){
        //Si es el filtro para seleccionar los topicos de tickets
        jsonObj.elem = filtroTicketsTopico;
    }else if(elementoFiltrar == filtroTicketsTipo){
       //Si es el filtro para seleccionar los tipos de tickets
       jsonObj.elem = filtroTicketsTipo;
    }else if(elementoFiltrar == filtroTicketsAsunto){
       //Si es el filtro para seleccionar los tipos de tickets
       jsonObj.elem = filtroTicketsAsunto;
	}else if(elementoFiltrar == filtroTicketsStatus){
        //Si es el filtro para seleccionar los tipos de tickets
        jsonObj.elem = filtroTicketsStatus;
    }else if(elementoFiltrar == filtroTicketsDescripcion){
    //Si es el filtro para seleccionar los tipos de tickets
        jsonObj.elem = filtroTicketsDescripcion;
    }else if(elementoFiltrar == filtroTicketsNumero){
        //Si es el filtro para seleccionar los tipos de tickets
            jsonObj.elem = filtroTicketsNumero;
    }else if(elementoFiltrar == filtroEmpresas){
        //Si es el filtro para seleccionar los tipos de tickets
            jsonObj.elem = filtroEmpresas;
    }else if(elementoFiltrar == filtroSelEmpleados){
        //Si es el filtro para seleccionar los tipos de tickets
            jsonObj.elem = filtroSelEmpleados;
    }

    var url = "";
    var ajax = objetoAjax();
    url = "../common/set_filtros_personalizados_soporte.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            esperaRespuesta(false);
            if (ajax.status == 200){
                var html_txt = ajax.responseText;
                if(html_txt != ""){
                    var arr_aux = html_txt.split("|");
                    if(arr_aux[0] == 1){
                        showDialog(arr_aux[1]);
                    }else if(arr_aux[0] == 2){
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    }else{
                        var jsonResp = JSON.parse(arr_aux[1]);
                        if(accion == accionLista){
                            irASoporte();
                        }else if(accion == accionFormulario){
                            nuevoSoporte(null,filtro);
                        }else if(accion == accionEdicion){
                            var elementoId = arr_aux[1];
                            //editaElemento(elementoId,filtro);
                        }else if(accion == accionVista){
                            var elementoId = null;
                            if(document.getElementById("id") != null){
                                elementoId = document.getElementById("id").value;
                            }
                            verSoporte(elementoId);   
                        }                        
                        $('body').unbind();
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }
            else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    esperaRespuesta(true);
    ajax.send(JSON.stringify(jsonObj));
}

/**
 * Funcion que resetea los filtros
 *
 */
function limpiarFiltrosSoporte(accion,filtro,idElemento){

    var jsonObj = {};
    var url = "";
    var ajax = objetoAjax();
    url = "../common/reset_filtros_personalizados_soporte.php";
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
                            irASoporte();
                        }else if(accion == accionFormulario){
                            nuevoSoporte(null,filtro);
                        }else if(accion == accionEdicion){
                            //editaElemento(menu_opcion,submenu_opcion,idElemento,filtro);
                        }else if(accion == accionVista){
                            var elementoId = null;
                            if(document.getElementById("id") != null){
                                elementoId = document.getElementById("id").value;
                            }
                            verSoporte(elementoId);
                        }
                        $("#filtro_tickets_topico").pqSelect("refreshData");
                        $("#filtro_tickets_tipo").pqSelect("refreshData");
                        $("#filtro_tickets_asunto").pqSelect("refreshData");
						$("#filtro_tickets_status").pqSelect("refreshData");
                    }
                }else{
                    esperaRespuesta(false);
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                esperaRespuesta(false);
                showDialog(error404);
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
                esperaRespuesta(false);
            }
        }
    };
    ajax.send(JSON.stringify(jsonObj));
    esperaRespuesta(true);
}

function agregarAnexos(){
    nuevo ='<div class="tic_elemento anexo">';
    nuevo += '                          <div class="logotipo">';
    nuevo += '                              <label to="attachments">Archivo</label>';
    nuevo += '                              <input type="file" name="attachments[]" size="40">';        
    nuevo += '                          </div>';
    nuevo += '                          <div class="tic_button" onclick="javascript:borrarAnexos(event);">Borrar</div>';
    nuevo +='</div>';
    $("#anexos").append(nuevo);
}

function borrarAnexos(e){
    e.target.parentNode.remove();
}

function mostrarTodas(){
    $(".ui-accordion-content").css("display", "block");
}


function setfiltroSoporte(valor){
    const boton = document.getElementById("buscador");
    let str_onclick = "";
    if (valor == 'd') {
        str_onclick = "javascript:filtraSoporte("+filtroTicketsDescripcion+",document.getElementById('descripcion').value,1);"
    } else if(valor == 'n'){
        str_onclick = "javascript:filtraSoporte("+filtroTicketsNumero+",document.getElementById('descripcion').value,1);"        
    } else {
        str_onclick = "javascript:showDialog('"+mensaje_error_debe_seleccionar+"');"        

    }

    boton.setAttribute("onclick", str_onclick);
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function formaFecha(fecha) {
    fformat = '';
    if(fecha != ''){
        fullfecha = new Date(fecha); 
                                fformat = [fullfecha.getDate().padLeft(),
                                    (fullfecha.getMonth()+1).padLeft(),
                                    fullfecha.getFullYear()].join('-') +' ' +
                                   [fullfecha.getHours().padLeft(),
                                    fullfecha.getMinutes().padLeft(),
                                    fullfecha.getSeconds().padLeft()].join(':');
    }
    return fformat;
}

function mipaginaActual(val){
    $("#breadcrumbs_header").html("<ol id='breadcrumbs_list'  class='list-reset flex ml-[10px] text-[20px]'><li class='text-[#707070]'>Soporte</li><li><span class='text-[#707070] mx-2'>/</span></li><li class='text-[#707070]'>"+val+"</li></ol>")
}
