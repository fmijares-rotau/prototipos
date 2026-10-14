/**
 * Funcion que recarga la lista empleados asignados a proyectos
 */
function reloadEmpleadosAsignados(selectBox, menu_opcion, submenu_opcion){
    if(selectBox != null){
        const proyecto_id = selectBox.options[selectBox.selectedIndex].value;
        
        const bodyTablaEmpleadosAsignados = document.getElementById('body_empleados_asignados');
        if(bodyTablaEmpleadosAsignados != null){
        	bodyTablaEmpleadosAsignados.innerHTML = "";
        }
        
        if(proyecto_id != ""){
            var url = "";
            var ajax = objetoAjax();
            url = "../common/recarga_asignados_proyectos.php?op=" + menu_opcion + "&sub=" + submenu_opcion + "&id=" + proyecto_id;
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
                                const html_body_tabla_proyectos_asignados = jsonData.html_body_tabla_proyectos_asignados;
                                
                                if(bodyTablaEmpleadosAsignados != null){
                                	bodyTablaEmpleadosAsignados.innerHTML = html_body_tabla_proyectos_asignados;
                                    const bodyTablaEmpleadosDisponibles = document.getElementById('body_empleados_disponibles');
                                    if(bodyTablaEmpleadosDisponibles != null){
                                    	ocultarFilasCoincidentes(bodyTablaEmpleadosDisponibles, bodyTablaEmpleadosAsignados);
                                    }
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
            esperaRespuesta(true);
            ajax.send(null);
        }
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que oculta del primer body de tabla las filas que coiciden
 * con las filas del segundo body de tabla 
 */
function ocultarFilasCoincidentes(primerBody, segundoBody){
	const primerBodyTrs = primerBody.getElementsByTagName('tr');
    //Quitar la propiedad display de los tr del primer body
    if(primerBodyTrs.length > 0){
        const cachedPtrs = {};
        for(let ptr of primerBodyTrs){
            if(ptr.style.display){
                ptr.style.removeProperty('display');
            }
            const ptd = ptr.getElementsByTagName('td')[0];
            cachedPtrs[ptd.getElementsByTagName('input')[0].value] = ptr;
        }
        //Poner propiedad display a none en los coincidentes
        const segundoBodyTrs = segundoBody.getElementsByTagName('tr');
        if(segundoBodyTrs.length > 0){
            for(let str of segundoBodyTrs){
                const std = str.getElementsByTagName('td')[0];
                if(cachedPtrs[std.getElementsByTagName('input')[0].value]){
                    cachedPtrs[std.getElementsByTagName('input')[0].value].style.display = "none";
                    break;
                }
            }
        }
    }
}

/**
 * Funcion que agrega los tr seleccionados de un body de tabla a otro.
 * Si la segunda ya los tiene los muestra.
 */
function asignarOtraTabla(e, idPrimerBody, idSegundoBody){
	e.preventDefault();
    if (document.getElementById("id_proyectos").value != ""){
        const bodyTablaDesde = document.getElementById(idPrimerBody);
        const bodyTablaPara = document.getElementById(idSegundoBody);
        if(bodyTablaDesde != null && bodyTablaPara != null){
            const bodyTablaDesdeTrs = bodyTablaDesde.getElementsByTagName('tr');
            if(bodyTablaDesdeTrs.length > 0){
                for(let tr of bodyTablaDesdeTrs){
                    const td = tr.getElementsByTagName('td')[0];
                    if(td.getElementsByTagName('input')[0].checked){
                        let flagClonar = true
                        const bodyTablaParaTrs = bodyTablaPara.getElementsByTagName('tr');
                        if(bodyTablaParaTrs.length > 0){
                            for(let btptr of bodyTablaParaTrs){
                                const btptd = btptr.getElementsByTagName('td')[0];
                                if(td.getElementsByTagName('input')[0].value === btptd.getElementsByTagName('input')[0].value){
                                    btptr.style.removeProperty('display');
                                    td.getElementsByTagName('input')[0].checked = false;
                                    tr.style.display = "none";
                                    flagClonar = false;
                                    break;
                                }
                            }
                        }
                        if(flagClonar){
                            td.getElementsByTagName('input')[0].checked = false;
                            const clonedTr = tr.cloneNode(true);
                            clonedTr.getElementsByTagName('td')[0].getElementsByTagName('input')[0].name = "id_empleados_asignados";
                            clonedTr.getElementsByTagName('td')[0].getElementsByTagName('input')[0].id = "empAsignados";
                            bodyTablaPara.appendChild(clonedTr);
                            tr.style.display = "none";
                        }
                    }
                }
                //Quitar los ticks de los checkbox generales
                document.getElementById("empDisp").checked = false;
                document.getElementById("empAsig").checked = false;
            }
        }
    }else if(document.getElementById("id_empresas").value === ""){
        showDialog(mensaje_seleccionar_empresa);
    }else{
        showDialog(mensaje_seleccionar_proyecto);
    }
}

/**
 * Funcion que recarga la lista de proyectos por clientes
 */
function reloadProyectosTareas(selectBox, menu_opcion, submenu_opcion){
    if(selectBox != null){
        const cliente_id = selectBox.options[selectBox.selectedIndex].value;
        
        const selectProyectos = document.getElementById('id_proyectos');
        if(selectProyectos != null){
            texto = selectProyectos.options[0].text;
            selectProyectos.options.length = 0;
            selectProyectos.options[0] = new Option(texto, "");
        }
        
        const selectTareas = document.getElementById('id_tareas');
        if(selectTareas != null){
            texto = selectTareas.options[0].text;
            selectTareas.options.length = 0;
            selectTareas.options[0] = new Option(texto, "");
        }
        
        if(cliente_id != ""){
            var url = "";
            var ajax = objetoAjax();
            url = "../common/recarga_proyectos_tareas.php?op=" + menu_opcion + "&sub=" + submenu_opcion + "&id=" + cliente_id;
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
                                const arr_proyectos = jsonData.proyectos;

                                if(typeof selectProyectos != undefined){
                                    for (var key in arr_proyectos) {
                                        if (arr_proyectos.hasOwnProperty(key)){
                                            selectProyectos.options[selectProyectos.options.length]=new Option(arr_proyectos[key], key);
                                        }
                                    }
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
            esperaRespuesta(true);
            ajax.send(null);
        }
    }else{
        showDialog(invalidOption);
    }
}

/**
 * Funcion que recarga la lista de tareas por proyectos
 */
function reloadTareas(selectBox, menu_opcion, submenu_opcion){
    if(selectBox != null){
        const proyecto_codigo = selectBox.options[selectBox.selectedIndex].value;
        
        const selectTareas = document.getElementById('id_tareas');
        if(selectTareas != null){
            texto = selectTareas.options[0].text;
            selectTareas.options.length = 0;
            selectTareas.options[0] = new Option(texto, "");
        }

        if(proyecto_codigo != ""){
            var url = "";
            var ajax = objetoAjax();
            url = "../common/recarga_tareas.php?op=" + menu_opcion + "&sub=" + submenu_opcion + "&id=" + proyecto_codigo;
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
                                const arr_tareas = jsonData.tareas;

                                if(typeof selectTareas != undefined){
                                    for (var key in arr_tareas) {
                                        if (arr_tareas.hasOwnProperty(key)){
                                            selectTareas.options[selectTareas.options.length]=new Option(arr_tareas[key], key);
                                        }
                                    }
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
            esperaRespuesta(true);
            ajax.send(null);
        }
    }else{
        showDialog(invalidOption);
    }
}

/*
    Edita fichajes de proyectos de un empleado
*/
async function editaFichajeProyectoEmpleado(idSeccion, idElemento, idEmpleado, orden, fecha, inicio){
    try{
        const url = "../common/edita_fichaje_proyecto_empleado.php";
        const data = new FormData();
        data.append('op', idSeccion);
        data.append('sub', idElemento);
        data.append('id_empleado', idEmpleado);
        data.append('orden', orden);
        data.append('fecha', fecha);
        data.append('inicio', inicio);
        
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if(response.ok){
            const jsonData = await response.json();

            const [estado, html] = jsonData.html.split('|');

            switch(estado){
                case '1':
                    showDialog(html);
                    break;
                case '2':
                    showDialog(html);
                    flag_echar = true;
                    break;
                case '0':
                    document.getElementById("content").innerHTML = html
                    break;
            }
        }else{
            showDialog(error404);
        }
    }catch(error){
        showDialog(error.message);
    } 
}

/*
    Borra un fichaje de proyecto de un empleado
*/
async function borraFichajeProyectoEmpleado(idSeccion, idElemento, idEmpleado, orden, fecha, inicio){
    try{
        const url = "../common/borra_fichaje_proyecto_empleado.php";
        const data = new FormData();
        data.append('op', idSeccion);
        data.append('sub', idElemento);
        data.append('id_empleado', idEmpleado);
        data.append('orden', orden);
        data.append('fecha', fecha);
        data.append('inicio', inicio);
        
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if(response.ok){
            const jsonData = await response.json();

            const [estado, html] = jsonData.html.split('|');

            switch(estado){
                case '1':
                    showDialog(html);
                    break;
                case '2':
                    showDialog(html);
                    flag_echar = true;
                    break;
                case '0':
                    showDialog(html);
                    irAContenido(menu_activo,idSeccion,idElemento);
                    break;
            }
        }else{
            showDialog(error404);
        }
    }catch(error){
        showDialog(error.message);
    } 
}

async function fichajeProyectoPorcentaje(idSeccion, idElemento){
    try{
        const url = "../common/fichaje_proyecto_porcentaje.php";
        const data = new FormData();
        data.append('op', idSeccion);
        data.append('sub', idElemento);

        const id = document.getElementById("id");
        
        if(id && id.value != ""){
            data.append('id', id.value);
        }
        
        const selectProyecto = document.getElementById('id_proyectos');
        
        if(selectProyecto && selectProyecto.options[selectProyecto.selectedIndex].value != ""){
            data.append('idProyecto', selectProyecto.options[selectProyecto.selectedIndex].value);
        }else{
            showDialog(mensaje_seleccionar_proyecto);
            return;
        }

        const selectTarea = document.getElementById('id_tareas');

        if(selectTarea && selectTarea.options[selectTarea.selectedIndex].value != ""){
            data.append('idTarea', selectTarea.options[selectTarea.selectedIndex].value);
        }else{
            showDialog(mensaje_seleccionar_tarea);
            return;
        }

        const inputFecha = document.getElementById('fecha');

        if(inputFecha && inputFecha.value != ""){
            data.append('fecha', inputFecha.value);
        }else{
            showDialog(mensaje_error_fecha_no_valido);
            return;
        }

        const inputporcentaje = document.getElementById('porcentaje');

        if(inputporcentaje && inputporcentaje.value > 0 && inputporcentaje.value <= 100){
            data.append('porcentaje', inputporcentaje.value);
        }else{
            showDialog(mensaje_error_porcentaje_no_valido);
            return;
        }

        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if(response.ok){
            const jsonData = await response.json();

            const [estado, html] = jsonData.html.split('|');

            switch(estado){
                case '1':
                    showDialog(html);
                    break;
                case '2':
                    showDialog(html);
                    flag_echar = true;
                    break;
                case '0':
                    showDialog(html);
                    irAContenido(menu_activo,idSeccion,idElemento);
                    break;
            }
        }else{
            showDialog(error404);
        }
    }catch(error){
        showDialog(error.message);
    } 
}

async function editaFichajeProyectoPorcentaje(idSeccion, idElemento, idFichaje){
    try{
        const url = "../common/edita_fichaje_proyecto_porcentaje.php";
        
        const data = new FormData();

        data.append('op', idSeccion);
        data.append('sub', idElemento);
        data.append('idFichaje', idFichaje);
        
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if(response.ok){
            const jsonData = await response.json();

            const [estado, html] = jsonData.html.split('|');

            switch(estado){
                case '1':
                    showDialog(html);
                    break;
                case '2':
                    showDialog(html);
                    flag_echar = true;
                    break;
                case '0':
                    const data = JSON.parse(html);

                    //Id
                    document.getElementById("id").value = data.id;

                    //Clientes
                    const selectClientes = document.getElementById("id_cliente");
                    selectClientes.innerHTML = '';

                    for(let cliente of data.clientes){
                        let option = document.createElement('option');
                        option.value = cliente.id;
                        option.text = cliente.nombre;
                        if (cliente.selected) {
                            option.selected = true;
                        }
                        selectClientes.add(option);
                    }

                    //Proyectos
                    const selectProyectos = document.getElementById("id_proyectos");
                    selectProyectos.innerHTML = '';

                    for(let proyecto of data.proyectos){
                        let option = document.createElement('option');
                        option.value = proyecto.id;
                        option.text = proyecto.nombre;
                        if (proyecto.selected) {
                            option.selected = true;
                        }
                        selectProyectos.add(option);
                    }

                    //Tareas
                    const selectTareas = document.getElementById("id_tareas");
                    selectTareas.innerHTML = '';

                    for(let tarea of data.tareas){
                        let option = document.createElement('option');
                        option.value = tarea.id;
                        option.text = tarea.nombre;
                        if (tarea.selected) {
                            option.selected = true;
                        }
                        selectTareas.add(option);
                    }

                    //Fecha
                    document.getElementById("fecha").value = data.fecha;

                    //Porcentaje
                    document.getElementById("porcentaje").value = data.porcentaje;

                    //Boton
                    document.getElementById("boton_fichar").innerText = 'Editar';

                    // Scroll to the new element
                    const nuevoElemento = document.getElementById("nuevo_elemento");
                    if (nuevoElemento) {
                        nuevoElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    break;
            }
        }else{
            showDialog(error404);
        }
    }catch(error){
        showDialog(error.message);
    } 
}

async function borraFichajeProyectoPorcentaje(idSeccion, idElemento, idFichaje){
    try{
        const url = "../common/borra_fichaje_proyecto_porcentaje.php";
        
        const data = new FormData();

        data.append('op', idSeccion);
        data.append('sub', idElemento);
        data.append('idFichaje', idFichaje);
        
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if(response.ok){
            const jsonData = await response.json();

            const [estado, html] = jsonData.html.split('|');

            switch(estado){
                case '1':
                    showDialog(html);
                    break;
                case '2':
                    showDialog(html);
                    flag_echar = true;
                    break;
                case '0':
                    showDialog(html);
                    irAContenido(menu_activo,idSeccion,idElemento);
                    break;
            }
        }else{
            showDialog(error404);
        }
    }catch(error){
        showDialog(error.message);
    } 
}

