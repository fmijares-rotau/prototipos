let slideIndex = 0;
var existingIds = new Set();// Conjunto global para almacenar los IDs de las tarjetas ya agregadas
var clickCount = 0;// Variable global para llevar el conteo

// Actualizar el HTML
const nombreElement = document.querySelector('.info h2');
const tareasAsignadasElement = document.querySelector('.info p:first-child');
const tareasTerminadasElement = document.querySelector('.info p:last-child');
const progressBarElement = document.querySelector('.progress-bar div');

if (typeof empleado !== 'undefined' && empleado !== null) {
    //nombreElement.textContent = empleado.nombre;
    tareasAsignadasElement.textContent = `Tareas asignadas: ${empleado.tareasAsignadas}`;
    tareasTerminadasElement.textContent = `Tareas terminadas: ${empleado.tareasTerminadas}`;

    // Calcular y aplicar el porcentaje
    const porcentaje = (empleado.tareasTerminadas / empleado.tareasAsignadas) * 100;
    progressBarElement.style.width = `${porcentaje}%`;
}


function reiniciarExistingIds(){
    existingIds = new Set();
}

function buscarTarjetasByGrupos(grupos){
    /**
     * Debo primero verificar si la tarea ya fue agregada a la tabla, esto ocurre
     * cuando abro la edicion de un proceso. Todas la tareas que encuentre las agrego
     * a existingIds para que no se vuelvan a agregar
     */

    // Obtener todos los elementos input con la clase 'id_tareas_obd'
    var elementosTareas = document.querySelectorAll('.id_tareas_obd');

    // Crear un array para almacenar los valores
    var valoresTareas = [];

    // Iterar sobre los elementos y obtener sus valores
    elementosTareas.forEach(function(elemento) {
        valoresTareas.push(elemento.value);
    });

    // Agregar los valores del array valoresTareas al conjunto existingIds
    valoresTareas.forEach(function(id) {
        if (id.trim() !== '') {
            existingIds.add(id.trim());
        }
    });

    // Mostrar los valores en la consola
    console.log(existingIds);    

    /*****************Fin de dicha verificacion *****************/
    /**
     * Debo primero verificar si la tarea ya fue agregada a la tabla, esto ocurre
     * cuando abro la edicion de un proceso. Todas la tareas que encuentre las agrego
     * a existingIds para que no se vuelvan a agregar
     */

    // Obtener todos los elementos input con la clase 'id_tareas_obd'
    var elementosTareas = document.querySelectorAll('.id_tareas_obd');

    // Crear un array para almacenar los valores
    var valoresTareas = [];

    // Iterar sobre los elementos y obtener sus valores
    elementosTareas.forEach(function(elemento) {
        valoresTareas.push(elemento.value);
    });

    // Agregar los valores del array valoresTareas al conjunto existingIds
    valoresTareas.forEach(function(id) {
        if (id.trim() !== '') {
            existingIds.add(id.trim());
        }
    });

    // Mostrar los valores en la consola
    console.log(existingIds);    

    /*****************Fin de dicha verificacion *****************/

    // Obtener el elemento div
    var formData = new FormData();
    formData.append('grupos', grupos);
    var ajax = objetoAjax();
    url = "../common/get_tareas_grupos.php";
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
                        // Parsear las nuevas tareas desde arr_aux[1]
                        let nuevasTareas = JSON.parse(arr_aux[1]);
                        // Actualizar la tabla con las nuevas tareas
                        actualizarTablaConTareas(nuevasTareas);
                        // Parsear las nuevas tareas desde arr_aux[1]
                        //let nuevasTareas = JSON.parse(arr_aux[1]);
                        //console.log(nuevasTareas);
                        // Actualizar la tabla con las nuevas tareas
                        actualizarTablaConTareas(nuevasTareas);
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

// Función para actualizar la tabla con nuevas tareas
function actualizarTablaConTareas(nuevasTareas) {
    let fila = document.querySelector('#tabla_proceso_onboarding tbody');
    let titulo = document.querySelector('#titulo-lista-onboarding');
    let tabla = document.querySelector('#tabla_proceso_onboarding');
    // mostramos el titulo y encabezado de la tabla de empleados agregados
    titulo.classList.remove('oculto');
    tabla.classList.remove('oculto');
    let nuevaFila = ``;

    // Iterar sobre las nuevas tareas
    nuevasTareas.forEach(item => {
        if(item['prioridad'] == 1){
            item['prioridad'] = prioridad_baja;
        }else if(item['prioridad'] == 2){
            item['prioridad'] = prioridad_media;
        }else if(item['prioridad'] == 3){
            item['prioridad'] = prioridad_alta;
        }
        // Solo agregar la tarea si no está ya presente en el conjunto global existingIds
        if (!existingIds.has(item['id'])) {
            nuevaFila += `
            <input type="hidden" name="id_tareas[]" value="${item['id']}" />
            <tr>
                <td class="px-[1%] py-[.5%]" width="20%" style="vertical-align:middle">${item['nombre']}</td>
                <td class="px-[1%] py-[.5%]" width="50%" style="vertical-align:middle">${item['descripcion']}</td>	
                <td class="px-[1%] py-[.5%]" width="10%" style="vertical-align:middle">${item['prioridad']}</td>
                <td class="px-[1%] py-[.5%]" width="20%" style="vertical-align:middle">${item['nombre_responsable']}</td>
            </tr>
            `;
            // Agregar el ID al conjunto global existingIds
            existingIds.add(item['id']);
        }
    });

    // Agregar las nuevas filas a la tabla sin borrar las anteriores
    fila.innerHTML += nuevaFila;
    //document.querySelector('#id_grupos_h').value = grupos.toString();
    console.log(existingIds);
}

// Función para actualizar la tabla con nuevas tareas
function actualizarTablaConTareaIndividual(nuevaTarea) {
    if(nuevaTarea['prioridad'] == 1){
        nuevaTarea['prioridad'] = prioridad_baja;
    }else if(nuevaTarea['prioridad'] == 2){
        nuevaTarea['prioridad'] = prioridad_media;
    }else if(nuevaTarea['prioridad'] == 3){
        nuevaTarea['prioridad'] = prioridad_alta;
    }

    let fila = document.querySelector('#tabla_proceso_onboarding tbody');
    let titulo = document.querySelector('#titulo-lista-onboarding');
    let tabla = document.querySelector('#tabla_proceso_onboarding');
    // mostramos el titulo y encabezado de la tabla de empleados agregados
    titulo.classList.remove('oculto');
    tabla.classList.remove('oculto');
    let nuevaFila = ``;

    // Iterar sobre las nuevas tareas
    //nuevasTareas.forEach(item => {
        // Solo agregar la tarea si no está ya presente en el conjunto global existingIds
        if (!existingIds.has(nuevaTarea['id'])) {
            nuevaFila += `
            <input type="hidden" name="id_tareas[]" value="${nuevaTarea['id']}" />
            <tr>
                <td class="px-[1%] py-[.5%]" width="20%" style="vertical-align:middle">${nuevaTarea['tarea']}</td>
                <td class="px-[1%] py-[.5%]" width="50%" style="vertical-align:middle">${nuevaTarea['descripcion']}</td>	
                <td class="px-[1%] py-[.5%]" width="10%" style="vertical-align:middle">${nuevaTarea['prioridad']}</td>
                <td class="px-[1%] py-[.5%]" width="20%" style="vertical-align:middle">${nuevaTarea['nombre_responsable']}</td>
            </tr>
            `;
            // Agregar el ID al conjunto global existingIds
            existingIds.add(nuevaTarea['id']);
        }
    //});

    // Agregar las nuevas filas a la tabla sin borrar las anteriores
    fila.innerHTML += nuevaFila;
}

//$contador_fila_tarea = 0;
//function FilaTareaOnboarding(option){
function FilaTareaOnboarding(option){
    //Obtener el valor de option sabiendo que es un [Object HTMLInputElement] y obtener el valor de su atributo value
    
    var tarea_id = option;
    var tarea_id = option;
    if(tarea_id != ""){
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/fila_tarea_onboarding.php?id=" + tarea_id;
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
                            var listaTareas = jsonData.tareas
                            //console.log(listaTareas);
                            let id_tarea=listaTareas.id;
                            //console.log(id_tarea);
                            let nombre_tarea = String(listaTareas.tarea);
                            let desc_tarea = listaTareas.descripcion;
                            let plazo_tarea = listaTareas.dias;
                            let prior_tarea = listaTareas.prioridad;
                            let responsable = listaTareas.nombre_responsable;
                            let selTarea = document.querySelector('#tareas_onboarding');
                            if(prior_tarea == 1){
                                prior_tarea = prioridad_baja;
                            }else if(prior_tarea == 2){
                                prior_tarea = prioridad_media;
                            }else if(prior_tarea == 3){
                                prior_tarea = prioridad_alta;
                            }
                            let fila = document.querySelector('#tabla_body_tareas');
                            let titulo = document.querySelector('#titulo-lista-onboarding');
                            let tabla = document.querySelector('#tabla-gt-onboarding');
                            // mostramos el titulo y encabezado de la tabla de empleados agregados
                            titulo.classList.remove('oculto');
                            tabla.classList.remove('oculto');
                            let nuevaFila = ``;  
                            //if (!existingIds.has(id_tarea)) {
                                nuevaFila += `
                                    <tr id="fila_${id_tarea}">
                                        <input type="hidden" name="id_tarea[]" value="${id_tarea}">
                                        <td width="20%">${nombre_tarea}</td>
                                        <td width="30%">${desc_tarea}</td>
                                        <td width="10%">${plazo_tarea}</td>
                                        <td width="10%">${prior_tarea}</td>
                                        <td width="20%">${responsable}</td>        
                                        <td width="8%">
                                            <a class="borrar tabla_accion" onclick="javascript:borrarFilaTareas(${id_tarea},'${nombre_tarea}');">${borrar}</a>    
                                        </td>
                                    </tr>
                                `;
                                // Agregar el ID al conjunto global existingIds
                                existingIds.add(id_tarea);
                            //}
                            // agregar fila
                            fila.innerHTML += nuevaFila;
                            // ocultamos la opcion del selector
                            selTarea.querySelector(`option[value="${id_tarea}"]`).remove();
                            selTarea.value = "";
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

function borrarFilaTareas(id, nombre){
    console.log(nombre)
    var fila = document.querySelector('#fila_'+id);
    fila.remove();
    //existingIds.delete(id);
    let selTarea = document.querySelector('#tareas_onboarding');
    let option = document.createElement('option');
    option.value = id;
    option.text = nombre;
    selTarea.appendChild(option);
}

/**
 * Funcion que recarga los empleados y las tareas onboarding dependiendo de la empresa seleccionada
 *
 */
function reloadEmpleadosEmpresaOnboarding(selectBox,menu_opcion,submenu_opcion){
    if(selectBox != null){
        var empresa_id = selectBox.options[selectBox.selectedIndex].value;
        if(document.getElementById("obd_id_empleado") != null){
            var empleadoSelect = document.getElementById("obd_id_empleado");
            texto = empleadoSelect.options[0].text;
            empleadoSelect.options.length = 0;
            empleadoSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("obd_id_responsable") != null){
            var responsableSelect = document.getElementById("obd_id_responsable");
            texto = responsableSelect.options[0].text;
            responsableSelect.options.length = 0;
            responsableSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("id_grupos") != null){
            var gruposSelect = document.getElementById("id_grupos");
            texto = gruposSelect.options[0].text;
            gruposSelect.options.length = 0;
            gruposSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("tareas_onboarding") != null){
            var tareasSelect = document.getElementById("tareas_onboarding");
            texto = tareasSelect.options[0].text;
            tareasSelect.options.length = 0;
            tareasSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("tareas_procesos_onboarding") != null){
            var tareasSelect = document.getElementById("tareas_procesos_onboarding");
            texto = tareasSelect.options[0].text;
            tareasSelect.options.length = 0;
            tareasSelect.options[0] = new Option(texto,"");
        }

        //if(empresa_id != ""){
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
                                /* var listaEmpleados = jsonData.empleados
                                var selectEmpleados = document.getElementById('filtro_empleados');
                                if(selectEmpleados != null && selectEmpleados != undefined){
                                    var cajaEmpleados = selectEmpleados.parentNode;
                                    cajaEmpleados.innerHTML = listaEmpleados;
                                    $(function () {
                                        $("#filtro_empleados").pqSelect({
                                            singlePlaceholder: seleccionar_responsable,
                                            radio: true,
                                            search: true
                                        }).on("change", function (evt) {
                                            var val = $(this).val();
                                            var idEmpleados = document.getElementById("id_empleados");
                                            if(idEmpleados != null){
                                                idEmpleados.value = val;
                                                console.log(val);
                                            }
                                        });
                                    });
                                }
                                var inputListaEmpl = document.getElementById("id_empleados");
                                if(inputListaEmpl != null && inputListaEmpl != undefined){
                                    inputListaEmpl.value = "";
                                } */

                                /* var listaTareas = jsonData.tareas
                                console.log(listaTareas);
                                var selectTareas = document.getElementById('tareas_onboarding');
                                var tabla_tareas = document.getElementById('tabla_body_tareas');
                                //Eliminar las filas de la tabla con id=tabla_body_tareas
                                if(tabla_tareas != null && tabla_tareas != undefined){
                                    tabla_tareas.innerHTML = "";
                                }
                                if(selectTareas != null && selectTareas != undefined){
                                    //cargar el selecTareas con el html que tiene listaTareas
                                    selectTareas.innerHTML = listaTareas;
                                } */

                                var arr_empleados = jsonData.arr_empleados;
                                var arr_tareas = jsonData.arr_tareas;
                                var arr_grupos = jsonData.arr_grupos;

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
                                    $("#obd_id_empleado").pqSelect("refreshData");
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
                                    $("#obd_id_responsable").pqSelect("refreshData");
                                }
                                if (typeof gruposSelect != "undefined") {
                                    for (var key in arr_grupos) {
                                      if (
                                        arr_grupos.hasOwnProperty(key) &&
                                        /^0$|^[1-9]\d*$/.test(key) &&
                                        key <= 4294967294
                                      ) {
                                        gruposSelect.options[
                                            gruposSelect.options.length
                                        ] = new Option(arr_grupos[key], key);
                                      }
                                    }                                    
                                    $("#id_grupos").pqSelect("refreshData");
                                }
                                if(jsonData.filtro_tarea == 1){
                                    if (typeof tareasSelect != "undefined") {
                                        for (var key in arr_tareas) {
                                        if (
                                            arr_tareas.hasOwnProperty(key) &&
                                            /^0$|^[1-9]\d*$/.test(key) &&
                                            key <= 4294967294
                                        ) {
                                            tareasSelect.options[
                                                tareasSelect.options.length
                                            ] = new Option(arr_tareas[key], key);
                                        }
                                        }
                                        $("#tareas_onboarding").pqSelect("refreshData");
                                    }
                                }else if(jsonData.filtro_tarea == 2){
                                    if (typeof tareasSelect != "undefined") {
                                        for (var key in arr_tareas) {
                                        if (
                                            arr_tareas.hasOwnProperty(key) &&
                                            /^0$|^[1-9]\d*$/.test(key) &&
                                            key <= 4294967294
                                        ) {
                                            tareasSelect.options[
                                                tareasSelect.options.length
                                            ] = new Option(arr_tareas[key], key);
                                        }
                                        }
                                        $("#tareas_procesos_onboarding").pqSelect("refreshData");
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
            esperaRespuesta(true);
            ajax.send(null);
        //}
    }else{
        showDialog(invalidOption);
    }
}

function FilaTareaProcesosOnboarding(option){

    /**
     * Debo primero verificar si la tarea ya fue agregada a la tabla, esto ocurre
     * cuando abro la edicion de un proceso. Todas la tareas que encuentre las agrego
     * a existingIds para que no se vuelvan a agregar
     */
    // Obtener todos los elementos input con la clase 'id_tareas_obd'
    var elementosTareas = document.querySelectorAll('.id_tareas_obd');

    // Crear un array para almacenar los valores
    var valoresTareas = [];

    // Iterar sobre los elementos y obtener sus valores
    elementosTareas.forEach(function(elemento) {
        valoresTareas.push(elemento.value);
    });

    // Agregar los valores del array valoresTareas al conjunto existingIds
    valoresTareas.forEach(function(id) {
        if (id.trim() !== '') {
            existingIds.add(id.trim());
        }
    });
    /*****************Fin de dicha verificacion *****************/

    var tarea_id = option;
    if(tarea_id != ""){
        var url = "";
        var ajax = objetoAjax();;
        url = "../common/fila_tarea_procesos_onboarding.php?id=" + tarea_id
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
                            // Parsear las nuevas tareas desde arr_aux[1]
                            let nuevaTarea = JSON.parse(arr_aux[1]);
                            // Actualizar la tabla con las nuevas tareas
                            actualizarTablaConTareaIndividual(nuevaTarea);
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

function cambiaEstadoOnboarding(menu,submenu,id_pt,checkbox){
    // Obtener el valor del checkbox que ha cambiado
    let changedValue = checkbox.value;
    let isChecked = checkbox.checked ? 1 : 0;

    // Obtener todos los checkboxes con el nombre 'estado[]'
    let checkboxes = document.querySelectorAll('input[name="estado[]"]:checked');

    // Crear un array para almacenar los valores seleccionados
    let selectedValues = [];

    // Recorrer los checkboxes y agregar los valores seleccionados al array
    checkboxes.forEach((checkbox) => {
        selectedValues.push(checkbox.value);
    });

    // Crear un objeto FormData para enviar los datos mediante AJAX
    let formData = new FormData();
    formData.append('changedValue', changedValue);
    formData.append('isChecked', isChecked);
    formData.append('id_pt', id_pt);
    formData.append('submenu', submenu);
    formData.append('selectedValues', JSON.stringify(selectedValues));

    // Crear una instancia de XMLHttpRequest
    let ajax = objetoAjax();
    let url = "../common/cambia_estado_onboarding.php";
    ajax.open("POST", url, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200){
                esperaRespuesta(false);
                let html_txt = ajax.responseText;
                if(html_txt != ""){
                    let jsonData = JSON.parse(html_txt);
                    if(jsonData.estado == 1){
                        checkbox.checked = !isChecked;
                        showDialog(jsonData.mensaje);
                    }else if(jsonData.estado == 2){
                        showDialog(jsonData.mensaje);
                        flag_echar = true;
                    }else if(jsonData.estado == 0){
                        irAContenido(menu_activo,menu,submenu);
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

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");
    if(slides.length > 0) {
        if (n >= slides.length) { slideIndex = 0 }
        if (n < 0) { slideIndex = slides.length - 1 }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
        }
        slides[slideIndex].style.display = "flex";
        slides[slideIndex].classList.add("active");
    }
}

// Mostrar la primera diapositiva al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    showSlides(slideIndex);
});

function irAContenidoMiOnboarding(menu, submenu){
    irAContenido(menu_activo,menu,submenu);
}

function removeDocumentoFieldOnboarding(id) {
    let archive = document.getElementById(id);
    if (archive) {
        archive.remove(); 
    }

    //Obtener el elemento con id="divArchivo" y cambiarle su clase
    let divDocumentoField = document.getElementById('documento_field');
    if (divDocumentoField) {
        divDocumentoField.remove();
    }

    //Crear un nuevo div con id="divArchivo"
    let newDiv = document.createElement('div');
    newDiv.id = 'divDocumentoField';
    newDiv.className = 'flex items-center w-[25%]';

    // Agregar el nuevo input de archivo
    let newFileInput = document.createElement('input');
    newFileInput.className = 'block w-full mb-5 text-xs text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400';
    newFileInput.type = 'file';
    newFileInput.name = 'json_documentos[]';
    newFileInput.id = 'documento';
    newFileInput.size = '40';

    //necesito que newFileImput quede dentro del div con id="divArchivo"
    newDiv.appendChild(newFileInput);

    // Agregar el nuevo input al contenedor principal
    let container = document.getElementById('divArchivo');
    if (container) {
        container.insertBefore(newDiv, container.firstChild);
    }

    // Eliminar el botón con id="button_delete_archive"
    let deleteButton = document.getElementById('button_delete_archive');
    if (deleteButton) {
        deleteButton.remove();
    }

    //Eliminar el input hidden con id="hidden_json_documentos"
    let hiddenInput = document.getElementById('hidden_json_documentos');
    if (hiddenInput) {
        hiddenInput.remove();
    }

    // Resetear el select con id="id_tipo_documento"
    let tipoDocumentoSelect = document.getElementById('id_tipo_documento');
    if (tipoDocumentoSelect) {
        tipoDocumentoSelect.selectedIndex = 0;
    }

    // Resetear el select con id="id_tipo_firma"
    let tipoFirmaSelect = document.getElementById('id_tipo_firma');
    if (tipoFirmaSelect) {
        tipoFirmaSelect.selectedIndex = 0;
    }
}

// Function to validate the image uploaded
function validateImageOnboarding(input) {
    const file = input.files[0];
    if (file) {
        const fileType = file.type;
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(fileType)) {
            showDialog(mensaje_carga_imagenes);
            input.value = ""; // clean the input
        }
    }
}
