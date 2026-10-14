let DISCStartTime;
let DISCEndTime;
let NumBlock;

function AddContenidoEncuestas(){

    let x = 0;
    let Preguntas = $('#GeneralContenedor');
    x = Preguntas.find('.Preguntas');
    $('#length_preguntas').val(x.length + 1);

    var id_x = $('#length_preguntas').val();

    var val = $('#obligatorio_todos').val();
    if(val == 1){
        var check = 'checked';
    }else{
        var check = '';
    }

    // Al Iniciar el Proceso de Agregar Preguntas Bloqueamos que Pueda Cambiar El Tipo y la Asignacion de la Encuesta.
    //$("#id_empresas").prop("disabled", true);
    //$("#nombre").prop("disabled", true);
    $("#id_tipo").prop("disabled", true);
    $("#flag_responsable_web").prop("disabled", true);
    //$("#TituloEncuesta").prop("disabled", true);
    //$("#DescripcionEncuesta").prop("disabled", true);
    //$("#obligatorio_todos").prop("disabled", true);

    var tipo = $("#id_tipo").val();

    let Contenedor = $('#GeneralContenedor');

    if(tipo == 2){
        var Contenido = '     <div class="!pt-[30px] !px-[15px] formulario rounded-xl !border-0 !bg-white shadow-lg mt-2 Preguntas" id="Contenedor-'+id_x+'">'+
        '                        <div class="w-full flex">'+
        '                            <div class="input_group mt-[-10px] flex justify-between w-[70%]">'+
        '                                <label class="force input_label_form" to="PreguntaEncuesta">'+titulo_pregunta+'</label>'+
        '                                <input class="w-full input_field h-[26px]" type="text" maxlength="1000" name="PreguntaEncuesta['+id_x+'][1]" value="" autocomplete="off">'+
        '                            </div>'+
        '                            <div class="input_group mt-[-10px] ml-[5%] flex justify-between w-[30%]">'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="force input_label_form pl-[15px] mt-[-10px]" to="PreguntaEncuesta">D</label>'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][1]" autocomplete="off" value="1">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="force input_label_form pl-[15px] mt-[-10px]" to="PreguntaEncuesta">I</label>'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][1]" autocomplete="off" value="2">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="force input_label_form pl-[15px] mt-[-10px]" to="PreguntaEncuesta">S</label>'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][1]" autocomplete="off" value="3">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="force input_label_form pl-[15px] mt-[-10px]" to="PreguntaEncuesta">C</label>'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][1]" autocomplete="off" value="4">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                            </div>'+    
        '                        </div>'+

        '                        <div class="w-full flex mt-[25px]">'+
        '                            <div class="input_group mt-[-10px] flex justify-between w-[70%]">'+
        '                                <label class="force input_label_form" to="PreguntaEncuesta">'+titulo_pregunta+'</label>'+
        '                                <input class="w-full input_field h-[26px]" type="text" maxlength="1000" name="PreguntaEncuesta['+id_x+'][2]" value="" autocomplete="off">'+
        '                            </div>'+
        '                            <div class="input_group mt-[-10px] ml-[5%] flex justify-between w-[30%]">'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][2]" autocomplete="off" value="1">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][2]" autocomplete="off" value="2">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][2]" autocomplete="off" value="3">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][2]" autocomplete="off" value="4">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                            </div>'+    
        '                        </div>'+

        '                        <div class="w-full flex mt-[25px]">'+
        '                            <div class="input_group mt-[-10px] flex justify-between w-[70%]">'+
        '                                <label class="force input_label_form" to="PreguntaEncuesta">'+titulo_pregunta+'</label>'+
        '                                <input class="w-full input_field h-[26px]" type="text" maxlength="1000" name="PreguntaEncuesta['+id_x+'][3]" value="" autocomplete="off">'+
        '                            </div>'+
        '                            <div class="input_group mt-[-10px] ml-[5%] flex justify-between w-[30%]">'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][3]" autocomplete="off" value="1">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][3]" autocomplete="off" value="2">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][3]" autocomplete="off" value="3">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][3]" autocomplete="off" value="4">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                            </div>'+    
        '                        </div>'+

        '                        <div class="w-full flex mt-[25px]">'+
        '                            <div class="input_group mt-[-10px] flex justify-between w-[70%]">'+
        '                                <label class="force input_label_form" to="PreguntaEncuesta">'+titulo_pregunta+'</label>'+
        '                                <input class="w-full input_field h-[26px]" type="text" maxlength="1000" name="PreguntaEncuesta['+id_x+'][4]" value="" autocomplete="off">'+
        '                            </div>'+
        '                            <div class="input_group mt-[-10px] ml-[5%] flex justify-between w-[30%]">'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][4]" autocomplete="off" value="1">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][4]" autocomplete="off" value="2">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][4]" autocomplete="off" value="3">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                                  <div class="input_group w-[25%]">'+
        '                                      <label class="container_check ml-[10px] mt-[5px]">'+
        '                                          <input type="radio" name="Casillas['+id_x+'][4]" autocomplete="off" value="4">'+
        '                                          <span class="checkmark"></span>'+
        '                                      </label>'+
        '                                  </div>'+
        '                            </div>'+    
        '                        </div>'+
        '                      </div>';
    }else{
        var Contenido = '<div class="!pt-[30px] !px-[15px] formulario rounded-xl !border-0 !bg-white shadow-lg mt-2" id="Contenedor-'+id_x+'">'+
        '                         <div class="w-full flex">'+
        '                             <div class="input_group mt-[-10px] flex justify-between w-[25%]">'+
        '                                 <label class="force input_label_form" to="PreguntaEncuesta">'+titulo_pregunta+'</label>'+
        '                                 <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="PreguntaEncuesta['+id_x+']" autocomplete="off">'+
        '                             </div>'+
        '                             <div class="selector_form p-0 input_group w-[25%] ml-2">'+
        '                                 <label class="force input_label_form" to="TipoRespuesta">'+tipo_respuesta+'</label>'+
        '                                 <select class="w-full SelectTiposRespuestas" size="1" id="TipoRespuesta-'+id_x+'" name="TipoRespuesta['+id_x+']" required onchange="javascript:SelectTiposRespuestas('+id_x+')">'+
        '                                     <option value="1">'+respuesta_corta+'</option>'+
        '                                     <option value="2">'+parrafo+'</option>'+
        '                                     <option value="3">'+varias_opciones+'</option>'+
        '                                     <option value="4">'+casillas+'</option>'+
        '                                     <option value="5">'+desplegable+'</option>'+
        '                                 </select>'+
        '                             </div>'+
        '                         </div>'+
        '                         <div class="w-full flex">'+
        '                           <div class="input_group mt-[-10px] flex justify-between w-full">'+
        '                               <label class="force input_label_form" to="DescripcionPreguntaEncuesta">'+descripcion_pregunta+'</label>'+
        '                               <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="DescripcionPreguntaEncuesta['+id_x+']" autocomplete="off">'+
        '                           </div>'+
        '                         </div>'+
        // Inicio de los campos del formularios  segun el tipo que se seleccione.
        '                         <div class="Preguntas" id="PreguntasContenedor-'+id_x+'">'+
        '                           <div class="mt-[2rem] w-full flex">'+
        '                               <div class="input_group mt-[-10px] flex justify-between w-[25%]">'+
        '                                   <label class="force input_label_form" to="RespuestaCorta">'+respuesta_encuesta+'</label>'+
        '                                   <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="RespuestaCorta['+id_x+'][]" autocomplete="off">'+
        '                               </div>'+
        '                           </div>'+
        '                         </div>'+
        // Fin de los campos del formularios  segun el tipo que se seleccione.
        '                         <hr style="width:100%;">'+
        '                         <div class="w-full flex justify-end items-center">'+
        '                              <i style="cursor: pointer;" class="px-[10px] bx bxs-copy items-center text-[25px] text22" onclick="javascript:DuplicaContenedor('+id_x+')"></i>'+    
        '                              <i style="cursor: pointer;" class="px-[10px] bx bxs-trash items-center text-[25px] text22" onclick="javascript:BorrarContenedor('+id_x+')"></i>'+
        '                              <div class="px-[10px] my-[10px] flex items-center">'+
        '                                  <label class="mr-3" to="obligatorio">'+obligatorio+'</label>'+
        '                                  <label class="switch mr-5">'+
        '                                      <input '+check+' type="checkbox" name="obligatorio['+id_x+']">'+
        '                                      <span class="slider round"></span>'+
        '                                  </label>'+
        '                              </div>'+
        '                              <i class="px-[10px] bx bx-dots-vertical-rounded items-center text-[25px] text22"></i>'+
        '                         </div>'+
        '                      </div>';
    }

    Contenedor.append(Contenido);
}

function BotonAddOpciones(id){

    let ContenedorPreguntas = $("#Opciones-"+id);
    var ContenidoNuevo = "";
    
    let x = 0;
    x = ContenedorPreguntas.find('.OpcionOpciones');
    var id_x = x.length + 1;

    ContenidoNuevo = '<div class="mt-[2rem] w-full flex OpcionOpciones" id="OpcionOpciones-'+id+'-'+id_x+'">'+
    '                   <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
    '                       <label class="force input_label_form" to="VariasOpciones">'+respuesta_encuesta+'</label>'+
    '                       <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="VariasOpciones['+id+'][]" autocomplete="off">'+
    '                       <i style="cursor: pointer;" class="px-[5px] bx bx-x-circle items-center text-[25px] text22" onclick="javascript:BorrarOpcionOpciones(\''+id+'-'+id_x+'\')"></i>'+
    '                   </div>'+
    '                 </div>';
    ContenedorPreguntas.append(ContenidoNuevo);
}

function BotonAddCasillas(id){

    let ContenedorPreguntas = $("#Casillas-"+id);
    var ContenidoNuevo = "";

    let x = 0;
    x = ContenedorPreguntas.find('.OpcionCasillas');
    var id_x = x.length + 1;

    ContenidoNuevo = '<div class="mt-[2rem] w-full flex OpcionCasillas" id="OpcionCasillas-'+id+'-'+id_x+'">'+
    '                   <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
    '                       <label class="force input_label_form" to="Casillas">'+respuesta_encuesta+'</label>'+
    '                       <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="Casillas['+id+'][]" autocomplete="off">'+
    '                       <i style="cursor: pointer;" class="px-[5px] bx bx-x-circle items-center text-[25px] text22" onclick="javascript:BorrarOpcionCasillas(\''+id+'-'+id_x+'\')"></i>'+
    '                   </div>'+
    '                 </div>';
    ContenedorPreguntas.append(ContenidoNuevo);
}

function BotonAddDesplegable(id){

    let ContenedorPreguntas = $("#Desplegable-"+id);
    var ContenidoNuevo = "";

    let x = 0;
    x = ContenedorPreguntas.find('.OpcionDesplegable');
    var id_x = x.length + 1;

    ContenidoNuevo = '<div class="mt-[2rem] w-full flex OpcionDesplegable" id="OpcionDesplegable-'+id+'-'+id_x+'">'+
    '                   <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
    '                       <label class="force input_label_form" to="Desplegable">'+respuesta_encuesta+'</label>'+
    '                       <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="Desplegable['+id+'][]" autocomplete="off">'+
    '                       <i style="cursor: pointer;" class="px-[5px] bx bx-x-circle items-center text-[25px] text22" onclick="javascript:BorrarOpcionDesplegable(\''+id+'-'+id_x+'\')"></i>'+
    '                   </div>'+
    '                 </div>';
    ContenedorPreguntas.append(ContenidoNuevo);
}

/** Cambio de Tipo de Respuestas **/
function SelectTiposRespuestas(id){

    let index = $("#TipoRespuesta-"+id).val();
    var ContenidoNuevo = "";

    let ContenedorPreguntas = $('#PreguntasContenedor-'+id);
    document.getElementById('PreguntasContenedor-'+id).innerHTML = '';

    if(index == 0){
        showDialog(invalidOption);
    }else if(index == 1){
        //Respuesta Corta
        ContenidoNuevo = '<div class="mt-[2rem] w-full flex">'+
        '                   <div class="input_group mt-[-10px] flex justify-between w-[25%]">'+
        '                       <label class="force input_label_form" to="RespuestaCorta">'+respuesta_encuesta+'</label>'+
        '                       <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="RespuestaCorta['+id+'][]" autocomplete="off">'+
        '                   </div>'+
        '              </div>';
        ContenedorPreguntas.append(ContenidoNuevo);
    }else if(index == 2){
        //Respuesta Larga
        ContenidoNuevo = '<div class="mt-[2rem] w-full flex">'+
        '                   <div class="input_group mt-[-10px] flex justify-between w-full">'+
        '                       <label class="force input_label_form" to="RespuestaLarga">'+respuesta_encuesta+'</label>'+
        '                       <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="RespuestaLarga['+id+'][]" autocomplete="off">'+
        '                   </div>'+
        '                 </div>';
        ContenedorPreguntas.append(ContenidoNuevo);
    }else if(index == 3){
        //Varias Opciones
        ContenidoNuevo = '<div id="Opciones-'+id+'">'+
        '                   <div class="mt-[2rem] w-full flex OpcionOpciones" id="OpcionOpciones-'+id+'-1">'+
        '                       <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
        '                           <label class="force input_label_form" to="VariasOpciones">'+respuesta_encuesta+'</label>'+
        '                           <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="VariasOpciones['+id+'][]" autocomplete="off">'+
        '                           <i style="cursor: pointer;" class="px-[5px] bx bx-x-circle items-center text-[25px] text22" onclick="javascript:BorrarOpcionOpciones(\''+id+'-1\')"></i>'+                      
        '                       </div>'+
        '                   </div>'+
        '                 </div>'+
        '                 <div class="mt-[2rem] w-full flex">'+
        '                   <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
        '                     <button type="button" class="BotonAddOpciones text-center w-[80px] rounded-full border border-[#2C2554] hover:bg-white text-sm font-medium hover:text-[#2C2554] bg-[#2C2554] text-[#FFFFFF] mr-[1px]" onclick="javascript:BotonAddOpciones('+id+')">'+anadir+'</button>'+
        '                   </div>'+
        '                 </div>';
        ContenedorPreguntas.append(ContenidoNuevo);
    }else if(index == 4){
        //Casillas
        ContenidoNuevo = '<div id="Casillas-'+id+'">'+
        '                   <div class="mt-[2rem] w-full flex OpcionCasillas" id="OpcionCasillas-'+id+'-1">'+
        '                       <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
        '                           <label class="force input_label_form" to="Casillas">'+respuesta_encuesta+'</label>'+
        '                           <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="Casillas['+id+'][]" autocomplete="off">'+
        '                           <i style="cursor: pointer;" class="px-[5px] bx bx-x-circle items-center text-[25px] text22" onclick="javascript:BorrarOpcionCasillas(\''+id+'-1\')"></i>'+                      
        '                       </div>'+
        '                   </div>'+
        '                 </div>'+
        '                 <div class="mt-[2rem] w-full flex">'+
        '                   <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
        '                       <button type="button" class="BotonAddCasillas text-center w-[80px] rounded-full border border-[#2C2554] hover:bg-white text-sm font-medium hover:text-[#2C2554] bg-[#2C2554] text-[#FFFFFF] mr-[1px]" onclick="javascript:BotonAddCasillas('+id+')">'+anadir+'</button>'+
        '                   </div>'+
        '                 </div>';
        ContenedorPreguntas.append(ContenidoNuevo);
    }else if(index == 5){
        //Desplegable
        ContenidoNuevo = '<div id="Desplegable-'+id+'">'+
        '                   <div class="mt-[2rem] w-full flex OpcionDesplegable" id="OpcionDesplegable-'+id+'-1">'+
        '                       <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
        '                           <label class="force input_label_form" to="Desplegable">'+respuesta_encuesta+'</label>'+
        '                           <input class="w-full input_field h-[26px]" type="text" maxlength="1000" size="40" name="Desplegable['+id+'][]" autocomplete="off">'+
        '                           <i style="cursor: pointer;" class="px-[5px] bx bx-x-circle items-center text-[25px] text22" onclick="javascript:BorrarOpcionDesplegable(\''+id+'-1\')"></i>'+                      
        '                       </div>'+
        '                   </div>'+
        '                 </div>'+
        '                 <div class="mt-[2rem] w-full flex">'+
        '                   <div class="input_group mt-[-10px] flex justify-between w-[50%]">'+
        '                       <button type="button" class="BotonAddDesplegable text-center w-[80px] rounded-full border border-[#2C2554] hover:bg-white text-sm font-medium hover:text-[#2C2554] bg-[#2C2554] text-[#FFFFFF] mr-[1px]" onclick="javascript:BotonAddDesplegable('+id+')">'+anadir+'</button>'+
        '                   </div>'+
        '                 </div>';
        ContenedorPreguntas.append(ContenidoNuevo);
    }
}

function BorrarOpcionOpciones(id){
    var data = '#OpcionOpciones-'+id;
    showConfirm(borrar_opcion_respuesta, BorrarOpcion, data);
}

function BorrarOpcionCasilla(id){
    var data = '#OpcionCasilla-'+id;
    showConfirm(borrar_opcion_respuesta, BorrarOpcion, data);
}

function BorrarOpcionDesplegable(id){
    var data = '#OpcionDesplegable-'+id;
    showConfirm(borrar_opcion_respuesta, BorrarOpcion, data);
}

function BorrarContenedor(id){
    var data = '#Contenedor-'+id;
    showConfirm(borrar_pregnta_contenedor, BorrarOpcion, data);
}

function BorrarOpcion(data){
    $(data).remove()
}

function AllCheckbox(){
    var val = $('#obligatorio_todos').val();
    if(val == 1){
        $('#obligatorio_todos').val(0);
        var Selectores = document.querySelectorAll('input[name^="obligatorio"]');
        Selectores.forEach(function(e){
            e.removeAttribute('checked')
        });
    }else{
        $('#obligatorio_todos').val(1);
        var Selectores = document.querySelectorAll('input[name^="obligatorio"]');
        Selectores.forEach(function(e){
            e.setAttribute('checked',true)
        });
    }
}

function DuplicaContenedor(id){

    let x = 0;
    let Preguntas = $('#GeneralContenedor');
    x = Preguntas.find('.Preguntas');
    $('#length_preguntas').val(x.length);

    var id_x = $('#length_preguntas').val();

    // Obtener el elemento original
    var elementoOriginal = document.getElementById("Contenedor-"+id);

    // Clonar el elemento
    var elementoClonado = elementoOriginal.cloneNode(true);

    var new_id = parseInt(id_x) + 1;
    // Cambiar el ID del elemento clonado
    elementoClonado.id = "Contenedor-"+new_id;

    const elementosHijosId = elementoClonado.querySelectorAll('[id]');
    elementosHijosId.forEach((elemento) => {
        elemento.id = elemento.id.replace(/-(\d+)/, "-"+new_id);
    });

    const elementosHijosName = elementoClonado.querySelectorAll('[name]');
    elementosHijosName.forEach((elemento) => {
        var regex = new RegExp(`\\[${id}\\]`, 'g');
        //var resultado = texto.replace(regex, `[${new_id}][]`);
        elemento.name = elemento.name.replace(regex, `[${new_id}]`);

    });

    const elementosHijosOnclick = elementoClonado.querySelectorAll('[onclick]');
    elementosHijosOnclick.forEach((elemento) => {
        const onclickValue = elemento.getAttribute('onclick');
        const nuevoOnclickValue = onclickValue.replace(/(\d+)-/, new_id+"-");
        const nuevoOnclickValue1 = onclickValue.replace(/(\d+)/, new_id);
        elemento.setAttribute('onclick', nuevoOnclickValue);
        elemento.setAttribute('onclick', nuevoOnclickValue1);

    });

    // Agregar el elemento clonado al documento
    let Contenedor = $('#GeneralContenedor');
    Contenedor.append(elementoClonado)

}


function CambioTipoEncuesta(tipo){    
    
    var id_tipo = tipo.value;
    if(id_tipo == 2 || id_tipo ==4  || id_tipo ==5  || id_tipo == 6 || id_tipo == 7){
        $("#add_pregunta").addClass('hidden');
        $("#imp_pregunta").addClass('hidden');
        $("#vol_pregunta").addClass('rounded-l-full');        
    }else{
        $("#add_pregunta").removeClass('hidden');
        $("#imp_pregunta").removeClass('hidden'); 
        $("#vol_pregunta").removeClass('rounded-l-full');   
    }
}

function ModalStartDISC(boton)
{   
    let x = 0;
    let Preguntas = $('#ContenedorGeneral');
    x = Preguntas.find('.Preguntas');
    var p = x.length;

    NumBlock = p;

    var val = $('#activar_movimiento').val();
    if(val == 1){
        $('#activar_movimiento').val(0);
    }else{
        $('#activar_movimiento').val(1);
        for(var i = 1; i <= p; i++){
            var DivMover = document.getElementById('Contenedor-'+i);
            var MovimientoEncuesta = Sortable.create(DivMover, {
                animation: 1300,
                chosenClass: "chosen",
                ghostClass: "ghost",
                disabled: false,
                dragClass: "drag",
                handle: '.handle',
            });
        }
    }
    DISCStartTime = new Date();
    
    //Comparo los Bloques y el Id para cambiar el Nombre del Boton.
    var id_tab = $('#BtnAccion').data('id');
    var Comp = Number(NumBlock);
    if( Comp == id_tab){
        $("#BtnAccion").html("Finalizar");
        $("#BtnAccion").css("width","100px");
    }

    $(".modalDialogEncuesta").css("opacity","1");
    $(".modalDialogEncuesta").css("pointer-events","auto");
}


function toggleTabDISC(boton)
{
    //Con esto obtengo la hora que finalice el Tab.
    DISCEndTime = new Date();
    
    //Oculto el Bloque Actual y Obtengo el Numero de Bloque
    $(".DISC").addClass("hidden");
    var id_tab = boton.getAttribute('data-id');

    //Aumento el Bloque en 1 para Mostrarlo
    var new_id = Number(id_tab) + 1;
    boton.setAttribute("data-id", new_id);
    $(".Bloque-"+new_id).removeClass("hidden");

    //Capturo el Tiempo invertido en el Bloque.
    var TimeActual = $('#TimeLong-'+id_tab).val();

    //Calculo el Tiempo Usado y lo Asigno al Form
    var TotalTime = Number(DISCEndTime) - Number(DISCStartTime);
    TotalTime = Number(TotalTime) + Number(TimeActual);
    $('#TimeLong-'+id_tab).val(TotalTime);

    //Comparo los Bloques y el Id para cambiar el Nombre del Boton.
    var Comp = Number(NumBlock) - 1;
    if( Comp == id_tab){
        $("#BtnAccion").html("Finalizar");
        $("#BtnAccion").css("width","100px");
    }

    //Al Ser el Ultimo Envio el Form a guardar.
    if(id_tab == NumBlock){
        $(".modalDialogEncuesta").css("opacity","0");
        $(".modalDialogEncuesta").css("pointer-events","none");
        guardaElementoEncuesta(5,49);
    }

    // Con esto reinicio la hora para el nuevo TAB
    DISCStartTime = new Date();
}

function CierraModalEncuesta()
{
    DISCEndTime = new Date();

    $('#flag_guardar').val(0);
    
    //Obtengo el Numero de Bloque
    var id_tab = $('#BtnAccion').data('id');

    //Capturo el Tiempo invertido en el Bloque.
    var TimeActual = $('#TimeLong-'+id_tab).val();

    //Calculo el Tiempo Usado y lo Asigno al Form
    var TotalTime = Number(DISCEndTime) - Number(DISCStartTime);
    TotalTime = Number(TotalTime) + Number(TimeActual);
    $('#TimeLong-'+id_tab).val(TotalTime);

    $(".modalDialogEncuesta").css("opacity","0");
    $(".modalDialogEncuesta").css("pointer-events","none");

    
    guardaElementoEncuesta(5,49);

}
function InicioMovimiento(){

    
    let x = 0;
    let Preguntas = $('#ContenedorGeneral');
    x = Preguntas.find('.Preguntas');
    var p = x.length;

    var val = $('#activar_movimiento').val();
    if(val == 1){
        console.log('No Activo');
    }else{
        for(var i = 1; i <= p; i++){
            var DivMover = document.getElementById('Contenedor-'+i);
            var MovimientoEncuesta = Sortable.create(DivMover, {
                animation: 1100,
                filter: '.filtered',
                chosenClass: "chosen",
                ghostClass: "ghost",
                disabled: false,
                dragClass: "drag",
                handle: '.handle',
                onStart: () => {
                    console.log('Start');
                },
                onEnd: function(event) {
                    console.log('End');
                },
                onMove(e) {
                    console.log('Mover');      
                },
            });
        }
    }
}

async function guardaElementoEncuesta(menu_opcion, submenu_opcion, flag_mobil) {
    if (!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)) {
        
        // Detenemos la ejecución de ExtSession
        if (ActInterval !== null) {
            clearInterval(ActInterval);
            ActInterval = null;
        }

        var formulario = document.getElementById("nuevo_elemento");
        if (!formulario) {
            showDialog("Formulario no encontrado.", 1);
            return false;
        }
        
        var longitudFormulario = formulario.elements.length;
        var formData = new FormData();
        var jsonObj = {};
        var flagSeleccionadas = false;
        if (flag_mobil == undefined || flag_mobil == 0) {
            formData.append('op', menu_opcion);
            formData.append('sub', submenu_opcion);
        } else {
            jsonObj.op = menu_opcion;
            jsonObj.sub = submenu_opcion;
        }
        
        var notificar = false;
        for (var i = 0; i < longitudFormulario; i++) {
            var elemento = formulario.elements[i];
            if (elemento.required && elemento.value == "") {
                showDialog(mensaje_faltan_campos, 1);
                elemento.classList.add("requerido");
                return false;
            }
            if (elemento.type != 'file') {
                if (flag_mobil == undefined || flag_mobil == 0) {
                    formData.append(elemento.name, elemento.value);
                } else if (elemento.name != "") {
                    jsonObj[elemento.name] = elemento.value;
                }
            }
        }

        var DataSend = (flag_mobil == undefined || flag_mobil == 0) ? formData : JSON.stringify(jsonObj);

        try {
            const response = await $.ajax({
                type: "POST",
                url: "../common/save_elem.php",
                data: DataSend,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    esperaRespuesta(true);
                }
            });

            var arr_aux = response.split("|");
            if (arr_aux[0] == 1) {
                showDialog(arr_aux[1], 1);
            }else if (arr_aux[0] == 2) {
                showDialog(arr_aux[1], 2);
                flag_echar = true;
            }else if (arr_aux[0] == 3) {
                var jsonData = JSON.parse(arr_aux[0]);
                try {
                    var JsonDatosGrafica = await GraficaImagenesEncuesta(arr_aux[2]);
                    if (JsonDatosGrafica) {
                        var ValidaAjax = await GuardaImagenesAjax(menu_opcion, submenu_opcion, arr_aux[3], JsonDatosGrafica);
                        if (ValidaAjax == true) {
                            showDialog(arr_aux[1], 3);
                            limpiarFiltros(menu_opcion, submenu_opcion, accionLista, null);
                        } else {
                            showDialog(arr_aux[1], 1);
                        }
                    }
                } catch (error) {
                    console.error('Error en GraficaImagenesEncuesta:', error);
                    showDialog('Error al generar las gráficas', 1);
                }
            }else {
                if(arr_aux[2] && arr_aux[2].length > 0) {
                    showDialog(arr_aux[2], 1);
                    limpiarFiltros(menu_opcion, submenu_opcion, accionLista, null);
                }else{
                    showDialog(arr_aux[1], 3);
                    limpiarFiltros(menu_opcion, submenu_opcion, accionLista, null);
                }
            }
        } catch (error) {
            console.error('Error en la petición AJAX:', error);
            showDialog('Error en la petición AJAX', 1);
        }

    } else {
        showDialog(invalidOption);
    }
}


async function GraficaImagenesEncuesta(DatosGraficas) {
    const Values = JSON.parse(DatosGraficas);
    let ArrayGrafica = {};

    for (let Secciones in Values) {
        ArrayGrafica[Secciones] = {};
        if (Secciones === 'Seccion1') {
            for (let Grafica in Values[Secciones]) {
                if (Grafica === 'Natural') {
                    var Graf_1 = await createDiscArcChart(Values[Secciones][Grafica]['D'],Values[Secciones][Grafica]['I'],Values[Secciones][Grafica]['S'],Values[Secciones][Grafica]['C'],1);
                    ArrayGrafica[Secciones][Grafica] = Graf_1;
                }
                if (Grafica === 'Adaptado') {
                    var Graf_2 = await createDiscArcChart(Values[Secciones][Grafica]['D'],Values[Secciones][Grafica]['I'],Values[Secciones][Grafica]['S'],Values[Secciones][Grafica]['C'],2);
                    ArrayGrafica[Secciones][Grafica] = Graf_2;
                }
            }
        }
        if (Secciones === 'Seccion3') {
            for (let Grafica in Values[Secciones]) {
                if (Grafica === 'Adaptado') {
                    let Graf_3 = await createDISCBarsChart_3(Values[Secciones][Grafica]['D'],Values[Secciones][Grafica]['I'],Values[Secciones][Grafica]['S'],Values[Secciones][Grafica]['C']);
                    let SplitGraf_3 = Graf_3.split(',');
                    ArrayGrafica[Secciones][Grafica] = SplitGraf_3[1];
                }
                if (Grafica === 'Natural') {
                    let Graf_4 = await createDISCBarsChart_3(Values[Secciones][Grafica]['D'],Values[Secciones][Grafica]['I'],Values[Secciones][Grafica]['S'],Values[Secciones][Grafica]['C']);
                    let SplitGraf_4 = Graf_4.split(',');
                    ArrayGrafica[Secciones][Grafica] = SplitGraf_4[1];
                }
                if (Grafica === 'Tiempo') {
                    let Graf_5 = await createHorizontalSlidingChart(Values[Secciones][Grafica], 1);
                    ArrayGrafica[Secciones][Grafica] = Graf_5;
                }
                if (Grafica === 'Energia') {
                    let Graf_6 = await createHorizontalSlidingChart(Values[Secciones][Grafica], 2);
                    ArrayGrafica[Secciones][Grafica] = Graf_6;
                }
                if (Grafica === 'Estres') {
                    let Graf_7 = await createHorizontalSlidingChart(Values[Secciones][Grafica], 2);
                    ArrayGrafica[Secciones][Grafica] = Graf_7;
                }
                if (Grafica === 'Estimulo') {
                    let Graf_8 = await createHorizontalSlidingChart(Values[Secciones][Grafica], 2);
                    ArrayGrafica[Secciones][Grafica] = Graf_8;
                }
            }
        }
        if (Secciones === 'Seccion4') {
            for (let Grafica in Values[Secciones]) {
                if (Grafica === 'RuedaDISC') {
                    try {
                        let Graf_9 = await createDiscWheelChart_2(Number(Values[Secciones][Grafica]['Natural']),Number(Values[Secciones][Grafica]['Adaptado']));
                        ArrayGrafica[Secciones][Grafica] = Graf_9;
                    } catch (error) {
                        console.error(`Error en createDiscWheelChart_2: ${error}`);
                    }
                }
                if (Grafica === 'RadarDISC') {
                    try {
                        let Graf_10 = await createRadarChart(JSON.parse(Values[Secciones][Grafica]['Natural']), JSON.parse(Values[Secciones][Grafica]['Adaptado']));
                        let SplitGraf_10 = Graf_10.split(',');
                        ArrayGrafica[Secciones][Grafica] = SplitGraf_10[1];
                    } catch (error) {
                        console.error(`Error en createRadarChart: ${error}`);
                    }
                }
            }
        }
        if (Secciones === 'Seccion7') {
            for (let Grafica in Values[Secciones]) {
                ArrayGrafica[Secciones][Grafica] = {};
                for (let Tendencia in Values[Secciones][Grafica]) {
                    let Graf_11 = await createVerticalGradientChart(Values[Secciones][Grafica][Tendencia]);
                    ArrayGrafica[Secciones][Grafica][Tendencia] = Graf_11;
                }
            }
        }
        if (Secciones === 'Seccion8') {
            for (let Grafica in Values[Secciones]) {
                ArrayGrafica[Secciones][Grafica] = {};
                for (let SoftSkills in Values[Secciones][Grafica]) {
                    let Graf_12 = await createHorizontalRulerChart(Values[Secciones][Grafica][SoftSkills]);
                    ArrayGrafica[Secciones][Grafica][SoftSkills] = Graf_12;
                }
            }
        }
        if (Secciones === 'Seccion9') {
            for (let Grafica in Values[Secciones]) {
                ArrayGrafica[Secciones][Grafica] = {};
                if (Grafica === 'Fortalezas') {
                    let i = 0;
                    for (let Fortaleza in Values[Secciones][Grafica]) {
                        let Graf_13 = await createVerticalGradientChart(Values[Secciones][Grafica][Fortaleza]);
                        ArrayGrafica[Secciones][Grafica][i] = Graf_13;
                        i++;
                    }
                }
                if (Grafica === 'Mejoras') {
                    let i = 2;
                    for (let Mejoras in Values[Secciones][Grafica]) {
                        let Graf_13 = await createVerticalGradientChart(Values[Secciones][Grafica][Mejoras]);
                        ArrayGrafica[Secciones][Grafica][i] = Graf_13;
                        i--;
                    }
                }
            }
        }
    }
    return ArrayGrafica;
}


async function GuardaImagenesAjax(menu_opcion, submenu_opcion, id_encuesta, JsonDatosGrafica) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "../common/save_graficas_encuestas.php",
            data: {
                op: menu_opcion,
                sub: submenu_opcion,
                id: id_encuesta,
                graficas: JsonDatosGrafica
            },
            success: function(response) {
                var arr_aux = response.split("|");
                if (arr_aux[0] == 1) {
                    showDialog(arr_aux[1], 1);
                }else if (arr_aux[0] == 2) {
                    showDialog(arr_aux[1], 2);
                    flag_echar = true;
                }else {
                    resolve(true);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.error('Error en la petición AJAX anidada:', textStatus, errorThrown);
                reject(false);
            }
        });
    });
}