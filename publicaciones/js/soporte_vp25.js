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
                        //document.getElementById('submenu').innerHTML = '';
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
                    $("#breadcrumbs_header").html("<ol id='breadcrumbs_list'  class='list-reset flex ml-[10px] text-[20px]'><li class='text-[#707070]'>"+mensaje_soporte+"</li></ol>")                   
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


function agregarAnexos(){
    nuevo ='<div class="tic_elemento">';
    nuevo += '                          <div class="logotipo w-full">';
    nuevo += '                              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" to="attachments">Archivo</label>';
    nuevo += '                              <input class="block w-full mb-5 text-xs text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400" type="file" name="attachments[]" size="40">';        
    nuevo += '                          </div>';
    nuevo += '                          <div class="cursor-pointer ml-5 leading-8 text-center w-[100px] rounded-full border border-solid border-[#2C2554] hover:bg-white  text-sm  font-medium hover:text-[#2C2554] bg-[#2C2554] text-[#FFFFFF]" onclick="javascript:borrarAnexos(event);">Borrar</div>';
    nuevo +='</div>';
    $("#anexos").append(nuevo);
}


