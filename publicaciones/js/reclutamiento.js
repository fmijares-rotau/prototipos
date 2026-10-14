var existingIds = new Set();// Conjunto global para almacenar los IDs de las tarjetas ya agregadas

// Objeto global para almacenar la propiedad empresa
var ReclutamientoData = {
    empresa: null,
    menu: null,
    submenu: null
};

function FilaActividadReclutamiento(option){
    //Obtener el valor de option sabiendo que es un [Object HTMLInputElement] y obtener el valor de su atributo value

    if(document.getElementById("id_empresas_reclutamiento") != null){
        var empresa = document.getElementById("id_empresas_reclutamiento");
        var empresa_id = empresa.value;
        var menu_opcion = empresa.getAttribute("data-section");
        var submenu_opcion = empresa.getAttribute("data-elemento_id");
        
        ReclutamientoData.empresa = empresa_id;
        ReclutamientoData.menu = menu_opcion;
        ReclutamientoData.submenu = submenu_opcion;
    }

    var empresa_id = ReclutamientoData.empresa;
    var menu_opcion = ReclutamientoData.menu;
    var submenu_opcion = ReclutamientoData.submenu;
    var actividad_id = option;
    
    console.log(empresa_id + " " + menu_opcion + " " + submenu_opcion);

    if(document.getElementById("id_responsable_actividades") != null){
        var responsableActividadesSelect = document.getElementById("id_responsable_actividades");
        texto = responsableActividadesSelect.options[0].text;
        responsableActividadesSelect.options.length = 0;
        responsableActividadesSelect.options[0] = new Option(texto,"");
    }

    if(actividad_id != ""){
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/fila_tarea_reclutamiento.php?id=" + actividad_id + "&empresa_id=" + empresa_id + "&menu_opcion=" + menu_opcion + "&submenu_opcion=" + submenu_opcion;
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
                            var listaActividades = jsonData.actividades
                            /**
                             * Logica para llenar el selector responsable
                             */
                            var arr_empleados = jsonData.arr_empleados;
                            
                            /**
                             * Fin de la logica para llenar el selector responsable
                             */

                            //console.log(listaTareas);
                            let id_actividad=listaActividades.id;
                            //console.log(id_tarea);
                            let nombre_actividad = String(listaActividades.nombre);
                            let desc_actividad = listaActividades.descripcion;
                            
                            let selActividad = document.querySelector('#id_procesos_actividades');
                            let fila = document.querySelector('#tabla_body_actividades');
                            let titulo = document.querySelector('#titulo-lista-actividades');
                            let tabla = document.querySelector('#tabla-gt-actividades');
                            // mostramos el titulo y encabezado de la tabla de empleados agregados
                            titulo.classList.remove('oculto');
                            tabla.classList.remove('oculto');
                            let nuevaFila = ``;  
                            //if (!existingIds.has(id_tarea)) {
                                nuevaFila += `
                                    <tr id="fila_${id_actividad}">
                                        <input type="hidden" name="id_reclutamiento_actividades[]" value="${id_actividad}">
                                        <td width="20%">${nombre_actividad}</td>
                                        <td width="40%">${desc_actividad}</td> 
                                        <td width="30%">
                                            <select id ="id_responsable_actividades_${id_actividad}" name="id_responsable_actividades[]" size="1" required>
                                            <option value="">seleccionar</option>`
                                            for (var key in arr_empleados) {
                                                if (
                                                arr_empleados.hasOwnProperty(key) &&
                                                /^0$|^[1-9]\d*$/.test(key) &&
                                                key <= 4294967294
                                                ) {
                                                    nuevaFila += `<option value="${key}">${arr_empleados[key]}</option>`;
                                                }
                                            }
                                            nuevaFila += `</select>
                                        </td>      
                                        <td width="10%">
                                            <a class="borrar tabla_accion" onclick="javascript:borrarFilaActividades(${id_actividad},'${nombre_actividad}');">${borrar}</a>    
                                        </td>
                                    </tr>
                                `;
                                // Agregar el ID al conjunto global existingIds
                                existingIds.add(id_actividad);
                            //}
                            // agregar fila
                            fila.innerHTML += nuevaFila;
                            // ocultamos la opcion del selector
                            selActividad.querySelector(`option[value="${id_actividad}"]`).remove();
                            selActividad.value = "";

                            // Guardar el valor seleccionado antes de limpiar el select
                            let selectResponsableActividades = document.getElementById(`id_responsable_actividades_${id_actividad}`);
                            let selectedValue = selectResponsableActividades.value;

                            // Limpiar las opciones existentes
                            selectResponsableActividades.innerHTML = '';

                            // Agregar una opción predeterminada
                            let defaultOption = document.createElement('option');
                            defaultOption.text = 'Seleccionar responsable';
                            defaultOption.value = '';
                            selectResponsableActividades.add(defaultOption);

                            // Iterar sobre arr_empleados y agregar cada empleado como una opción
                            for (var key in arr_empleados) {
                                if (arr_empleados.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
                                    let option = document.createElement('option');
                                    option.value = key;
                                    option.text = arr_empleados[key];
                                    selectResponsableActividades.add(option);
                                }
                            }

                            // Restablecer el valor seleccionado
                            selectResponsableActividades.value = selectedValue;
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
}

function FilaCandidatosActividades(option){
    //Obtener el valor de option sabiendo que es un [Object HTMLInputElement] y obtener el valor de su atributo value

    if(document.getElementById("id_empresas_candidatos") != null){
        var empresa = document.getElementById("id_empresas_candidatos");
        var empresa_id = empresa.value;
        var menu_opcion = empresa.getAttribute("data-section");
        var submenu_opcion = empresa.getAttribute("data-elemento_id");
        
        ReclutamientoData.empresa = empresa_id;
        ReclutamientoData.menu = menu_opcion;
        ReclutamientoData.submenu = submenu_opcion;
    }

    var empresa_id = ReclutamientoData.empresa;
    var menu_opcion = ReclutamientoData.menu;
    var submenu_opcion = ReclutamientoData.submenu;
    var proceso_id = option;

    if(proceso_id != ""){
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/fila_actividades_reclutamiento.php?id=" + proceso_id + "&empresa_id=" + empresa_id + "&menu_opcion=" + menu_opcion + "&submenu_opcion=" + submenu_opcion;
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
                            var listaActividades = jsonData.actividades
                            var listaActividadesEmpresa = jsonData.actividadesEmpresa
                            /**
                             * Logica para llenar el selector responsable
                             */
                            var arr_empleados = jsonData.arr_empleados;
                            
                            let selActividad = document.querySelector('#id_procesos_actividades');
                            let fila = document.querySelector('#tabla_body_actividades');
                            fila.innerHTML = '';
                            let titulo = document.querySelector('#titulo-lista-actividades');
                            let tabla = document.querySelector('#tabla-gt-actividades');
                            // mostramos el titulo y encabezado de la tabla de empleados agregados
                            titulo.classList.remove('oculto');
                            tabla.classList.remove('oculto');
                            

                            /**
                             * Fin de la logica para llenar el selector responsable
                             */
                            let nuevaFila = ``; 
                            // Recorrer listaActividades y arr_empleados
                            listaActividades.forEach(function(actividad) {

                                //console.log(listaTareas);
                                let id_actividad_reclutamiento = actividad.id_reclutamiento_actividades;
                                //console.log(id_tarea);
                                let nombre_actividad = '';
                                let desc_actividad = '';
                                let id_responsable = actividad.id_responsable_actividades;
                                let nombre_responsable = '';

                                // Buscar el nombre de la actividad buscando en el array listaActividadesEmpresa cuando sus id coincidan
                                listaActividadesEmpresa.forEach(function(actividadEmpresa) {
                                    if (actividadEmpresa.id == id_actividad_reclutamiento) {
                                        nombre_actividad = actividadEmpresa.nombre;
                                        desc_actividad = actividadEmpresa.descripcion;
                                    }
                                });
                                
                                // Buscar el empleado correspondiente en arr_empleados
                                if (arr_empleados.hasOwnProperty(id_responsable)) {
                                    let empleado = arr_empleados[id_responsable];
                                    nombre_responsable = `${empleado}`;
                                }
                                 
                                    nuevaFila += `
                                        <tr>
                                            <td width="20%">${nombre_actividad}</td>
                                            <td width="40%">${desc_actividad}</td> 
                                            <td width="40%">${nombre_responsable}</td>      
                                        </tr>
                                    `;
                            });
                            // agregar fila
                            fila.innerHTML += nuevaFila;
                            // ocultamos la opcion del selector
                            selActividad.value = "";
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
}

function borrarFilaActividades(id, nombre){
    console.log(nombre)
    var fila = document.querySelector('#fila_'+id);
    fila.remove();
    //existingIds.delete(id);
    let selTarea = document.querySelector('#id_procesos_actividades');
    let option = document.createElement('option');
    option.value = id;
    option.text = nombre;
    selTarea.appendChild(option);
}

/**
 * Funcion que recarga los empleados de una empresa en el formulario de reclutamiento
 *
 */
function reloadEmpleadosEmpresaReclutamiento(selectBox,menu_opcion,submenu_opcion){
    if(selectBox != null){
        var empresa_id = selectBox.options[selectBox.selectedIndex].value;
        if(document.getElementById("id_created_reclutamiento") != null){
            var empleadoSelect = document.getElementById("id_created_reclutamiento");
            texto = empleadoSelect.options[0].text;
            empleadoSelect.options.length = 0;
            empleadoSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("id_responsable_reclutamiento") != null){
            var responsableSelect = document.getElementById("id_responsable_reclutamiento");
            texto = responsableSelect.options[0].text;
            responsableSelect.options.length = 0;
            responsableSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("id_responsable_actividades") != null){
            var responsableActividadesSelect = document.getElementById("id_responsable_actividades");
            texto = responsableActividadesSelect.options[0].text;
            responsableActividadesSelect.options.length = 0;
            responsableActividadesSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("id_procesos_candidatos") != null){
            var procesosCandidatosSelect = document.getElementById("id_procesos_candidatos");
            texto = procesosCandidatosSelect.options[0].text;
            procesosCandidatosSelect.options.length = 0;
            procesosCandidatosSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("id_procesos_actividades") != null){
            var procesosActividadesSelect = document.getElementById("id_procesos_actividades");
            texto = procesosActividadesSelect.options[0].text;
            procesosActividadesSelect.options.length = 0;
            procesosActividadesSelect.options[0] = new Option(texto,"");
        }
        if(empresa_id != ""){
            ReclutamientoData.empresa = empresa_id;
            ReclutamientoData.menu = menu_opcion;
            ReclutamientoData.submenu = submenu_opcion;
            var url = "";
            var ajax = objetoAjax();;
            url = "../common/recarga_empleados_empresas.php?id=" + empresa_id + "&op=" + menu_opcion + "&sub=" + submenu_opcion;
            ajax.open("GET", url, true);
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200){
                        esperaRespuesta(false);
                        var html_txt = ajax.responseText;
                        if(html_txt != ""){
                            var jsonData = JSON.parse(html_txt);
                            if(jsonData.estado == 1){
                                console.log("No hay empresa asignada");
                                //document.getElementById('obd_id_responsable').innerHTML = '<option value="">seleccionar_responsable</option>';
                            }else if(jsonData.estado == 2){
                                showDialog(jsonData.mensaje);
                                flag_echar = true;
                            }else if(jsonData.estado == 0){
                                var arr_empleados = jsonData.arr_empleados;
                                var arr_procesos_reclutamiento = jsonData.arr_procesos_reclutamiento;
                                var arr_actividades_reclutamiento = jsonData.arr_actividades_reclutamiento;
                                if (typeof empleadoSelect != "undefined") {
                                    for (var key in arr_empleados) {
                                      if (
                                        arr_empleados.hasOwnProperty(key) &&
                                        /^0$|^[1-9]\d*$/.test(key) &&
                                        key <= 4294967294
                                      ) {
                                        empleadoSelect.options[
                                            empleadoSelect.options.length
                                        ] = new Option(arr_empleados[key], key);
                                      }
                                    }
                                    $("#id_created_reclutamiento").pqSelect("refreshData");
                                }
                                if (typeof responsableSelect != "undefined") {
                                    for (var key in arr_empleados) {
                                      if (
                                        arr_empleados.hasOwnProperty(key) &&
                                        /^0$|^[1-9]\d*$/.test(key) &&
                                        key <= 4294967294
                                      ) {
                                        responsableSelect.options[
                                            responsableSelect.options.length
                                        ] = new Option(arr_empleados[key], key);
                                      }
                                    }
                                    $("#id_responsable_reclutamiento").pqSelect("refreshData");
                                }
                                if (typeof procesosCandidatosSelect != "undefined") {
                                    for (var key in arr_procesos_reclutamiento) {
                                      if (
                                        arr_procesos_reclutamiento.hasOwnProperty(key) &&
                                        /^0$|^[1-9]\d*$/.test(key) &&
                                        key <= 4294967294
                                      ) {
                                        procesosCandidatosSelect.options[
                                            procesosCandidatosSelect.options.length
                                        ] = new Option(arr_procesos_reclutamiento[key], key);
                                      }
                                    }
                                    $("#id_procesos_candidatos").pqSelect("refreshData");
                                }
                                if (typeof procesosActividadesSelect != "undefined") {
                                    for (var key in arr_actividades_reclutamiento) {
                                      if (
                                        arr_actividades_reclutamiento.hasOwnProperty(key) &&
                                        /^0$|^[1-9]\d*$/.test(key) &&
                                        key <= 4294967294
                                      ) {
                                        procesosActividadesSelect.options[
                                            procesosActividadesSelect.options.length
                                        ] = new Option(arr_actividades_reclutamiento[key], key);
                                      }
                                    }
                                    $("#id_procesos_actividades").pqSelect("refreshData");
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
 * Modal para mostrar la creacion de nuevas actividades
 * 
 */
function modalActividadReclutamientoVP25(encuestas,tipos,empresas,menu_opcion,submenu_opcion) {
    // Crear el contenido del modal
    let modalContent = `
        <h2 class="text-xl font-bold mb-4">Nueva Actividad</h2>
        <!-- div para la empresa -->
        <div class="w-full input_group mt-2 flex flex-col">
            <label class="force input_label_form">Empresa:<span class="force-red">*</span></label>
            <select name="id_empresas_actividades" class="w-full input_field h-[30px]">
                <option value="-1">Seleccionar empresa</option>
                ${empresas.map(empresa => `<option value="${empresa.id}">${empresa.nombre}</option>`).join('')}
            </select>
        </div>

        <!-- div para el nombre -->
        <div class="w-full input_group mt-2 flex flex-col">
            <label class="force input_label_form">Nombre:<span class="force-red">*</span></label>
            <input type="text" name="nombre" class="w-full input_field h-[30px]">
        </div>

        <!-- div para el tipo -->
        <div class="w-full input_group mt-2 flex flex-col">
            <label class="force input_label_form" required="required">Tipo:<span class="force-red">*</span></label>
            <select name="id_reclutamiento_actividad_tipo" class="w-full input_field h-[30px]">
                <option value="-1">Seleccionar Tipo</option>
                ${tipos.map(tipo => `<option value="${tipo.id}">${tipo.nombre}</option>`).join('')}
            </select>
        </div>

        <!-- div para el encuesta -->
        <div class="w-full input_group mt-2 flex flex-col">
            <label class=" force input_label_form" for="id_encuesta">Encuesta:<span class="force-red">*</span></label>
            <select name="id_encuesta" class="w-full input_field h-[30px]">
                <option value="-1">Seleccionar encuesta</option>
                ${encuestas.map(encuesta => `<option value="${encuesta.id}">${encuesta.nombre}</option>`).join('')}
            </select>
        </div>

        <!-- div para la descripcion -->

        <div class="flex w-full flex-col mb-5">
            <label class="force_textarea" to="descripcion">Descripcion:<span class="force-red">*</span></label>
            <textarea class="grande rounded-md text-left px-2 h-[100px] min-h-[100px] max-h-[150px]" maxlength="250" name="descripcion"></textarea>
        </div>

        <!-- div para la plantilla -->
        <div class="w-full input_group mt-2 flex flex-col">
            <label class="mr-3 force" for="plantilla">Plantilla <span class="force-red">*</span></label>
            <label class="switch mr-3" for="plantilla">
                <input type="checkbox" name="plantilla" id="plantilla">
                <span class="slider round"></span>
            </label>
        </div>

        <!-- Botones para guardar y cancelar -->
        <div class="w-full flex justify-end mt-4 gap-2">
            <button type="button" class="botonCheck text-center w-[84px] border border-[#2C2554] hover:bg-white text-sm font-medium hover:text-[#2C2554] bg-[#2C2554] text-[#FFFFFF] rounded-full" onclick="closeModalActividadReclutamiento()">Cancelar</button>
            <button type="button" class="botonCheck text-center w-[84px] border border-[#2C2554] hover:bg-white text-sm font-medium hover:text-[#2C2554] bg-[#2C2554] text-[#FFFFFF] rounded-full" onclick="guardaElementoActividadReclutamiento(${menu_opcion},${submenu_opcion})">Guardar</button>
        </div>
    `;

    // Insertar el contenido en el modal
    document.getElementById('modalContentReclutamiento').innerHTML = modalContent;

    // Mostrar el modal
    document.getElementById('modalCrearActividad').classList.remove('hidden');
}

/**
 * Modal para mostrar la creacion de nuevas actividades
 * 
 */
function modalActividadReclutamientoVP20(encuestas,tipos,empresas,menu_opcion,submenu_opcion) {
    // Crear el contenido del modal
    let modalContent = `
        <h2>Nueva Actividad</h2>

        <!-- div para la empresa -->
        <div class="item_elemento">
            <label class="force"">Empresa:</label>
            <select name="id_empresas_actividades">
                <option value="-1">Seleccionar empresa</option>
                ${empresas.map(empresa => `<option value="${empresa.id}">${empresa.nombre}</option>`).join('')}
            </select>
        </div>

        <!-- div para el nombre -->
        <div class="item_elemento">
            <label class="force input_label_form">Nombre:</label>
            <input type="text" name="nombre" >
        </div>

        <!-- div para el tipo -->
        <div class="item_elemento">
            <label class="force input_label_form" required="required">Tipo:</label>
            <select name="id_reclutamiento_actividad_tipo" >
                <option value="-1">Seleccionar Tipo</option>
                ${tipos.map(tipo => `<option value="${tipo.id}">${tipo.nombre}</option>`).join('')}
            </select>
        </div>

        <!-- div para el encuesta -->
        <div class="item_elemento">
            <label class=" force input_label_form" for="id_encuesta">Encuesta:</label>
            <select name="id_encuesta">
                <option value="-1">Seleccionar encuesta</option>
                ${encuestas.map(encuesta => `<option value="${encuesta.id}">${encuesta.nombre}</option>`).join('')}
            </select>
        </div>

        <!-- div para la descripcion -->

        <div class="item_elemento">
            <label class="force" to="descripcion">Descripcion:</label>
            <textarea maxlength="200" name="descripcion" rows="3" placeholder="Max: 200 caracteres"></textarea>
        </div>

        <!-- div para la plantilla -->
        <div class="item_elemento">
            <label to="plantilla">Plantilla:</label>
            <input type="checkbox" name="plantilla" id="plantilla">
        </div>'

        <!-- Botones para guardar y cancelar -->
        <div style=" width:90%; display:flex; justify-content:end; margin-top:1rem; gap:1rem; border:0; height:40px; line-height: 40px;">
            <div style="margin: 5px 0;padding: 2px 10px;color: #666;background: rgb(221,221,221);border: 1px solid #bbb;line-height: 24px; font-size: 12px;cursor: pointer;"  onclick="closeModalActividadReclutamiento()">Cancelar</div>
            <div style="margin: 5px 0;padding: 2px 10px;color: #666;background: rgb(221,221,221);border: 1px solid #bbb;line-height: 24px; font-size: 12px;cursor: pointer;" onclick="guardaElementoActividadReclutamiento(${menu_opcion},${submenu_opcion})">Guardar</div>
        </div>
    `;

    // Insertar el contenido en el modal
    document.getElementById('modalContentReclutamiento').innerHTML = modalContent;

    // Mostrar el modal
    document.getElementById('modalCrearActividad').classList.remove('hidden');
}

// Función para cerrar el modal
function closeModalActividadReclutamiento(){
    document.getElementById('modalCrearActividad').classList.add('hidden');
}

// Función para validar el formulario de creación de actividades
function validaFormularioActividadReclutamiento(){
    const data = {}
    let errores = '';

    data.id_empresas = document.querySelector('select[name="id_empresas_actividades"]').value;
    if (data.id_empresas == -1){
        errores += '- Debe seleccionar una empresa<br/>';
    }

    data.nombre = document.querySelector('input[name="nombre"]').value;
    if (data.nombre.length <= 0){
        errores += '- Debe darle un nombre a la actividad<br/>';
    }

    data.id_reclutamiento_actividad_tipo = document.querySelector('select[name="id_reclutamiento_actividad_tipo"]').value;
    if (data.id_reclutamiento_actividad_tipo == -1){
        errores += '- Debe seleccionar un tipo de actividad<br/>';
    }

    data.id_encuesta = document.querySelector('select[name="id_encuesta"]').value;
    if (data.id_encuesta == -1){
        errores += '- Debe seleccionar una encuesta<br/>';
    }

    data.descripcion = document.querySelector('textarea[name="descripcion"]').value;
    if (data.descripcion.length <= 0){
        errores += '- Debe colocar una descripción<br/>';
    }

    data.plantilla = document.querySelector('input[name="plantilla"]').checked ? 1 : 0;

    if (errores.length > 0){
        showDialog(errores);
        exit();
    }else{
        return data;
    }
}

function reloadActividadesReclutamiento(){
    if(document.getElementById("id_empresas_actividades") != null){
        var empresa_id = document.getElementById("id_empresas_actividades").value;
        if(empresa_id != ""){
            var url = "";
            var ajax = objetoAjax();;
            url = "../common/recarga_actividades_reclutamiento.php?id=" + empresa_id;
            ajax.open("GET", url, true);
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200){
                        esperaRespuesta(false);
                        var html_txt = ajax.responseText;
                        if(html_txt != ""){
                            var jsonData = JSON.parse(html_txt);
                            if(jsonData.estado == 1){
                                console.log("No hay empresa asignada");
                                //document.getElementById('obd_id_responsable').innerHTML = '<option value="">seleccionar_responsable</option>';
                            }else if(jsonData.estado == 2){
                                showDialog(jsonData.mensaje);
                                flag_echar = true;
                            }else if(jsonData.estado == 0){
                                var arr_actividades = jsonData.arr_actividades;
                                if (typeof selActividad != "undefined") {
                                    for (var key in arr_actividades) {
                                      if (
                                        arr_actividades.hasOwnProperty(key) &&
                                        /^0$|^[1-9]\d*$/.test(key) &&
                                        key <= 4294967294
                                      ) {
                                        selActividad.options[
                                            selActividad.options.length
                                        ] = new Option(arr_actividades[key], key);
                                      }
                                    }
                                    $("#id_procesos_actividades").pqSelect("refreshData");
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

function guardaElementoActividadReclutamiento(menu_opcion,submenu_opcion){
    const dataActividad = validaFormularioActividadReclutamiento();

    // Crear un objeto FormData
    const formData = new FormData();

    // Agregar los datos al FormData
    for (const key in dataActividad) {
        if (dataActividad.hasOwnProperty(key)) {
            formData.append(key, dataActividad[key]);
        }
    }

    var url = "";
    var ajax = objetoAjax();
    url = "../common/guarda_elemento_reclutamiento.php";
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
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        showDialog(jsonData.mensaje);
                        closeModalActividadReclutamiento();
                        document.getElementById("id_empresas_reclutamiento").value = "";
                        reloadEmpleadosEmpresaReclutamiento(document.getElementById("id_procesos_actividades"),menu_opcion,submenu_opcion);
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
    ajax.send(formData);
}

/* //Funcion para guardar la actividad
function guardaElementoActividadReclutamiento() {

    try{
        const dataActividad = validaFormularioActividadReclutamiento();
        const resp = fetch(
            '../common/guarda_elemento_reclutamiento.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                body: JSON.stringify(dataActividad)
            })

        resp.then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la llamada a la API');
            }
        }
        ).then((jsonData) => {
            if(jsonData.code === 400){
                showDialog(showDialog("3"));
            }else if(jsonData.code == 200){
                showDialog("3");
                // Cerrar el modal
                closeModalActividadReclutamiento();
                // Recargar las actividades
                reloadActividadesReclutamiento();
            }
        }).catch((error) => {
            showDialog(error.message);
        });
    }catch(error){
        showDialog(error.message);
    }
    
    
    
} */

