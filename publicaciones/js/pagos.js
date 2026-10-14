
let ventana_firma = null;

/**
 * Funcion que cambia el content por formulario de un nuevo elemento
 *
 */
function gestionNuevoPago(menu_opcion, submenu_opcion, elementoId, filtro) {
    if (!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)) {
        var url = "";
        var ajax = objetoAjax();
        url = "../common/gen_new_pago.php?op=" + menu_opcion + "&sub=" + submenu_opcion + (elementoId != null ? "&id=" + elementoId : "") + (filtro != null ? "&filtro=" + filtro : "");
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if (html_txt != "") {
                        var arr_aux = html_txt.split("|");
                        if (arr_aux[0] == 1) {
                            showDialog(arr_aux[1]);
                        } else if (arr_aux[0] == 2) {
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        } else {
                            document.getElementById("content").innerHTML = arr_aux[1];                            
                        }
                    } else {
                        showDialog(noResults);
                    }
                } else if (ajax.status == 404) {
                    showDialog(error404);
                } else if (ajax.status == 500) {
                    showDialog("Error code");
                } else if (ajax.status != 0) {
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        esperaRespuesta(true);
        ajax.send(null);
    } else {
        showDialog(invalidOption);
    }
}

/**
 * Funcion que valida las condicones de RGPD
 *
 */
function firmaContrato(idEmpleado){

    // document.getElementById("botonPrincipal").classList.add('isDisabled');
    document.getElementsByClassName("botonPrincipalContratos")[0].innerText = "Cerrar";
    document.getElementsByClassName("botonPrincipalContratos")[0].onclick = () => hideDialogContrato(idEmpleado);
    pagina = '../common/firmacontrato.php?id='+idEmpleado+'&n=1';
    ventana_firma = window.open(pagina);
}


function hideDialogContrato(idEmpleado) {

    // const modal = document.getElementById('viewContrato');
    // if (modal) {
    //     // Limpiar el contenido anterior
    //     modal.innerHTML = "";
    //     // Ocultar el modal
    //     modal.style.opacity = 0;
    //     modal.style.pointerEvents = 'none';
    // }
    // if (!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)) {
        var url = "";
        var ajax = objetoAjax();
        url = "../common/verificar_contrato.php?" + (idEmpleado != null ? "&id=" + idEmpleado : "");
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if (html_txt != "") {
                        var arr_aux = html_txt.split("|");
                        if (arr_aux[0] == 1) {
                            document.getElementsByClassName("botonPrincipalContratos")[0].innerText = "Firmar";
                            document.getElementsByClassName("botonPrincipalContratos")[0].onclick = () => firmaContrato(idEmpleado);
                        } else if (arr_aux[0] == 2) {
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        } else {
                            const modal = document.getElementById('viewContrato');
                            if (modal) {
                                // Limpiar el contenido anterior
                                modal.innerHTML = "";
                                // Ocultar el modal
                                modal.style.opacity = 0;
                                modal.style.pointerEvents = 'none';
                            }
                            if(ventana_firma){
                                ventana_firma.close();
                            }                            
                        }
                    } else {
                        showDialog(noResults);
                    }
                } else if (ajax.status == 404) {
                    showDialog(error404);
                } else if (ajax.status == 500) {
                    showDialog("Error code");
                } else if (ajax.status != 0) {
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        esperaRespuesta(true);
        ajax.send(null);
    // } else {
    //     showDialog(invalidOption);
    // }
}

/**
 * 
 * 
 */
function getDatosPago(frecuencia){
    empresas_id = document.getElementById('id_empresa').value;
    frecuencia = frecuencia.value;
    var formData = new FormData();
    formData.append('empresas_id', empresas_id);
    formData.append('frecuencia', frecuencia);
    var ajax = objetoAjax();
        var url = "../common/get_datos_pago.php";
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                esperaRespuesta(false);
                if (ajax.status == 200) {
                    var html_txt = ajax.responseText;
                    if (html_txt != "") {
                        var arr_aux = html_txt.split("|");
                        if (arr_aux[0] == 1) {
                            showDialog(arr_aux[1]);
                        } else if (arr_aux[0] == 2) {
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        } else {
                            let jsonResponse = JSON.parse(arr_aux[1]);
                            document.getElementById('tasa').value = jsonResponse.tasa;
                            document.getElementById('costo').value = jsonResponse.costo;
                            document.getElementById('total').value = jsonResponse.total;
                            document.getElementById('monto').value = jsonResponse.monto;
                            
                        }
                    } else {
                        showDialog(noResults);
                    }
                } else if (ajax.status == 404) {
                    showDialog(error404);
                } else {
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);

}
// Esperar a que cargue todo el documento HTML
window.addEventListener('load', () => {
    // Evento:click Agregar
    // document.getElementById("cantidad").focus();
});
/** Borrar fila de la tabla */
function borrarFilaPago(e){
    // obtener el id del empleado para mandar a mostrarlo en el selector
    let id = e.target.getAttribute('data-id');
    let servicio = document.querySelector('#'+id);
    // Activar el servicio
    servicio.dataset.usado = 0;

    // remover la fila
    e.target.parentNode.parentNode.remove();

    
};
function  actMonto(cantidad) {
    let precio = document.querySelector('#precio');
    let monto = document.querySelector('#monto');
    monto.value = precio.value*cantidad;
}

function  validaCodigo(e,fecha,objeto,menu_opcion,submenu_opcion) {
    e.preventDefault();
    let hoy = new Date(fecha);
    let codigo = objeto.value;
    let fecha_ini,fecha_fin,porc;
    let iva = parseFloat(objeto.dataset.iva);
    let monto = parseFloat(objeto.dataset.monto);
    let factor = parseFloat(objeto.dataset.factor);
    let key = objeto.dataset.key;
    let id_paises = objeto.dataset.id_paises;

    /**
     * Validación de cupo provicional
     */
    //if(codigo.length > 10){

        let url = "";
        let ajax = objetoAjax();
        tarjetas = new Array();
        roles = new Array();
        url = "../common/get_promocion.php?op=" + menu_opcion + "&sub=" + submenu_opcion +  "&codigo=" + codigo + "&id_paises=" + id_paises;
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
                            promocion = JSON.parse(arr_aux[1]);
                            porc = promocion.porcentaje;
                            fecha_ini = new Date(promocion.fecha_inicio);
                            fecha_fin = new Date(promocion.fecha_final);
                            id_promocion = promocion.id_promocion;
                            let tr_desc = "tr_desc_"+key;
                            let desc = "desc_"+key;
                            let m_desc = "mdesc_"+key;
                            let base = "base_"+key;
                            let result = "monto_"+key;
                            let eiva = "iva_"+key;
                            if(porc != 0){
                                if(fecha_ini.valueOf() <= hoy.valueOf() && hoy.valueOf() <= fecha_fin.valueOf()){                                    
                                    objeto.dataset.porc = porc;
                                    document.getElementById(desc).className = "exito";
                                    let mdesc = (monto * porc / 100) * factor;
                                    document.getElementById(desc).innerHTML = '% '+porc;
                                    document.getElementById(m_desc).innerHTML = mdesc.toFixed(2);
                                    document.getElementById(tr_desc).classList.remove('ocultar');
                                    desc = (monto - (monto * porc / 100))*factor;
                                    document.getElementById(base).innerHTML = desc.toFixed(2);
                                    calc = desc + (desc * iva / 100);
                                    miva = (desc * iva / 100);
                                    document.getElementById(eiva).innerHTML = ' '+miva.toFixed(2);
                                    objeto.dataset.total = (monto - (monto * porc / 100)) + ((monto - (monto * porc / 100)) * iva / 100)
                                    objeto.dataset.id_promocion = id_promocion
                                    document.getElementById(result).innerHTML = calc.toFixed(2);
                                } else {
                                    porc = 'Inactivo';
                                    objeto.dataset.porc = 0;
                                    document.getElementById(tr_desc).classList.add('ocultar');
                                    document.getElementById(desc).innerHTML = porc;
                                    document.getElementById(desc).className = "advertencia";
                                    desc = monto * factor;
                                    document.getElementById(base).innerHTML = desc.toFixed(2);
                                    document.getElementById(base).innerHTML = desc.toFixed(2);
                        
                                    calc = desc + (desc * iva / 100);
                                    miva = (desc * iva / 100);
                                    document.getElementById(eiva).innerHTML = miva.toFixed(2);
                                    objeto.dataset.total = monto + (monto * iva / 100);
                                    objeto.dataset.id_promocion = "";
                                    document.getElementById(result).innerHTML = calc.toFixed(2);
                                }
                            } else {
                                objeto.dataset.porc = 0;
                                document.getElementById(tr_desc).classList.add('ocultar');
                                document.getElementById(desc).innerHTML = porc;
                                document.getElementById(desc).className = "exito";
                                desc = monto * factor;
                                document.getElementById(base).innerHTML = desc.toFixed(2);
                                calc = desc + (desc * iva / 100);
                                miva = (desc * iva / 100);
                                document.getElementById(eiva).innerHTML = miva.toFixed(2);
                                objeto.dataset.total = monto + (monto * iva / 100);
                                objeto.dataset.id_promocion = "";
                                document.getElementById(result).innerHTML = calc.toFixed(2);
                            }
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

    //}
    /**
     * Fin de validación de  cupo provicioncial
     */

}

function  agregarFilaPago(e,menu_opcion,submenu_opcion,factor,servicio){
    e.preventDefault();
    if(servicio.value == "" || servicio.value < 1 ){
        showDialog("Debe solicitar por lo menos 1");
    } else if(servicio.dataset.usado == '0') {
        let monto = servicio.value*servicio.dataset.precio*factor;
        let precio = servicio.dataset.precio*factor;
        let fila = `
        <tr>
            <td>&nbsp;</td>
            <td>
                ${servicio.dataset.servicio}
                <input type="hidden" name="id_tipo_servicio[]" value="${servicio.dataset.id_tipo_servicio}">
                <input type="hidden" name="id_producto[]" value="${servicio.dataset.producto}">
                <input type="hidden" name="id_empresas[]" value="${servicio.dataset.empresa}">
            </td>
            <td>
                ${servicio.value}
                <input type="hidden" name="cantidad[]" value="${servicio.value}">
            </td>
            <td>
                ${precio.toFixed(2)}
                <input type="hidden" name="precio[]" value="${servicio.dataset.precio}">
            </td>
            <td>
                ${monto.toFixed(2)}
            </td>
            <td><button class="borrar" data-id="${servicio.getAttribute("id")}">Borrar</button></td>
        </tr>
        `;
        // tabla donde se agregarán las filas de los registros
        let tabla = document.querySelector('#tabla tbody');
        //let compras = document.querySelector('#compras tbody');
        // agregar fila
        //compras.style.display = "block";
        tabla.innerHTML += fila;
        servicio.dataset.usado = 1;
        // Evento:Click #borrar => para todos los botones
        document.querySelectorAll('.borrar').forEach(elem => elem.addEventListener('click', borrarFilaPago));
    } else {
        showDialog("Ya esta en uso");
    }
};

/**
 * Funcion que cambia el content por formulario de un nuevo elemento
 *
 */
function  cargarPlan(e,menu_opcion,submenu_opcion,datos) {
    e.preventDefault();
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        let url = "";
        let ajax = objetoAjax();
        let monto = datos.dataset.monto
        let frecuencia = datos.dataset.frecuencia
        let porcentaje = datos.dataset.porc
        let id_promocion = datos.dataset.id_promocion
        let id_compra = datos.dataset.id_compra
        let total = datos.dataset.total
        let cantidad = datos.dataset.cantidad
        let servicio = datos.dataset.servicio
        let precio = datos.dataset.precio
        tarjetas = new Array();
        roles = new Array();
        url = "../common/carga_pago.php?op=" + menu_opcion + "&sub=" + submenu_opcion +  "&monto=" + monto + "&frecuencia=" + frecuencia + "&porcentaje=" + porcentaje+ "&total=" + total+ "&precio=" + precio+ "&cantidad=" + cantidad+"&id_promocion="+id_promocion+"&id_compra="+id_compra+"&servicio="+servicio;
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
                            indicePlan = null;
                            idElementoCalendario = 0;
                            $(function () {
                                $.datepicker.setDefaults($.datepicker.regional["es"]);
                                $("#fecha").datepicker({
                                    firstDay: 1,
                                    dateFormat: "dd-mm-yy",
                                    maxDate: "0"
                                });
                            });
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




/**
 * Funcion que recarga la lista de tipos de pagos.
 *
 */
 function reloadTipoPagos(tipos){
    let selectBox = document.getElementById('id_tipos_pagos');
    let texto = selectBox.options[0].text;
    selectBox.options.length = 0;
    selectBox.options[0] = new Option(texto,"");

    if(tipos.value != ""){
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/recarga_tipos_pagos.php?id=" + tipos.value;
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);

                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            flag_echar = true;
                        }else if(jsonData.estado == 0){
                            let arr_destinos = jsonData.destino;
                            //arr_destinos.forEach(function(descripcion,key) {
                            Object.entries(arr_destinos).forEach(entry => {
                                const [key, descripcion] = entry;
                                selectBox.options[selectBox.options.length]=new Option(descripcion, key);
                            });
                            if (tipos.value == "3"){
                                document.getElementById('datos').classList.add('hidden');
                                document.getElementById('datos').classList.add('ocultar');
                                document.getElementById('fecha').removeAttribute('required');
                                document.getElementById('referencia').removeAttribute('required');
                                document.getElementById('referencia').value = 'Sin referencia';
                                document.getElementById('monto').removeAttribute('required');
                                selectBox.value = '5';
                                selectBox.removeAttribute('required');
                            } else {
                                document.getElementById('datos').classList.remove('hidden');
                                document.getElementById('datos').classList.remove('ocultar');
                                document.getElementById('fecha').setAttribute('required', 'required');
                                document.getElementById('referencia').setAttribute('required', 'required');
                                document.getElementById('referencia').value = '';
                                document.getElementById('monto').setAttribute('required', 'required');
                                selectBox.setAttribute('required', 'required');
                                selectBox.value = '';
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
        } 
        esperaRespuesta(true);
        ajax.send(null);
    }
}

 /**
  * Funcion que muestra opciones a configurar para generar una vista u informe
  *
  */
  function gestionarPago(menu_opcion,submenu_opcion,elemento_id,accion){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion) && elemento_id != "" && !isNaN(accion)){
        var url = "";
        var ajax = objetoAjax();
        tarjetas = new Array();
        url = "../common/gen_gestion_pagos.php?op=" + menu_opcion + "&sub=" + submenu_opcion + '&id=' + elemento_id + '&accion=' + accion;
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
                            if(accion == 16){
                                if (arr_aux[2]===undefined) {
                                    document.getElementById("content").innerHTML = arr_aux[1];
                                } else {
                                    document.getElementById("content").innerHTML = arr_aux[1];
                                    //console.log(arr_aux[1]);                                  
                                    $("#acordeon").accordion({
                                        heightStyle: "content",
                                        collapsible: true,
                                        active: parseInt(arr_aux[2])
                                      });
                                }
                                toggleAccionActivar(null);
                                toggleAccionDesactivar(null);                            
                                //$("#acordeon" ).accordion();
                            } else {
                                showDialog(arr_aux[1]);
                                irAContenido(menu_activo,menu_opcion,submenu_opcion);
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
        esperaRespuesta(true);
        ajax.send(null);
    }else{
        showDialog(invalidOption);
    }
}
/**
 * Funcion para validar que se ingrese solo numeros.
 */
function validaNumero(evt){
			
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;
    
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      return true;
    } else{ // other keys.
      return false;
    }
}

/**
 * Funcion que cancela el formulario actual y vuelve atras
 *
 */
 function irCompras(menu){
     irAContenido(menu,2,238);
     hideDialog()
}

/**
 * Funcion que guarda un nuevo documento de contrata
 *
 */
function guardaPago(menu_opcion, submenu_opcion) {
    if (!isNaN(menu_opcion) && menu_opcion >= 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)) {
        var formulario = document.getElementById("nuevo_elemento");
        var longitudFormulario = formulario.elements.length;
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        var re = /^\w+$/;
        //var re2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        for (var i = 0; i <= (longitudFormulario - 1); i++) {
            if (formulario.elements[i].required == true && formulario.elements[i].value == "") {
                showDialog(mensaje_faltan_campos);
                formulario.elements[i].classList.add("requerido");
                return false;
            } else if (formulario.elements[i].name == "name" && !re.test(formulario.elements[i].value)) {
                showDialog(formulario.elements[i].name + mensaje_error_caracteres);
                return false;
            }
            if (formulario.elements[i].type != 'file') {
                if (formulario.elements[i].type == "checkbox") {
                    if (formulario.elements[i].checked == true) {
                        formData.append(formulario.elements[i].name, formulario.elements[i].value);
                    }
                } else {
                    formData.append(formulario.elements[i].name, formulario.elements[i].value);
                }
            } else if (formulario.elements[i].value != '') {
                var files = formulario.elements[i].files;
                formData.append(formulario.elements[i].name, files[0], files[0].name);
            }
        }
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/save_pagos.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if (html_txt != "") {
                        var arr_aux = html_txt.split("|");
                        if (arr_aux[0] == 1) {
                            showDialog(arr_aux[1]);
                        } else if (arr_aux[0] == 2) {
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        } else {
                            showDialog(arr_aux[1]);
                            if (menu_opcion == 0 && submenu_opcion == 0) {
                                window.location.reload();
                            } else {
                                irAContenido(menu_activo, menu_opcion, submenu_opcion);
                            }
                        }
                    } else {
                        showDialog(noResults);
                    }
                } else if (ajax.status == 404) {
                    showDialog(error404);
                } else if (ajax.status != 0) {
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
    } else {
        showDialog(invalidOption);
    }
}
