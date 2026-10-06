 
 
 
    /**Funcion para agregar descendientes en tabla de form Modelo 145 */
    contador_desc=0;
    function CrearCampoDescendientes(){
        var htmlTags = '<tr id="fila'+contador_desc+'">'+
             '<input type="hidden" name="aux_desc['+contador_desc+']">'+
             '<td align="center"><input id="year_nacimiento_desc'+contador_desc+'" style="display:block;" type="text" name="year_nacimiento_desc[]" required></td>'+
             '<td align="center"><input id="year_adopcion'+contador_desc+'" style="display:block;" type="text" name="year_adopcion[]"></td>'+
             '<td align="center"><label class="container_radio mr-3 ml-[77px] mt-[7px]"><input type="radio" name="id_descendientes_discapacidad['+contador_desc+']" onclick="MostrarElementoMovilidadReducidaDesc(this, '+contador_desc+')" value="1" required/><span class="checkmark_radio"></span></label></td>'+
             '<td align="center"><label class="container_radio mr-3 ml-[56px] mt-[7px]"><input type="radio" name="id_descendientes_discapacidad['+contador_desc+']" onclick="MostrarElementoMovilidadReducidaDesc(this, '+contador_desc+')" value="2" required/><span class="checkmark_radio"></span></label></td>'+
             '<td align="center"><label class="switch mr-3"><input type="checkbox" style="visibility: hidden;" name="id_ayuda_movilidad_reducida_desc['+contador_desc+']" id="id_ayuda_movilidad_reducida_desc'+contador_desc+'"><span class="slider round"></span></label></td>'+
             '<td align="center"><label class="switch mr-3"><input type="checkbox" name="custodia_completa['+contador_desc+']"><span class="slider round"></span></label></td>'+
             '<td></td>'+
             '<td align="center"> <span class="tabla_accion" id="boton_tabla" onclick="javascript:confirmaborrafilaplanevalweb('+contador_desc+')" >Borrar</span> </td>'+
         '</tr>';
     $('#tablacuerpodesc').append(htmlTags);  
     contador_desc++;
    }

    /**Funcion para agregar descendientes en tabla de form Modelo 145 */
    //contador_desc=0;
    function CrearCampoDescendientesFill(contador_desc){
        var htmlTags = '<tr id="fila'+contador_desc+'">'+
             '<input type="hidden" name="aux_desc['+contador_desc+']">'+
             '<td align="center"><input id="year_nacimiento_desc'+contador_desc+'" style="display:block;" type="text" name="year_nacimiento_desc[]" required></td>'+
             '<td align="center"><input id="year_adopcion'+contador_desc+'" style="display:block;" type="text" name="year_adopcion[]"></td>'+
             '<td align="center"><label class="container_radio mr-3 ml-[77px] mt-[7px]"><input type="radio" name="id_descendientes_discapacidad['+contador_desc+']" onclick="MostrarElementoMovilidadReducidaDesc(this, '+contador_desc+')" value="1" required/><span class="checkmark_radio"></span></label></td>'+
             '<td align="center"><label class="container_radio mr-3 ml-[56px] mt-[7px]"><input type="radio" name="id_descendientes_discapacidad['+contador_desc+']" onclick="MostrarElementoMovilidadReducidaDesc(this, '+contador_desc+')" value="2" required/><span class="checkmark_radio"></span></label></td>'+
             '<td align="center"><label class="switch mr-3"><input type="checkbox" style="visibility: hidden;" name="id_ayuda_movilidad_reducida_desc['+contador_desc+']" id="id_ayuda_movilidad_reducida_desc'+contador_desc+'"><span class="slider round"></span></label></td>'+
             '<td align="center"><label class="switch mr-3"><input type="checkbox" name="custodia_completa['+contador_desc+']"><span class="slider round"></span></label></td>'+
             '<td></td>'+
             '<td align="center"> <span class="tabla_accion" id="boton_tabla" onclick="javascript:confirmaborrafilaplanevalweb('+contador_desc+')" >Borrar</span> </td>'+
         '</tr>';
         console.log(htmlTags);
     $('#tablacuerpodesc').append(htmlTags);  

     contador_desc++;
    }

    /**Funcion para agregar ascendientes en tabla de form Modelo 145 */
    contador_asc=0;   
    function CrearCampoAscendientes(){
        var htmlTags = '<tr id="fila'+contador_asc+'">'+
            '<input type="hidden" name="aux_asc['+contador_asc+']">'+
            '<td><input id="year_nacimiento_asc'+contador_asc+'" style="display:block;" type="text" name="year_nacimiento_asc[]" required></td>'+
            '<td align="center"><label class="container_radio mr-3 ml-[74px] mt-[7px]"><input type="radio" name="id_ascendientes_discapacidad['+contador_asc+']" onclick="MostrarElementoMovilidadReducidaAsc(this, '+contador_asc+')" value="1" required/><span class="checkmark_radio"></span></label></td>'+
            '<td align="center"><label class="container_radio mr-3 ml-[56px] mt-[7px]"><input type="radio" name="id_ascendientes_discapacidad['+contador_asc+']" onclick="MostrarElementoMovilidadReducidaAsc(this, '+contador_asc+')" value="2" required/><span class="checkmark_radio"></span></label></td>'+
            '<td align="center"><label class="switch mr-3"><input type="checkbox" style="visibility: hidden;" name="id_ayuda_movilidad_reducida_asc['+contador_asc+']" id="id_ayuda_movilidad_reducida_asc'+contador_asc+'"><span class="slider round"></span></label></td>'+
            '<td align="center"><input style="display:block; margin:auto;" id="convivencia_compartida'+contador_asc+'" type="text" name="convivencia_compartida['+contador_asc+']" ></td>'+
            '<td></td>'+
            '<td> <span class="tabla_accion" id="boton_tabla_asc" onclick="javascript:confirmaborrafilaplanevalweb('+contador_asc+')" >Borrar</span> </td>'+
        '</tr>';
        if(contador_asc < 2){
            $('#tablacuerpoasc').append(htmlTags); 
        }
        contador_asc++;        
    }

    /**Funcion para agregar ascendientes en tabla de form Modelo 145 */
    //contador_asc=0;   
    function CrearCampoAscendientesFill(contador_asc){
            var htmlTags = '<tr id="fila'+contador_asc+'">'+
                '<input type="hidden" name="aux_asc['+contador_asc+']">'+
                '<td><input id="year_nacimiento_asc'+contador_asc+'" style="display:block;" type="text" name="year_nacimiento_asc[]" required></td>'+
                '<td align="center"><label class="container_radio mr-3 ml-[74px] mt-[7px]"><input type="radio" name="id_ascendientes_discapacidad['+contador_asc+']" onclick="MostrarElementoMovilidadReducidaAsc(this, '+contador_asc+')" value="1" required/><span class="checkmark_radio"></span></label></td>'+
                '<td align="center"><label class="container_radio mr-3 ml-[56px] mt-[7px]"><input type="radio" name="id_ascendientes_discapacidad['+contador_asc+']" onclick="MostrarElementoMovilidadReducidaAsc(this, '+contador_asc+')" value="2" required/><span class="checkmark_radio"></span></label></td>'+
                '<td align="center"><label class="switch mr-3"<input type="checkbox" style="visibility: hidden;" name="id_ayuda_movilidad_reducida_asc['+contador_asc+']" id="id_ayuda_movilidad_reducida_asc'+contador_asc+'"><span class="slider round"></span></label></td>'+
                '<td align="center"><input style="display:block;" id="convivencia_compartida'+contador_asc+'" type="text" name="convivencia_compartida['+contador_asc+']" ></td>'+
                '<td></td>'+
                '<td> <span class="tabla_accion" id="boton_tabla_asc" onclick="javascript:confirmaborrafilaplanevalweb('+contador_asc+')" >Borrar</span> </td>'+
            '</tr>';
            if(contador_asc < 2){
                $('#tablacuerpoasc').append(htmlTags);  
            }
            contador_asc++;
            
    }

    function genContenidoTripleModelo145(texto,button_action1,button_action2,param1,param2,permiso_firma_empresa){
        var divElement = document.createElement('div');
        divElement.className = '!py-5';
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = 'X';
        anchorElement.title = 'Close';
        anchorElement.className = 'close';
        anchorElement.onclick = function(){
            hideDialog();
        };
        //divElement.appendChild(anchorElement);
        var okButton1 = document.createElement('a');
        okButton1.innerHTML = "SI";
        okButton1.title = "SI";
        //okButton.id = 'botonPrincipal';
        //okButton.textContent='SI';
        okButton1.className = '!text-[#2C2554] hover:!text-[#FFFFFF] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#2C2554] !bg-[#FFFFFF] border-2 border-solid border-[#2C2554] cursor-pointer buttonModal';
        okButton1.onclick = function(){
            hideDialog();
            button_action1("Seleccione el tipo de firma que desea",button_action2,param1,param2,permiso_firma_empresa);
        };
        var okButton2 = document.createElement('a');
        okButton2.innerHTML = "NO";
        okButton2.title = "NO";
        //okButton.id = 'botonPrincipal';
        okButton2.className = '!text-[#2C2554] hover:!text-[#FFFFFF] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#2C2554] !bg-[#FFFFFF] border-2 border-solid border-[#2C2554] cursor-pointer buttonModal';
        okButton2.onclick = function(){
            hideDialog();
            tipo_firma = 3;
            button_action2(param1,param2,tipo_firma);
        };
        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = cancela.toUpperCase();
        cancelButton.id = 'botonSecundario';
        //cancelButton.title = 'No';
        cancelButton.className = '!text-[#333333] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#FFFFFF] !bg-[#D9D9D9] cursor-pointer buttonModal';
        cancelButton.onclick = function(){
            hideDialog();
            paginasImpresion = 0;
        };
        var h2Element = document.createElement('h2');
        h2Element.innerHTML = aviso;
        var pElement = document.createElement('p');
        pElement.innerHTML = texto;
        pElement.className = 'text-center mb-5';
        var divIcon = document.createElement('div');
        divIcon.className = 'w-full flex justify-center text-[#F59E0B] text-[70px]';
        divIcon.innerHTML = '<i class="bx bx-error" ></i>';
        var divButtons = document.createElement('div');
        divButtons.className = 'w-full flex justify-around';
        divButtons.appendChild(okButton1);
        divButtons.appendChild(okButton2);
        divButtons.appendChild(cancelButton);
        divElement.appendChild(divIcon);
        divElement.appendChild(pElement);
        divElement.appendChild(divButtons);
        
        return divElement;
    }

    function genContenidoConfirmModelo145(texto,destiny,param1,param2,permiso_firma_empresa){

        var divElement = document.createElement('div');
        divElement.className = '!py-5';
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = 'X';
        anchorElement.title = 'Close';
        anchorElement.className = 'close';
        anchorElement.onclick = function(){
            hideDialog();
        };

        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = cancela.toUpperCase();
        cancelButton.id = 'botonSecundario';
        //cancelButton.title = 'No';
        cancelButton.className = '!text-[#333333] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#FFFFFF] !bg-[#D9D9D9] cursor-pointer buttonModal';
        cancelButton.onclick = function(){
            hideDialog();
            paginasImpresion = 0;
        };

        //divElement.appendChild(anchorElement);
        var okButton = document.createElement('a');
        okButton.innerHTML = aceptar.toUpperCase();
        okButton.id = 'botonPrincipal';
        //okButton.title = 'Ok';
        okButton.className = '!text-[#2C2554] hover:!text-[#FFFFFF] !text-sm !py-2.5 !px-5 !rounded-full  hover:!bg-[#2C2554] !bg-[#FFFFFF] border-2 border-solid border-[#2C2554] cursor-pointer buttonModal';
        okButton.onclick = function(){
            hideDialog();
            var indice = selectElement.selectedIndex;
            var valor = selectElement.options[indice].value;
            if(valor== 1){
                destiny(param1, param2, valor);
            }else if(valor == 2){
                showDialog("Opcion No Habilitada");
            }else{
                showDialog("Opcion No Valida");
            }
        };
        
        var selectElement = document.createElement('select');
        selectElement.id = 'selectImpresionModelo145';
        selectElement.name = 'selectImpresion';
        selectElement.className = 'w-full !border-[#D9D9D9] !border-2 !rounded-md !px-2 !py-2 !text-[#333333] !text-sm !font-semibold !focus:outline-none !focus:ring-2 !focus:ring-[#2C2554] !focus:border-transparent !mb-5';

        var optionElement = document.createElement('option');
        optionElement.value = 0;
        optionElement.innerHTML = 'Seleccione';
        selectElement.appendChild(optionElement);

        var optionElement = document.createElement('option');
        optionElement.value = 1;
        optionElement.innerHTML = '1.- Firma Electronica con Evidencias';
        selectElement.appendChild(optionElement);
    
        if(permiso_firma_empresa == 1){
            var optionElement = document.createElement('option');
            optionElement.value = 2;
            optionElement.innerHTML = '2.- Firma Electronica Avanzada';
            selectElement.appendChild(optionElement);
        }

        /* var optionElement = document.createElement('option');
        optionElement.value = 3;
        optionElement.innerHTML = '3.- Guardar sin firmar';
        selectElement.appendChild(optionElement); */

        var h2Element = document.createElement('h2');
        h2Element.innerHTML = aviso;
        var pElement = document.createElement('p');
        pElement.innerHTML = texto;
        pElement.className = 'text-center mb-5';
        var divIcon = document.createElement('div');
        divIcon.className = 'w-full flex justify-center text-[#F59E0B] text-[70px]';
        divIcon.innerHTML = '<i class="bx bx-error" ></i>';
        var divButtons = document.createElement('div');
        divButtons.className = 'w-full flex justify-around';
        divButtons.appendChild(okButton);
        divButtons.appendChild(cancelButton);
        divElement.appendChild(divIcon);
        divElement.appendChild(pElement);
        divElement.appendChild(selectElement);
        divElement.appendChild(divButtons);
        return divElement;
    }