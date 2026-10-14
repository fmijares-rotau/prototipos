/**
 * Funcion que agrega una fila de empleados a cargar en un organigrama
 *
 */

function agregarFilaOrganigrama(){
    let tabla = document.querySelector('#tabla');
    let titulo = document.querySelector('#titulo-lista');
    let selEmp = document.querySelector('#id_empleado_org');
    let selDep = document.querySelector('#id_empleado_org_dependencia');
    let tit = document.querySelector('#tit').value;
    let sub = document.querySelector('#sub').value;
    let col = document.querySelector('#col').value;
    let msjs = document.querySelector('#msjs');
    let empValor = selEmp.value;
    let depValor = selDep.value;
    let empText = selEmp.options[selEmp.selectedIndex].text;
    let option = new Option(empText, empValor);

    tit = escapeHTML(tit);
    sub = escapeHTML(sub);   

    selDep.appendChild(option); 

    // analisis de datos para actualizar la cantidad de niveles
    if ((arr_hijos.includes(empValor) == false) && (arr_padres.includes(empValor) == false)) {
        if ((arr_padres.includes(depValor) == false) && (arr_otros.includes(depValor) == false)) {
            arr_padres.push(depValor);
            arr_hijos.push(empValor);
            $("#niveles").val(arr_hijos.length);
        } else {
            if ((arr_otros.includes(empValor) == false) && (arr_otros.includes(depValor) == false)) {
                arr_otros.push(empValor);
            }
        }
    }

    // total registros (Para verificar que no se guarden sin al menos uno)
    let valTotalRegistros = () => document.querySelector('#tabla tbody').querySelectorAll('tr').length;
    
    // borrar cualquier mensaje
    msjs.innerHTML = '';

    // validar si el selector esta vacio para mostrar mensaje y detener
    if (selEmp.value === '0') {
        msjs.innerHTML = '<div style="display:inline-block;margin-left:30px;color:red;">'+mensaje_seleccionar_empleado+'</div>';
        setTimeout(() => { msjs.innerHTML = ''; },3000);
        return;
    }
    // tabla donde se agregarán las filas de los registros
    let fila = document.querySelector('#tabla tbody');
    let emp = selEmp.querySelector(`option[value="${selEmp.value}"]`).text;
    let dep = selDep.querySelector(`option[value="${selDep.value}"]`).text;
    if (selDep.value == 0) dep = sin_dependencia;

    // mostramos el titulo y encabezado de la tabla de empleados agregados
    titulo.classList.remove('oculto');
    tabla.classList.remove('oculto');

    // definimos la estructura de la fila para la tabla
    let nuevaFila = `
        <tr>
            <td width="20%" style="vertical-align:middle">${emp}<input type="text" id="emp" name="id_empleado_org[]" value="${selEmp.value}"><input type="text" id="name_emp-${selEmp.value}" value="${emp}"></td>
            <td width="20%" style="vertical-align:middle">${dep}<input type="text" id="dep" name="id_empleado_org_dependencia[]" value="${selDep.value}"></td>
            <td width="20%" style="vertical-align:middle"><input style="text-align:left; display:inline-block; margin-top:5px" maxlength="32" size="30" type="text" name="titulo[]" value="${tit}"></td>
            <td width="20%" style="vertical-align:middle"><input style="text-align:left; display:inline-block; margin-top:5px" maxlength="32" size="30" type="text" name="subtitulo[]" value="${sub}"></td>
            <td align="center" width="8%" style="vertical-align:middle">
                <input style="display:inline-block; margin-top:5px" type="color" name="color[]" value="${col}">
            </td>            
            <td align="center" width="8%" style="vertical-align:middle">
                <a class="borrar tabla_accion" data-id="${selEmp.value}" onclick="javascript:showConfirm(mensaje_confirma_borrar_empleado_organigrama,borrarFilaOrganigrama,${selEmp.value});">${borrar}</a>    
            </td>
        </tr>
    `;

    // agregar fila
    fila.innerHTML += nuevaFila;

    // ocultamos la opcion del selector
    //selEmp.querySelector(`option[value="${selEmp.value}"]`).remove;
    $(`#id_empleado_org option[value="${selEmp.value}"]`).remove();

    // reiniciamos las opciones del listado
    selEmp.value = '0';
    selDep.value = '0';    
    document.querySelector('#tit').value = "";
    document.querySelector('#sub').value = "";
    //document.querySelector('#col').value = "#5889d6";

    //Agregamos el total de empleados a el campo cant_empleados
    $("#cant_empleados").val(valTotalRegistros());

    //Refrescamos los PQSelect
    $("#id_empleado_org").pqSelect("refreshData");
    $("#id_empleado_org_dependencia").pqSelect("refreshData");   

}

/**
 * Funcion que borra una fila de empleados cargados en un organigrama
 *
 */

 function borrarFilaOrganigrama(id) {
    // total registros (Para verificar que no se guarden sin al menos uno)
    let valTotalRegistros = () => document.querySelector('#tabla tbody').querySelectorAll('tr').length;

    // titulo del listado de empleados
    let titulo = document.querySelector('#titulo-lista');

    // Variables que contienen el selector de empleados y dependencias
    let selEmp = document.querySelector('#id_empleado_org');
    let selDep = document.querySelector('#id_empleado_org_dependencia');

    // remover la fila
    let txtempl = $('#name_emp-'+id).val();
    $(`a[data-id="${id}"]`).parent().parent().remove();
   


    borrarDep(id);
    function borrarDep(id) {
        $("#tabla tbody tr").each(function(n,item){
            var emp = $(item).find('input[id="emp"]').val();
            var dep = $(item).find('input[id="dep"]').val();
            if (dep == id) {
                borrarDep(emp);
                $(this).closest('tr').remove();
                let option = new Option(txtempl, emp);
                selEmp.appendChild(option); 
                $(`#id_empleado_org_dependencia option[value="${emp}"]`).remove();
            }
        });
    }

    // Iniciallizamos arreglos que permiten el conteo de niveles
    arr_hijos = new Array;
    arr_padres = new Array;
    arr_otros = new Array;          

    // Realizamos el proceso de conteo de niveles ubicando cada valor en el arreglo correpondiente
    $("#tabla tbody tr").each(function(n,item){
        var emp = $(item).find('input[id="emp"]').val();
        var dep = $(item).find('input[id="dep"]').val();

        if ((arr_hijos.includes(emp) == false) && (arr_padres.includes(emp) == false)) {
            if ((arr_padres.includes(dep) == false) && (arr_otros.includes(dep) == false)) {
                arr_padres.push(dep);
                arr_hijos.push(emp);
                $("#niveles").val(arr_hijos.length);
            } else {
                if ((arr_otros.includes(emp) == false) && (arr_otros.includes(dep) == false)) {
                    arr_otros.push(emp);
                }
            }
        }

    });      

    // mostrar el empleado
    //selEmp.querySelector(`option[value="${id}"]`).classList.remove('oculto');
    //selDep.querySelector(`option[value="${id}"]`).remove();

    let option = new Option(txtempl, id);
    selEmp.appendChild(option); 
    $(`#id_empleado_org_dependencia option[value="${id}"]`).remove();


    let totalReg = valTotalRegistros(); 

    // si el total de filas es = a 0 quitamos el titulo y el encabezado de tabla
    if (totalReg == 0) {
        titulo.classList.add('oculto');
        tabla.classList.add('oculto');
    }
    $("#cant_empleados").val(valTotalRegistros());

    //$("#cant_empleados").val(document.querySelector('#tabla tbody').querySelectorAll('tr').length);
    if ($("#cant_empleados").val() == 0) {
        arr_hijos = new Array;
        arr_padres = new Array;
        arr_otros = new Array;
        $("#niveles").val(arr_hijos.length); 
    }

    $("#id_empleado_org").pqSelect("refreshData");   
    $("#id_empleado_org_dependencia").pqSelect("refreshData");   


}

function eliminarEmpresa() {
    $(".ui-icon-close").on('click', function() {
        id= $('#select_empresas_organigramas').find('option:nth('+$(this).parent().attr('data-id')+')').val();
        $("#tabla tbody").find('tr[data-emp="'+id+'"]').each(function(n,item){
            id = $(item).find('td:first input').val();
            $("#id_empleado_org_dependencia").find(`option[value="${id}"]`).addClass('oculto');

            $(item).remove();
            let valTotalRegistros = () => document.querySelector('#tabla tbody').querySelectorAll('tr').length;
            $("#cant_empleados").val(valTotalRegistros());
        });
    })
}

function buscaAgregados() {
    let idempleados = [];
    $('#tabla tbody tr').each(function() {
        idempleados.push($(this).find('td:first input').val());
    });
    return idempleados;
}

/**
 * Funcion que recarga la lista de empleados de una empresa si flag_empleado_organigrama esta activo
 *
 */
 function reloadEmpleadoByOrg(selectBox,menu_opcion,submenu_opcion){
	if(selectBox != null){
		empresa_id = selectBox;
        if(document.getElementsByClassName("empleado_org") != null){
            empleadoOrgSelect = document.getElementsByClassName("empleado_org")[0];
            texto = empleadoOrgSelect.options[0].text;
            empleadoOrgSelect.options.length = 0;
            empleadoOrgSelect.options[0] = new Option(texto,"0");
        }
        if(document.getElementsByClassName("departamentos_organigramas") != null){
            departamentoOrgSelect = document.getElementsByClassName("departamentos_organigramas")[0];
            texto = departamentoOrgSelect.options[0].text;
            departamentoOrgSelect.options.length = 0;
            departamentoOrgSelect.options[0] = new Option(texto,"0");
        }
        if(empresa_id != ""){
            var url = "";
            var ajax = objetoAjax();;
            url = "../common/recarga_empleados_organigrama.php?id=" + empresa_id + "&op=" + menu_opcion + "&sub=" + submenu_opcion;
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
                                //var arr_empleados = jsonData.empleados;

                                const empleados = Object.entries(jsonData.empleados);
                                empleados.sort((a, b) => a[1].localeCompare(b[1])); // Ordenar por nombre

                                const departamentos = Object.entries(jsonData.departamentos);
                                departamentos.sort((a, b) => a[1].localeCompare(b[1])); // Ordenar por nombre

                                if(typeof empleadoOrgSelect != "undefined"){
                                    // $("#id_empleado_org_dependencia").html('');
                                    // $("#id_empleado_org_dependencia").append('<option value="0">'+seleccionar_empleado+'</option>');
                                    empleados.forEach(([clave, valor]) => {
                                        //if (valor.hasOwnProperty(clave)  && /^0$|^[1-9]\d*$/.test(clave) && clave <= 4294967294){
                                            var clase= "";
                                            if (buscaAgregados().indexOf(clave) >= 0) {
                                                // $("#id_empleado_org_dependencia").append('<option value="'+clave+'">'+valor+'</option>');
                                            }else{
                                                empleadoOrgSelect.innerHTML += '<option value="'+clave+'">'+valor+'</option>';
                                            }
                                        //}
                                    });
                                    $("#id_empleado_org").pqSelect("refreshData");
                                    $("#id_empleado_org_dependencia").pqSelect("refreshData");   
                                }

                                if(typeof departamentoOrgSelect != "undefined"){
                                    departamentos.forEach(([clave, valor]) => {
                                        //if (valor.hasOwnProperty(clave)  && /^0$|^[1-9]\d*$/.test(clave) && clave <= 4294967294){
                                            departamentoOrgSelect.innerHTML += '<option value="'+clave+'">'+valor+'</option>';
                                        //}
                                    }); 
                                }
                                $("#select_departamentos_organigramas").pqSelect("refreshData");

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
        }
    }else{
        showDialog(invalidOption);
    }
}


function reloadDepartamentoByOrg(selectBox,menu_opcion,submenu_opcion){
	if(selectBox != null){
		departamento_id = selectBox;
        if(document.getElementsByClassName("empleado_org") != null){
            empleadoOrgSelect = document.getElementsByClassName("empleado_org")[0];
            texto = empleadoOrgSelect.options[0].text;
            empleadoOrgSelect.options.length = 0;
            empleadoOrgSelect.options[0] = new Option(texto,"0");
        }
        if(departamento_id != ""){

            var emp = $('#select_empresas_organigramas').val();

            var url = "";
            var ajax = objetoAjax();;
            url = "../common/recarga_departamentos_organigrama.php?id=" + departamento_id + "&emp=" + emp + "&op=" + menu_opcion + "&sub=" + submenu_opcion;
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
                                //var arr_empleados = jsonData.empleados;

                                const empleados = Object.entries(jsonData.empleados);
                                empleados.sort((a, b) => a[1].localeCompare(b[1])); // Ordenar por nombre

                                if(typeof empleadoOrgSelect != "undefined"){
                                    // $("#id_empleado_org_dependencia").html('');
                                    // $("#id_empleado_org_dependencia").append('<option value="0">'+seleccionar_empleado+'</option>');
                                    empleados.forEach(([clave, valor]) => {
                                        //if (valor.hasOwnProperty(clave)  && /^0$|^[1-9]\d*$/.test(clave) && clave <= 4294967294){
                                            var clase= "";
                                            if (buscaAgregados().indexOf(clave) >= 0) {
                                                clase= 'oculto';
                                                // $("#id_empleado_org_dependencia").append('<option value="'+clave+'">'+valor+'</option>');
                                            }else{
                                                empleadoOrgSelect.innerHTML += '<option value="'+clave+'" class="'+clase+'">'+valor+'</option>';
                                            }
                                        //}
                                    });
                                    $("#id_empleado_org").pqSelect("refreshData");                                
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
        }
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que recarga la lista de empleados de una empresa si flag_empleado_organigrama esta activo
 *
 */
 function reloadEmpleadoByEmpresaOrg(selectBox,menu_opcion,submenu_opcion){
    if(selectBox != null){
        empresa_id = selectBox.value;
        if(empresa_id != ""){
            var url = "";
            var ajax = objetoAjax();;
            url = "../common/recarga_empleados_organigrama.php?id=" + empresa_id + "&op=" + menu_opcion + "&sub=" + submenu_opcion;
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
                                var arr_empleados = jsonData.empleados;
                                $("#id_empleado_org_dependencia").html('');
                                $("#id_empleado_org_dependencia").append('<option value="0">'+seleccionar_empleado+'</option>');
                                for (var key in arr_empleados) {
                                    if (arr_empleados.hasOwnProperty(key)  && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294){
                                        var clase= "";
                                        $("#id_empleado_org_dependencia").append('<option value="'+key+'">'+arr_empleados[key]+'</option>');
                                    }
                                }
                                $("#select_departamentos_organigramas").pqSelect("refreshData");
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
        }
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion para generar el organigrama
 *
 */
 function datosOrganigrama(id_organigrama,menu_opcion,submenu_opcion){
    if(id_organigrama != null){        
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/ver_organigrama.php?id=" + id_organigrama + "&op=" + menu_opcion + "&sub=" + submenu_opcion;
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
                            var info_organigrama = jsonData.datosO;
							var titulo = '';
							var empresa = info_organigrama.empresa;
                            var niveles = info_organigrama.niveles;
							var dataSeries = jsonData.dataSeries; 
							var dataNodes = JSON.parse(jsonData.dataNodes); 
							var dataEtiquetas = jsonData.dataEtiquetas; 
							graficaOrganigrama(titulo,empresa,niveles,dataSeries,dataNodes,dataEtiquetas);
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
 * Funcion que guarda un organigrama
 *
 */
 function guardaOrganigrama(menu_opcion,submenu_opcion){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        //console.log(submenu_opcion);
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
            if(formulario.elements[i].name == "id_empresas") {
                var ids=[];
                $('#select_empresas_organigramas option:selected').each(function() {
                    var id = $(this).val();
                    ids.push(id); 
                }); 
                formData.append(formulario.elements[i].name, ids);                
                
            }else{
                formData.append(formulario.elements[i].name, formulario.elements[i].value);
            }
        }

        var url = "";
        var ajax = objetoAjax();;
        url = "../common/save_organigrama.php";
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    //console.log(html_txt);
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
 * Funcion que borra un elemento
 *
 */
 function borraOrganigrama(menu_opcion,submenu_opcion,elemento_id,flag_mobil = 0){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion) && elemento_id != ""){
    	var formData = new FormData();
        var jsonObj = {};
        var flagSeleccionadas = false;
        if(flag_mobil == undefined || flag_mobil == 0){
            formData.append('op', menu_opcion);
            formData.append('sub', submenu_opcion);
            formData.append('id', elemento_id);
        }else{
            jsonObj.op = menu_opcion;
            jsonObj.sub = submenu_opcion;
            jsonObj.id = elemento_id;
        }
        
        var url = "";
        var ajax = objetoAjax();
        
        url = "../common/borra_organigrama.php";
        //ajax.open("GET", url, true);
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    informeProcess = 0;
                    var html_txt = ajax.responseText.trim();
                    if(html_txt != ""){
                        var arr_aux = html_txt.split("|");
                        if(arr_aux[0] == 1){
                            showDialog(arr_aux[1]);
                            irAContenido(menu_activo,menu_opcion,submenu_opcion);
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
        informeProcess = 1;
        if(flag_mobil == undefined || flag_mobil == 0){
            ajax.send(formData);
        }else{
            ajax.send(JSON.stringify(jsonObj));
        }
        //ajax.send(null);
        esperaRespuesta(true);
    }else{
        showDialog(invalidOption);
    }
}


/**
 * Funcion que cambia el tipo de Organigrama
 *
 */
function CheckOrganigrama(menu_opcion,submenu_opcion){

    var val = $('#check_anidado').val();
    if(val == 1){
        $('#check_anidado').val(0);
        $("#org_anidado").hide();
        $("#organigrama_padre").empty();
        $("#org_empleado").show();
    }else{
        $('#check_anidado').val(1);
        $("#org_anidado").show();
        $("#organigrama_padre").empty();

        var emp = $('#select_empresas_organigramas').val();
        // LLenar el Selector
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/busca_organigrama.php?id=" + emp + "&op=" + menu_opcion + "&sub=" + submenu_opcion;
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var jsonData = JSON.parse(html_txt);
                        $("#organigrama_padre").append('<option value="0">'+seleccionar_organigrama+'</option>');
                        if(jsonData.estado == 1){
                            showDialog(jsonData.mensaje);
                        }else if(jsonData.estado == 2){
                            showDialog(jsonData.mensaje);
                            flag_echar = true;
                        }else if(jsonData.estado == 0){
                            const organigramas = Object.entries(jsonData.organigramas);
                            organigramas.forEach(([clave, valor]) => {
                                $("#organigrama_padre").append('<option value="'+clave+'">'+valor+'</option>');
                            });
                            $("#id_empleado_org").pqSelect("refreshData");                                
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
        ajax.send(null);
        esperaRespuesta(true);
        var option = 0;
        SelectOrganigramaDependiente(option);
    }
}

function SelectOrganigramaDependiente(option = 2){

    if(option == 2){
        var val = $('#organigrama_padre').val();
    }else{
        var val = option;
    }
    if(val == 0){
        $("#org_empleado").hide();
    }else{        
        $("#org_empleado").show();
    }

}

/**
 * Funcion para generar el organigrama
 *
 */
function GeneraOrganigrama(id_organigrama, menu_opcion, submenu_opcion) {
    if (id_organigrama == null) {
        console.error("ID de organigrama nulo.");
        showDialog(invalidOption);
        return;
    }
    const servidores = ["defunc2", "cusfunc2", "bsfunc2", "acfunc2", "kcfunc2", "safunc2", "wifunc2"];
    let servidorValido = null;
    async function verificarServidores() {
        for (const servidor of servidores) {
            const url = `https://${servidor}.azurewebsites.net/api/OrgChartJS`;

            var data = {
                "n": [
                    {
                    "p": ["0", null, null, 250, 120],
                    "c": ["2504"],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2504", "0", null, 250, 120],
                    "c": ["2505", "2505", "2505"],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    }
                ],
                "c": {
                    "base": [0, 60, 15, 40, 20, 0, 10, {}, 100, 15]
                },
                "r": ["0"],
                "v": "8.14.00"
            };
            var jsonData = JSON.stringify(data);

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: jsonData
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (!jsonResponse.hasOwnProperty("limit")) {
                        servidorValido = servidor;
                        LocalidadURL= servidor;
                        break;
                    }
                } else {
                    console.error(`Error en servidor ${servidor}: ${response.status}`);
                }
            } catch (error) {
                console.error(`Error al verificar servidor ${servidor}:`, error);
            }
        }

        if (servidorValido) {
            cargarOrganigrama(servidorValido);
        } else {
            showDialog("No se pudo cargar el organigrama.");
        }
    }

    function cargarOrganigrama(servidor) {  
        var url = "";
        var ajax = objetoAjax();;
        url = `../common/ver_organigrama_new.php?id=${id_organigrama}&op=${menu_opcion}&sub=${submenu_opcion}`;
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    try {
                        const responseText = ajax.responseText;  
                        if (responseText) {
                            const jsonData = JSON.parse(responseText);   
                            if (jsonData.estado == 1 || jsonData.estado == 2) {
                                showDialog(jsonData.mensaje);
                                if (jsonData.estado == 2) flag_echar = true;
                            } else if (jsonData.estado == 0) {
                                const DatosNuevos = JSON.parse(jsonData.DatosNew);
                                graficaOrganigramaNew(DatosNuevos);
                                esperaRespuesta(false);
                            } else {
                                console.error("Estado inesperado en respuesta:", jsonData.estado);
                            }
                        } else {
                            console.error("Respuesta vacía del servidor.");
                            showDialog(noResults);
                        }
                    } catch (error) {
                        console.error("Error al procesar la respuesta del servidor:", error);
                        showDialog("Error procesando la respuesta del servidor.");
                    }
                } else if (ajax.status == 404) {
                    console.error("Error 404: Archivo no encontrado.");
                    showDialog(error404);
                } else {
                    console.error(`Error en la petición AJAX: ${ajax.status}`);
                    showDialog(`Error: ${ajax.status}`);
                }
            }
        };
        esperaRespuesta(true);
        ajax.send();
    }     

    verificarServidores();
}

/**
 * Funcion para generar el organigrama detallado
 *
 */
function GeneraOrganigramaDetallado(id_organigrama,menu_opcion,submenu_opcion){
    if (id_organigrama == null) {
        console.error("ID de organigrama nulo.");
        showDialog(invalidOption);
        return;
    }
    const servidores = ["defunc2", "cusfunc2", "bsfunc2", "acfunc2", "kcfunc2", "safunc2", "wifunc2"];
    let servidorValido = null;
    async function verificarServidores() {
        for (const servidor of servidores) {
            const url = `https://${servidor}.azurewebsites.net/api/OrgChartJS`;

            var data = {
                "n": [
                    {
                    "p": ["0", null, null, 250, 120],
                    "c": ["2504"],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2504", "0", null, 250, 120],
                    "c": ["2505", "2505", "2505"],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    }
                ],
                "c": {
                    "base": [0, 60, 15, 40, 20, 0, 10, {}, 100, 15]
                },
                "r": ["0"],
                "v": "8.14.00"
            };
            var jsonData = JSON.stringify(data);

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: jsonData
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (!jsonResponse.hasOwnProperty("limit")) {
                        servidorValido = servidor;
                        LocalidadURL= servidor;
                        break;
                    }
                } else {
                    console.error(`Error en servidor ${servidor}: ${response.status}`);
                }
            } catch (error) {
                console.error(`Error al verificar servidor ${servidor}:`, error);
            }
        }

        if (servidorValido) {
            cargarOrganigramaDetallado(servidorValido);
        } else {
            showDialog("No se pudo cargar el organigrama.");
        }
    }

    function cargarOrganigramaDetallado(servidor) {  
        var url = "";
        var ajax = objetoAjax();;
        url = `../common/ver_organigrama_detallado.php?id=${id_organigrama}&op=${menu_opcion}&sub=${submenu_opcion}`;
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    try {
                        const responseText = ajax.responseText;  
                        if (responseText) {
                            const jsonData = JSON.parse(responseText);   
                            if (jsonData.estado == 1 || jsonData.estado == 2) {
                                showDialog(jsonData.mensaje);
                                if (jsonData.estado == 2) flag_echar = true;
                            } else if (jsonData.estado == 0) {
                                const DatosNuevos = JSON.parse(jsonData.DatosNew);
                                graficaOrganigramaNew(DatosNuevos);
                                esperaRespuesta(false);
                            } else {
                                console.error("Estado inesperado en respuesta:", jsonData.estado);
                            }
                        } else {
                            console.error("Respuesta vacía del servidor.");
                            showDialog(noResults);
                        }
                    } catch (error) {
                        console.error("Error al procesar la respuesta del servidor:", error);
                        showDialog("Error procesando la respuesta del servidor.");
                    }
                } else if (ajax.status == 404) {
                    console.error("Error 404: Archivo no encontrado.");
                    showDialog(error404);
                } else {
                    console.error(`Error en la petición AJAX: ${ajax.status}`);
                    showDialog(`Error: ${ajax.status}`);
                }
            }
        };
        esperaRespuesta(true);
        ajax.send();
    }     

    verificarServidores();
}

function graficaOrganigramaNew(Datos) {
    // Configuración de campos personalizados para el organigrama
    OrgChart.templates.olivia.field_0 = '<text data-width="135" x="100" y="30" class="olivia-f0">{val}</text>';
    OrgChart.templates.olivia.field_1 = '<text data-width="135" x="100" y="60" class="olivia-f1">{val}</text>';
    OrgChart.templates.olivia.field_2 = '<text data-width="135" x="100" y="85" class="olivia-f2">{val}</text>';
    OrgChart.templates.olivia.img_0 = '<image preserveAspectRatio="xMidYMid slice" class="olivia-img" xlink:href="{val}" x="0" y="0" height="100" width="100"></image>';

    // Creación del organigrama
    var chart = new OrgChart(document.getElementById("container3"), {
        template: "olivia",
        enableSearch: false,
        miniMap: true,
        mouseScrool: OrgChart.action.ctrlZoom,
        nodeMouseClick: OrgChart.action.none,
        scaleInitial: 0.8,
        scaleMax: 1,
        menu: {
            pdf: { text: "Export PDF" },
            png: { text: "Export PNG" },
            svg: { text: "Export SVG" }
        },
        nodeBinding: {
            field_0: "name",
            field_1: "title",
            field_2: "description",
            img_0: "img"
        },
        nodes: Datos // Los nodos que llegan desde el servidor o AJAX
    });

    // Validación adicional (opcional, por si necesitas detectar errores en el JSON)
    if (!Array.isArray(Datos) || Datos.length === 0) {
        console.warn("No se encontraron datos para generar el organigrama.");
        showDialog("No hay datos disponibles para el organigrama.");
    }
}

function ComprobacionOrgCharJS(callback){

    var r=["defunc2","cusfunc2","bsfunc2","acfunc2","kcfunc2","safunc2","wifunc2"];
    var cont =  r.length - 1;

    async function makeRequests() {
        for (var i = 0; i < cont; i++) {
            var xhr = new XMLHttpRequest();
            var url = "https://" + r[i] + ".azurewebsites.net/api/OrgChartJS";
            
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
      
            var data = {
                "n": [
                    {
                    "p": ["0", null, null, 250, 120],
                    "c": ["2504"],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2504", "0", null, 250, 120],
                    "c": ["2505", "2505", "2505"],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    },
                    {
                    "p": ["2505", "2504", null, 250, 120],
                    "q": [50, 20, 35, 20]
                    }
                ],
                "c": {
                    "base": [0, 60, 15, 40, 20, 0, 10, {}, 100, 15]
                },
                "r": ["0"],
                "v": "8.14.00"
            };
            var jsonData = JSON.stringify(data);
      
            await new Promise(function(resolve, reject) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            var response = JSON.parse(xhr.responseText);
                            if (response.hasOwnProperty("limit")) {
                                resolve();
                            } else {
                                LocalidadURL = r[i];
                                cont = i;
                                callback();
                                resolve();
                            }
                        } else {
                            console.error("Error en la petición " + r[i] + ": " + xhr.status);
                            reject();
                        }
                    }
                };
                xhr.send(jsonData);
            });
        }
    }
    makeRequests();
}
