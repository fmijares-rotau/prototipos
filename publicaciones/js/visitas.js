//Función que carga el formulario para invitar visitas
function invitar(menu_opcion, submenu_opcion){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        var url = "";
        var ajax = objetoAjax();
        url = `../common/gen_view_invitar_visita.php?op=${menu_opcion}&sub=${submenu_opcion}`;
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
            }
        };
        esperaRespuesta(true);
        ajax.send(null);
    }else{
        showDialog(invalidOption);
    }
}

//Función que muestra los campos para los datos del vehículo
function showFormVehiculo(elementoVehiculo){
    if(elementoVehiculo){
        if(elementoVehiculo.checked){
            document.getElementById('marca').parentNode.style.display = 'block';
            document.getElementById('modelo').parentNode.style.display = 'block';
            document.getElementById('color').parentNode.style.display = 'block';
            document.getElementById('matricula').parentNode.style.display = 'block';
        }else{
            document.getElementById('marca').parentNode.style.display = 'none';
            document.getElementById('modelo').parentNode.style.display = 'none';
            document.getElementById('color').parentNode.style.display = 'none';
            document.getElementById('matricula').parentNode.style.display = 'none';
        }
    }
}

//Función que envía los datos de la visita
function enviaDatos(menu_opcion, submenu_opcion){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        let formData = new FormData();
        try{
            formData = validaDatosVisita();
        }catch(error){
            showDialog(error.message);
            return;
        }
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        var url = "";
        var ajax = objetoAjax();
        url = '../common/send_mail_invitar_visita.php';
        ajax.open("POST", url, true);
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
                            irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            showDialog(arr_aux[1]);
                        }
                    }else{
                        showDialog("No se han encontrado resultados con los parametros introducidos");
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

//Función que valida los datos del formulario
function validaDatosVisita(){
    const formData = new FormData();

    let fechaHoraInicio = '';
    let fechaHoraFin = '';

    const itemElementos = document.getElementsByClassName("item_elemento");
    for(let i = 0; i < itemElementos.length; i++){
        if(itemElementos[i].style.display !== 'none'){
            if(itemElementos[i].children[1].hasAttribute('required') && itemElementos[i].children[1].value === ""){
                throw new Error(`El campo ${itemElementos[i].children[0].textContent} es obligatorio`);
            }
            if(itemElementos[i].children[1].name === 'email' && validateEmail(itemElementos[i].children[1].value) === false){
                throw new Error(`Email no válido`);
            }
            if(itemElementos[i].children[1].name === 'fecha_inicio_visita'){
                fechaHoraInicio = itemElementos[i].children[1].value;
            }
            if(itemElementos[i].children[1].name === 'hora_inicio_visita'){
                fechaHoraInicio += ' ' + itemElementos[i].children[1].value;
            }
            if(itemElementos[i].children[1].name === 'fecha_fin_visita'){
                fechaHoraFin = itemElementos[i].children[1].value;
            }
            if(itemElementos[i].children[1].name === 'hora_fin_visita'){
                fechaHoraFin += ' ' + itemElementos[i].children[1].value;
            }
            if(itemElementos[i].children[1].name === 'vehiculo'){
                formData.append(itemElementos[i].children[1].name, itemElementos[i].children[1].checked);
                continue;
            }
            formData.append(itemElementos[i].children[1].name, itemElementos[i].children[1].value);
        }
    }

    //Validar las fechas
    let hoy = Date.now();
    fechaHoraInicio = new Date(fechaHoraInicio).getTime();
    fechaHoraFin = new Date(fechaHoraFin).getTime();

    if(fechaHoraInicio < hoy){
        throw new Error(`La fecha de inicio no puede ser menor que hoy`);
    }
    if(fechaHoraInicio > fechaHoraFin){
        throw new Error(`La fecha de inicio no puede ser mayor que la fecha de fin`);
    }

    return formData;
}

//Función que valida el email
function validateEmail(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex) ? true : false;
}

//Función que carga el formulario que rellenó el visitante
function showFormularioVisita(menu_opcion, submenu_opcion, id_visita){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion) && !isNaN(id_visita)){
        var url = "";
        var ajax = objetoAjax();
        url = `../common/gen_view_formulario_visita.php?op=${menu_opcion}&sub=${submenu_opcion}&id=${id_visita}`;
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
            }
        };
        esperaRespuesta(true);
        ajax.send(null);
    }else{
        showDialog(invalidOption);
    }
}

//Función que guarda los datos del formulario
function guardaFormularioVisitas(menu_opcion, submenu_opcion){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        let formData = new FormData();
        try{
            formData = validaDatosFormulario();
        }catch(error){
            showDialog(error.message);
            return;
        }
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        var url = "";
        var ajax = objetoAjax();
        url = '../common/save_formulario_visita.php';
        ajax.open("POST", url, true);
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
                            irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            showDialog(arr_aux[1]);
                        }
                    }else{
                        showDialog("No se han encontrado resultados con los parametros introducidos");
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

//Valida los datos del formulario
function validaDatosFormulario(){
    const formData = new FormData();

    const itemElementos = document.getElementsByClassName("item_elemento");
    for(let i = 0; i < itemElementos.length; i++){
        switch(itemElementos[i].id){
            case 'tarea_zona':
            case 'pais':
            case 'productos':
                formData.append(itemElementos[i].children[1].name, itemElementos[i].children[1].value);
                break;
            case 'normas_higiene':
            case 'padecimiento':
            case 'paises_vacunacion':
            case 'instalaciones':
            case 'granjas':
            case 'grabacion':
            case 'alimentos':
                formData.append(itemElementos[i].children[0].name, itemElementos[i].children[0].checked);
                break;
            case 'contratante':
            case 'elementos_protectores':
            case 'dep_calidad':
            case 'ropa_protectora':
            case 'alergenos':
            case 'conservar':
            case 'prohibidos':
                formData.append(itemElementos[i].children[1].name, itemElementos[i].children[1].checked);
                break;
            default:
                formData.append(itemElementos[i].children[0].name, itemElementos[i].children[0].value);
                break;
        }

    }

    return formData;
}

//Función para activar/desactivar los items dependientes de un checkbox
function activaItemsDependientes(elemento){
    if(elemento){
        document.querySelectorAll(`[data-${elemento.name}]`).forEach(item => {
            switch(item.dataset[elemento.name]){
                case 'display':
                    item.style.display = elemento.checked ? 'block' : 'none';
                    break;
                case 'checked':
                    if(!elemento.checked) item.checked = false;
                    break;
                case 'value':
                    if(!elemento.checked) item.value = "";
                    break;
                default:
                    break;
            }
        });   
    }
}

/**
 * Funcion que exporta el formulario a PDF
 */
function imprimirFormulario(menu_opcion, submenu_opcion, tipo, idVisitas){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion) && !isNaN(idVisitas)){
        var formData = new FormData();

        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        formData.append('id_visitas', idVisitas);    

        var url = "";
        var ajax = objetoAjax();
        url = "../common/print_formulario_visitas.php";
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    informeProcess = 0;
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var arr_aux = html_txt.split("|");
                        console.log(arr_aux);
                        if(arr_aux[0] == 1){
                            var jsonData = JSON.parse(arr_aux[1]);
                            showDialog(jsonData.mensaje);
                        }else if(arr_aux[0] == 2){
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        }else if(arr_aux[0] == 3){
                            if(id < informeEvaluacionEncuestas){
                                window.open(arr_aux[1]);
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
                            }else{
                                if (arr_aux[2] === undefined) {
                                    document.getElementById("content").innerHTML = arr_aux[1];
                                } else {
                                    document.getElementById("content").innerHTML = arr_aux[1];
                                    $("#acordeon").accordion({
                                        heightStyle: "content",
                                        collapsible: true,
                                        active: parseInt(arr_aux[2])
                                      });
                                }
                            }
                        }else if(arr_aux[0] == 4){
                            showDialog(arr_aux[1]);
                        }else{
                            var jsonData = JSON.parse(arr_aux[1]);
                            if(jsonData.mensaje == null){
                                if(tipo == printPDF){
                                    var arrDocumentos = jsonData.arr_html;
                                    var arrNombres = jsonData.arr_nombres;
                                    var arrOrientacion = jsonData.arr_orientacion;

                                    paginasImpresion = arrNombres.length;
                                    if(arrNombres.length > 1){
                                        showConfirm("Se van a generar " + arrNombres.length + " archivos para completar la tarea\nno cierre la ventana hasta que hayan concluido todos",
                                                crearPDF,
                                                arrDocumentos,
                                                arrNombres,
                                                arrOrientacion);
                                    }else{
                                        crearPDF(arrDocumentos,arrNombres,arrOrientacion);
                                    }
                                }else if(tipo == printExcel){
                                    window.open(jsonData.enlace);
                                }else if(tipo == printExportaExcel){
                                    window.open(jsonData.enlace);
                                }else if(tipo == printScreen){
                                    window.open(jsonData.enlace);
                                }else if(tipo == printVacacionesDevengadas){
                                    window.open(jsonData.enlace);
                                }else if(tipo == printTicketsAcumRestaurant){
                                    window.open(jsonData.enlace);
                                }else if(tipo == printTXT){
                                    var arrDocumentos = jsonData.arr_txt;
                                    var arrNombres = jsonData.arr_nombres;
                                    var flagPDF = false;
                                    paginasImpresion = arrNombres.length;
                                    if(arrNombres.length > 1){
                                        showConfirm("Se van a generar " + arrNombres.length + " archivos para completar la tarea\nno cierre la ventana hasta que hayan concluido todos",
                                                crearTXT,
                                                arrDocumentos,
                                                arrNombres);
                                    }else{
                                        crearTXT(arrDocumentos,arrNombres);
                                    }
                                }
                            }else{
                                showDialog(jsonData.mensaje);
                            }
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                }else if(ajax.status==500){
                    showDialog("El tamaño de los datos manejados es muy grande,\nreduciendo busqueda a la última semana");
                    setLastWeek(menu_opcion,submenu_opcion);
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                    esperaRespuesta(false);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
        informeProcess = 1;
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Displays a dialog box to set the visit's departure date and time.
 * 
 * @param {string} seccion - The section of the visit.
 * @param {string} elemento - The element of the visit.
 * @param {string} idVisita - The ID of the visit.
 */
function showInputVisitas(seccion, elemento, idVisita){
    var caja = document.getElementById('openModal');
    if(caja != null){
        var divElement = document.createElement('div');
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = 'X';
        anchorElement.title = 'Close';
        anchorElement.className = 'close';
        anchorElement.onclick = function(){
            hideDialog();
            if(flag_echar == true){
                window.location = "../inc/salir.php";
                flag_echar= false;
            }else if(flag_recarga == true){
                window.location.reload();
                flag_recarga= false;
            }
        };
        
        var h2Element = document.createElement('h2');
        h2Element.innerHTML = "Establecer salida de la visita";
        
        const fechaHora = new Date()

        var labelFecha = document.createElement('label');
        labelFecha.innerHTML = "Fecha";
        
        var inputFecha = document.createElement('input');
        inputFecha.setAttribute("type", "date");
        inputFecha.setAttribute("value", fechaHora.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'));
        inputFecha.setAttribute("class", "dialogInput");
        
        var labelHora = document.createElement('label');
        labelHora.innerHTML = "Hora";
        labelHora.style.marginLeft = "15px";
        
        var inputHora = document.createElement('input');
        inputHora.setAttribute("type", "time");
        inputHora.setAttribute("value", fechaHora.toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit', second: '2-digit'}));
        inputHora.setAttribute("class", "dialogInput");
        
        var okButton = document.createElement('a');
        okButton.innerHTML = aceptar.toUpperCase();
        okButton.title = 'Guardar';
        okButton.className = 'button';
        okButton.onclick = function(){
            hideDialog();
            finalizarVisita(seccion, elemento, idVisita, inputFecha.value, inputHora.value);
        };
        
        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = cancela.toUpperCase();
        cancelButton.title = 'Cancelar';
        cancelButton.className = 'button';
        cancelButton.onclick = function(){
            hideDialog();
            paginasImpresion = 0;
        };
        
        divElement.appendChild(anchorElement);
        divElement.appendChild(h2Element);
        divElement.appendChild(labelFecha);
        divElement.appendChild(inputFecha);
        divElement.appendChild(labelHora);
        divElement.appendChild(inputHora);
        divElement.appendChild(okButton);
        divElement.appendChild(cancelButton);
        hideDialog();
        caja.appendChild(divElement);
        caja.style.opacity = 1;
        caja.style.pointerEvents = "auto";
    }
}

/**
 * Finalizes a visit.
 * 
 * @param {number} menu_opcion - The menu option.
 * @param {number} submenu_opcion - The submenu option.
 * @param {number} visitaId - The visit ID.
 * @param {string} [fecha] - The date of the visit (optional).
 * @param {string} [hora] - The time of the visit (optional).
 */
function finalizarVisita(menu_opcion, submenu_opcion, visitaId, fecha, hora){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion) && !isNaN(visitaId)){
        var url = "";
        var ajax = objetoAjax();

        if(fecha === undefined || hora === undefined){
            url = `../common/get_finalizar_visita.php?id=${visitaId}`;
        }else{
            url = `../common/get_finalizar_visita.php?id=${visitaId}&fecha=${fecha}&hora=${hora}`;
        }

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
                            showDialog(arr_aux[1]);
                            irAContenido(menu_activo,menu_opcion,submenu_opcion);
                        }
                    }else{
                        showDialog(noResults);
                    }
                }else if(ajax.status==404){
                    showDialog(error404);
                    esperaRespuesta(false);
                }
                else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                    esperaRespuesta(false);
                }
            }
        };
        ajax.send(null);
        esperaRespuesta(true);
    }
}
