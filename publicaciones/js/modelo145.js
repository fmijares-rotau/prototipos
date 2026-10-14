 
 
 
    /**Funcion para agregar descendientes en tabla de form Modelo 145 */
    contador_desc=0;
    function CrearCampoDescendientes(){
        var htmlTags = '<tr id="fila'+contador_desc+'">'+
             '<input type="hidden" name="aux_desc['+contador_desc+']">'+
             '<td align="center"><input id="year_nacimiento_desc'+contador_desc+'" style="display:block;" type="text" name="year_nacimiento_desc[]" required></td>'+
             '<td align="center"><input id="year_adopcion'+contador_desc+'" style="display:block;" type="text" name="year_adopcion[]"></td>'+
             '<td align="center"><input type="radio" name="id_descendientes_discapacidad['+contador_desc+']" onclick="MostrarElementoMovilidadReducidaDesc(this, '+contador_desc+')" value="1" required/></td>'+
             '<td align="center"><input type="radio" name="id_descendientes_discapacidad['+contador_desc+']" onclick="MostrarElementoMovilidadReducidaDesc(this, '+contador_desc+')" value="2" required/></td>'+
             '<td align="center"><input type="checkbox" style="visibility: hidden;" name="id_ayuda_movilidad_reducida_desc['+contador_desc+']" id="id_ayuda_movilidad_reducida_desc'+contador_desc+'"></input></td>'+
             '<td align="center"><input type="checkbox" name="custodia_completa['+contador_desc+']"></td>'+
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
             '<td align="center"><input type="radio" name="id_descendientes_discapacidad['+contador_desc+']" onclick="MostrarElementoMovilidadReducidaDesc(this, '+contador_desc+')" value="1" required/></td>'+
             '<td align="center"><input type="radio" name="id_descendientes_discapacidad['+contador_desc+']" onclick="MostrarElementoMovilidadReducidaDesc(this, '+contador_desc+')" value="2" required/></td>'+
             '<td align="center"><input type="checkbox" style="visibility: hidden;" name="id_ayuda_movilidad_reducida_desc['+contador_desc+']" id="id_ayuda_movilidad_reducida_desc'+contador_desc+'"></input></td>'+
             '<td align="center"><input type="checkbox" name="custodia_completa['+contador_desc+']"></td>'+
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
            '<td align="center"><input type="radio" name="id_ascendientes_discapacidad['+contador_asc+']" onclick="MostrarElementoMovilidadReducidaAsc(this, '+contador_asc+')" value="1" required/></td>'+
            '<td align="center"><input type="radio" name="id_ascendientes_discapacidad['+contador_asc+']" onclick="MostrarElementoMovilidadReducidaAsc(this, '+contador_asc+')" value="2" required/></td>'+
            '<td align="center"><input type="checkbox" style="visibility: hidden;" name="id_ayuda_movilidad_reducida_asc['+contador_asc+']" id="id_ayuda_movilidad_reducida_asc'+contador_asc+'"></input></td>'+
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
                '<td align="center"><input type="radio" name="id_ascendientes_discapacidad['+contador_asc+']" onclick="MostrarElementoMovilidadReducidaAsc(this, '+contador_asc+')" value="1" required/></td>'+
                '<td align="center"><input type="radio" name="id_ascendientes_discapacidad['+contador_asc+']" onclick="MostrarElementoMovilidadReducidaAsc(this, '+contador_asc+')" value="2" required/></td>'+
                '<td align="center"><input type="checkbox" style="visibility: hidden;" name="id_ayuda_movilidad_reducida_asc['+contador_asc+']" id="id_ayuda_movilidad_reducida_asc'+contador_asc+'"></input></td>'+
                '<td align="center"><input style="display:block;" id="convivencia_compartida'+contador_asc+'" type="text" name="convivencia_compartida['+contador_asc+']" ></td>'+
                '<td></td>'+
                '<td> <span class="tabla_accion" id="boton_tabla_asc" onclick="javascript:confirmaborrafilaplanevalweb('+contador_asc+')" >Borrar</span> </td>'+
            '</tr>';
            if(contador_asc < 2){
                $('#tablacuerpoasc').append(htmlTags);  
            }
            contador_asc++;
            
    }

    function preVisualizar(menu_opcion,submenu_opcion){
        if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
            var formData = new FormData();
            formData.append('op', menu_opcion);
            formData.append('sub', submenu_opcion);
    
            //Recogemos los datos del formulario
            var nif_empleado = document.getElementById("nif_empleado");
            if(nif_empleado != null){
                formData.append('nif_empleado',nif_empleado.value);
            }
            var name_empleado_modelo145 = document.getElementById("name_empleado_modelo145");
            if(name_empleado_modelo145 != null){
                formData.append('name_empleado_modelo145',name_empleado_modelo145.value);
            }
            var year_nacimiento_emp = document.getElementById('year_nacimiento_emp');
            if(year_nacimiento_emp != null){
                formData.append('year_nacimiento_emp',year_nacimiento_emp.value);
            }
            var poblacion_name = document.getElementById('poblacion_name');
            if(poblacion_name != null){
                formData.append('poblacion_name',poblacion_name.value);
            }
            var empresa_name = document.getElementById('empresa_name');
            if(empresa_name != null){
                formData.append('empresa_name', empresa_name.value);
            }
            var centro_name = document.getElementById('centro_name');
            if(centro_name != null){
                formData.append('centro_name', centro_name.value);
            }
            var name_responsable_empresa = document.getElementById('name_responsable_empresa');
            if(name_responsable_empresa != null){
                formData.append('name_responsable_empresa', name_responsable_empresa.value);
            }
            var radios = document.getElementsByName('id_situacion_familiar');
            for (var radio of radios){
                if (radio.checked) {
                    formData.append('id_situacion_familiar',radio.value);
                }
            }
            var documento_conyuge = document.getElementById('documento_conyuge');
            if(documento_conyuge != null){
                formData.append('documento_conyuge',documento_conyuge.value);
            }
    
            var radios = document.getElementsByName('id_discapacidad');
            for (var radio of radios){
                if (radio.checked) {
                    formData.append('id_discapacidad',radio.value);
                }
            }
    
            var checkboxes = document.getElementsByName('id_ayuda_movilidad_reducida');
            for (var checkbox of checkboxes)
            {
                if (checkbox.checked) {
                    formData.append('id_ayuda_movilidad_reducida',checkbox.value);
                }
            }
    
            var movilidad_geografica = document.getElementById('movilidad_geografica');
            if(movilidad_geografica != null){
                formData.append('movilidad_geografica',movilidad_geografica.value);
            }
    
            var checkboxes = document.getElementsByName('rendimientos_periodo_2year_5periodos');
            for (var checkbox of checkboxes)
            {
                if (checkbox.checked) {
                    formData.append('rendimientos_periodo_2year_5periodos',checkbox.value);
                }
            }
    
            var pension_conyuge = document.getElementById('pension_conyuge');
            if(pension_conyuge != null){
                formData.append('pension_conyuge',pension_conyuge.value);
            }
    
            var anualidad_alimentos = document.getElementById('anualidad_alimentos');
            if(anualidad_alimentos != null){
                formData.append('anualidad_alimentos',anualidad_alimentos.value);
            }
    
            var checkboxes = document.getElementsByName('deduccion_vivienda');
            for (var checkbox of checkboxes)
            {
                if (checkbox.checked) {
                    formData.append('deduccion_vivienda',checkbox.value);
                }
            }
    
            //Recogemos los datos de la pestaña descendientes
            var filas = document.getElementById('tablacuerpodesc');
            var numFilasDes = filas.children.length;
            
            for (let i = 0; i < numFilasDes; i++) {
                var nac_year_desc = document.getElementById('year_nacimiento_desc'+i);
                if(nac_year_desc != null){
                    formData.append('year_nacimiento_desc'+i,nac_year_desc.value);
                }
    
                var adoption_year = document.getElementById('year_adopcion'+i);
                if(adoption_year != null){
                    formData.append('year_adopcion'+i,adoption_year.value);
                }
    
                var radios_desc = document.getElementsByName('id_descendientes_discapacidad['+i+']');
                for (var radio of radios_desc){
                    if (radio.checked) {
                        formData.append('id_descendientes_discapacidad'+i,radio.value);
                    }
                }
    
                var checkboxes_desc1 = document.getElementsByName('id_ayuda_movilidad_reducida_desc['+i+']');
                for (var checkbox of checkboxes_desc1)
                {
                    if (checkbox.checked) {
                        formData.append('id_ayuda_movilidad_reducida_desc'+i,checkbox.value);
                    }
                }
    
                var checkboxes_desc2 = document.getElementsByName('custodia_completa['+i+']');
                for (var checkbox of checkboxes_desc2)
                {
                    if (checkbox.checked) {
                        formData.append('custodia_completa'+i,checkbox.value);
                    }
                }
                
            }
            formData.append('numFilasDes',numFilasDes);
            
            //Recogemos los datos de la pestaña ascendientes
            var filas = document.getElementById('tablacuerpoasc');
            var numFilasAsc = filas.children.length;
            
            for (let i = 0; i < numFilasAsc; i++) {
                var nac_year_asc = document.getElementById('year_nacimiento_asc'+i);
                if(nac_year_asc != null){
                    formData.append('year_nacimiento_asc'+i,nac_year_asc.value);
                }
    
                var nac_year_desc = document.getElementById('year_nacimiento_desc'+i);
                if(nac_year_desc != null){
                    formData.append('year_nacimiento_desc'+i,nac_year_desc.value);
                }
    
                var radios_asc = document.getElementsByName('id_ascendientes_discapacidad['+i+']');
                for (var radio of radios_asc){
                    if (radio.checked) {
                        formData.append('id_ascendientes_discapacidad'+i,radio.value);
                    }
                }
    
                var checkboxes_asc1 = document.getElementsByName('id_ayuda_movilidad_reducida_asc['+i+']');
                for (var checkbox of checkboxes_asc1)
                {
                    if (checkbox.checked) {
                        formData.append('id_ayuda_movilidad_reducida_asc'+i,checkbox.value);
                    }
                }
    
                var convivencia_compartida = document.getElementById('convivencia_compartida'+i);
                    if(convivencia_compartida != null){
                        formData.append('convivencia_compartida'+i,convivencia_compartida.value);
                    }
    
            }
            var url = "";
            var ajax = objetoAjax();
            url = "../common/procesaPreviewModelo145.php";
            ajax.open("POST", url, true);
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200){
                        esperaRespuesta(false);
                        window.open('../common/previewModelo145.php');
                    }else if(ajax.status==404){
                        showDialog(error404);
                    }else if(ajax.status != 0){
                        showDialog("Error:" + ajax.status);
                    }
                }
            };
            esperaRespuesta(true);
            ajax.send(formData);
        }else{
            showDialog(invalidOption);
        }
    }

    function guardaModelo145(menu_opcion,submenu_opcion, tipo_firma){
        if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
            var formulario = document.getElementById("nuevo_elemento");
            var longitudFormulario = formulario.elements.length;
            var formData = new FormData();
            formData.append('op', menu_opcion);
            formData.append('sub', submenu_opcion);
            var re = /^\w+$/;
            //var re2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
            var arrRadios = new Array();
            var arrCheckedRadios = new Array();
            for (var i=0; i <= (longitudFormulario - 1);i++) {
                if(formulario.elements[i].required == true && formulario.elements[i].value == ""){
                    showDialog(mensaje_faltan_campos);
                    formulario.elements[i].classList.add("requerido");
                    return false;
                }else if(formulario.elements[i].required == true && formulario.elements[i].type == "radio"){
                    if(arrRadios.indexOf(formulario.elements[i].name) < 0){
                        arrRadios.push(formulario.elements[i].name);
                        arrCheckedRadios.push(0);
                    }
                    if(formulario.elements[i].checked == true){
                        arrCheckedRadios[arrRadios.indexOf(formulario.elements[i].name)] = 1;
                    }
                }else if(formulario.elements[i].name == "name" && !re.test(formulario.elements[i].value)){
                    showDialog(formulario.elements[i].name + mensaje_error_caracteres);
                    return false;
                }
                /* if(formulario.elements[i].type != 'file'){
                    if(formulario.elements[i].type == "checkbox"){
                        if(formulario.elements[i].checked == true){
                            formData.append(formulario.elements[i].name, formulario.elements[i].value);
                        }
                    }else{
                        formData.append(formulario.elements[i].name, formulario.elements[i].value);
                    }
                }else if(formulario.elements[i].value != ''){
                    var files = formulario.elements[i].files;
                    formData.append(formulario.elements[i].name, files[0], files[0].name);
                } */
            }
            console.log(arrCheckedRadios);
            for (var i = 0;i < arrCheckedRadios.length;i++){
                if(arrCheckedRadios[i] == 0){
                    showDialog(mensaje_faltan_campos);
                    return false;
                }
            }

            //Recogemos los datos del formulario

            var id = document.getElementById("id");
            if(id != null){
                formData.append('id',id.value);
            }
            var nif_empleado = document.getElementById("nif_empleado");
            if(nif_empleado != null){
                formData.append('nif_empleado',nif_empleado.value);
            }
            var name_empleado_modelo145 = document.getElementById("name_empleado_modelo145");
            if(name_empleado_modelo145 != null){
                formData.append('name_empleado_modelo145',name_empleado_modelo145.value);
            }
            var year_nacimiento_emp = document.getElementById('year_nacimiento_emp');
            if(year_nacimiento_emp != null){
                formData.append('year_nacimiento_emp',year_nacimiento_emp.value);
            }
            var poblacion_name = document.getElementById('poblacion_name');
            if(poblacion_name != null){
                formData.append('poblacion_name',poblacion_name.value);
            }
            var empresa_name = document.getElementById('empresa_name');
            if(empresa_name != null){
                formData.append('empresa_name',empresa_name.value);
            }
            var centro_name = document.getElementById('centro_name');
            if(centro_name != null){
                formData.append('centro_name', centro_name.value);
            }
            var name_responsable_empresa = document.getElementById('name_responsable_empresa');
            if(name_responsable_empresa != null){
                formData.append('name_responsable_empresa', name_responsable_empresa.value);
            }
            var radios = document.getElementsByName('id_situacion_familiar');
            for (var radio of radios){
                if (radio.checked) {
                    formData.append('id_situacion_familiar',radio.value);
                }
            }
            var documento_conyuge = document.getElementById('documento_conyuge');
            if(documento_conyuge != null){
                formData.append('documento_conyuge',documento_conyuge.value);
            }
    
            var radios = document.getElementsByName('id_discapacidad');
            for (var radio of radios){
                if (radio.checked) {
                    formData.append('id_discapacidad',radio.value);
                }
            }
    
            var checkboxes = document.getElementsByName('id_ayuda_movilidad_reducida');
            for (var checkbox of checkboxes)
            {
                if (checkbox.checked) {
                    formData.append('id_ayuda_movilidad_reducida',checkbox.value);
                }
            }
    
            var movilidad_geografica = document.getElementById('movilidad_geografica');
            if(movilidad_geografica != null){
                formData.append('movilidad_geografica',movilidad_geografica.value);
            }
    
            var checkboxes = document.getElementsByName('rendimientos_periodo_2year_5periodos');
            for (var checkbox of checkboxes)
            {
                if (checkbox.checked) {
                    formData.append('rendimientos_periodo_2year_5periodos',checkbox.value);
                }
            }
    
            var pension_conyuge = document.getElementById('pension_conyuge');
            if(pension_conyuge != null){
                formData.append('pension_conyuge',pension_conyuge.value);
            }
    
            var anualidad_alimentos = document.getElementById('anualidad_alimentos');
            if(anualidad_alimentos != null){
                formData.append('anualidad_alimentos',anualidad_alimentos.value);
            }
    
            var checkboxes = document.getElementsByName('deduccion_vivienda');
            for (var checkbox of checkboxes)
            {
                if (checkbox.checked) {
                    formData.append('deduccion_vivienda',checkbox.value);
                }
            }

            //Recogemos los datos de la pestaña descendientes
            var filas = document.getElementById('tablacuerpodesc');
            if(filas){
                var numFilasDes = filas.children.length;
            }

            for (let i = 0; i < numFilasDes; i++) {
                var nac_year_desc = document.getElementById('year_nacimiento_desc'+i);
                if(nac_year_desc != null){
                    formData.append('year_nacimiento_desc'+i,nac_year_desc.value);
                }
    
                var adoption_year = document.getElementById('year_adopcion'+i);
                if(adoption_year != null){
                    formData.append('year_adopcion'+i,adoption_year.value);
                }

                var radios_desc = document.getElementsByName('id_descendientes_discapacidad['+i+']');
                for (var radio of radios_desc){
                    if(radio.checked) {
                        formData.append('id_descendientes_discapacidad'+i,radio.value);
                    }
                }
    
                var checkboxes_desc1 = document.getElementsByName('id_ayuda_movilidad_reducida_desc['+i+']');
                for (var checkbox of checkboxes_desc1)
                {
                    if (checkbox.checked) {
                        formData.append('id_ayuda_movilidad_reducida_desc'+i,checkbox.value);
                    }
                }
    
                var checkboxes_desc2 = document.getElementsByName('custodia_completa['+i+']');
                for (var checkbox of checkboxes_desc2)
                {
                    if (checkbox.checked) {
                        formData.append('custodia_completa'+i,checkbox.value);
                    }
                }
            }
            /* if($cont_desc_no_id_discapacidad > 0){
                showDialog("Debe seleccionar el grado de discapacidad del descendiente");
                return false;
            } */
            formData.append('numFilasDes',numFilasDes);
            
            //Recogemos los datos de la pestaña ascendientes
            var filas = document.getElementById('tablacuerpoasc');
            if (filas){
            var numFilasAsc = filas.children.length;
            }

            for (let i = 0; i < numFilasAsc; i++) {
                var nac_year_asc = document.getElementById('year_nacimiento_asc'+i);
                if(nac_year_asc != null){
                    formData.append('year_nacimiento_asc'+i,nac_year_asc.value);
                }
    
                var radios_asc = document.getElementsByName('id_ascendientes_discapacidad['+i+']');
                for (var radio of radios_asc){
                    if (radio.checked) {
                        formData.append('id_ascendientes_discapacidad'+i,radio.value);
                    }/* else if(nac_year_asc != null){
                        $cont_asc_no_id_discapacidad++;
                    } */
                }
    
                var checkboxes_asc1 = document.getElementsByName('id_ayuda_movilidad_reducida_asc['+i+']');
                for (var checkbox of checkboxes_asc1)
                {
                    if (checkbox.checked) {
                        formData.append('id_ayuda_movilidad_reducida_asc'+i,checkbox.value);
                    }
                }
    
                var convivencia_compartida = document.getElementById('convivencia_compartida'+i);
                if(convivencia_compartida != null){
                    formData.append('convivencia_compartida'+i,convivencia_compartida.value);
                }
            }

            var doc_firmado_empleado = document.getElementById("doc_firmado_empleado");

            if(doc_firmado_empleado != null){
                if(doc_firmado_empleado.files.length>0 && doc_firmado_empleado.files[0].name !=""){
                    formData.append(doc_firmado_empleado.name,doc_firmado_empleado.files[0]);
                }else{
                    formData.append(doc_firmado_empleado.name,null);
                }
            }

            var id_documento = document.getElementById('id_documento');
            if(id_documento != null){
                formData.append('id_documento',id_documento.value);
            }    
            
            //Solo paso la informacion en caso de que la firma sea de tipo 1 (firma con evidencias) o de tipo 3 (caso cuando de guardar sin firmar) . En caso de que sea de tipo 2 (firma con certificado) no paso nada
            //Hasta nuevo aviso, solo se firma con evidencias
            formData.append('numFilasAsc',numFilasAsc);
            if(tipo_firma == 1 || tipo_firma == 3){
                formData.append('id_tipo_firma_empleado', tipo_firma);
            }

            for (var entry of formData.entries()) {
                console.log(entry[0] + ": " + entry[1]); // nombre: Juan, edad: 25
            }

            var url = "";
            var ajax = objetoAjax();;
            url = "../common/save_elem.php";
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
                                console.log(arr_aux.length);
                                if(arr_aux[4]==1){
                                    showfirma(arr_aux[1],arr_aux[2],arr_aux[3]);
                                }else if(arr_aux[4]==2){
                                    showfirma(arr_aux[1],arr_aux[2],arr_aux[3]);
                                    //window.open('../common/firmadigital.php?id='+arr_aux[2]+'&n='+arr_aux[3]);
                                }else{
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
            ajax.send(formData);
            esperaRespuesta(true);
        }else{
            showDialog(invalidOption);
        }
    }

    function procesaFirmaEmpresaModelo145(menu_opcion, submenu_opcion, id_documento, id_empleado, tipo_firma, $id_modelo145, year){
        var url = "";
        var ajax = objetoAjax();
        url = "../common/procesaFirmaEmpresaModelo145.php?op="+menu_opcion+"&sub="+submenu_opcion+"&id_documento="+id_documento+"&id_empleado="+id_empleado+"&tipo_firma="+tipo_firma+"&id="+$id_modelo145+"&year="+year;
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    var html_txt = ajax.responseText;
                    if(html_txt != ""){
                        var arr_aux = html_txt.split("|");
                        console.log(arr_aux);
                        if(arr_aux[0] == 1){
                            var jsonData = JSON.parse(arr_aux[1]);
                            //window.open('../common/firmadigital.php?id='+jsonData[0]+'&n='+jsonData[1]);            
                            showDialog(arr_aux[1]);
                        }else if(arr_aux[0] == 2){
                            var jsonData = JSON.parse(arr_aux[1]);
                            showDialog(arr_aux[1]);
                            flag_echar = true;
                        }else{
                            var jsonData = JSON.parse(arr_aux[1]);
                            showfirma(jsonData[0],jsonData[1],jsonData[2]);
                            /* showDialog(arr_aux[1]);
                            irAContenido(menu_activo,menu_opcion,submenu_opcion); */
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
    }
    
    function showTripleModelo145(texto,accion1,accion2,param1,param2,permiso_firma_empresa){
        var caja = document.getElementById('openModal');
        if(caja != null){
            caja.appendChild(genContenidoTripleModelo145(texto,accion1,accion2,param1,param2,permiso_firma_empresa));
            caja.style.opacity = 1;
            caja.style.pointerEvents = "auto";
        }
    }

    function genContenidoTripleModelo145(texto,button_action1,button_action2,param1,param2,permiso_firma_empresa){
        var divElement = document.createElement('div');
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = 'X';
        anchorElement.title = 'Close';
        anchorElement.className = 'close';
        anchorElement.onclick = function(){
            hideDialog();
        };
        divElement.appendChild(anchorElement);
        var okButton1 = document.createElement('a');
        okButton1.innerHTML = "SI";
        okButton1.title = "SI";
        //okButton.textContent='SI';
        okButton1.className = 'button triple';
        okButton1.onclick = function(){
            hideDialog();
            button_action1("Seleccione el tipo de firma que desea",button_action2,param1,param2,permiso_firma_empresa);
        };
        var okButton2 = document.createElement('a');
        okButton2.innerHTML = "NO";
        okButton2.title = "NO";
        okButton2.className = 'button triple';
        okButton2.onclick = function(){
            hideDialog();
            tipo_firma = 3;
            button_action2(param1,param2,tipo_firma);
        };
        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = cancela.toUpperCase();
        cancelButton.title = 'No';
        cancelButton.className = 'button triple';
        cancelButton.onclick = function(){
            hideDialog();
            paginasImpresion = 0;
        };
        var h2Element = document.createElement('h2');
        h2Element.innerHTML = aviso;
        var pElement = document.createElement('p');
        pElement.innerHTML = texto;
        divElement.appendChild(h2Element);
        divElement.appendChild(pElement);
        divElement.appendChild(okButton1);
        divElement.appendChild(okButton2);
        divElement.appendChild(cancelButton);
        return divElement;
    }

    /* function genContenidoConfirmSiNoModelo145(texto,button_action,param1,param2,param3,param4,param5,param6,param7){
        var divElement = document.createElement('div');
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = 'X';
        anchorElement.title = 'Close';
        anchorElement.className = 'close';
        anchorElement.onclick = function(){
            hideDialog();
        };
        divElement.appendChild(anchorElement);
        var okButton = document.createElement('a');
        okButton.innerHTML = aceptar.toUpperCase();
        okButton.title = 'Ok';
        okButton.className = 'button';
        okButton.onclick = function(){
            hideDialog();
            button_action(param1,param2,param3,param4,param5,param6,param7);
        };
        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = cancela.toUpperCase();
        cancelButton.title = 'No';
        cancelButton.className = 'button';
        cancelButton.onclick = function(){
            hideDialog();
            paginasImpresion = 0;
        };
        var h2Element = document.createElement('h2');
        h2Element.innerHTML = aviso;
        var pElement = document.createElement('p');
        pElement.innerHTML = texto;
        divElement.appendChild(h2Element);
        divElement.appendChild(pElement);
        divElement.appendChild(okButton);
        divElement.appendChild(cancelButton);
        return divElement;
    } */

    function showConfirmModelo145(texto,accion,param1,param2,permiso_firma_empresa){
        var caja = document.getElementById('openModal');
        if(caja != null){
            caja.appendChild(genContenidoConfirmModelo145(texto,accion,param1,param2, permiso_firma_empresa));
            caja.style.opacity = 1;
            caja.style.pointerEvents = "auto";
        }
    }

    function genContenidoConfirmModelo145(texto,destiny,param1,param2,permiso_firma_empresa){

        var divElement = document.createElement('div');
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = 'X';
        anchorElement.title = 'Close';
        anchorElement.className = 'close';
        anchorElement.onclick = function(){
            hideDialog();
        };

        var cancelButton = document.createElement('a');
        cancelButton.innerHTML = cancela.toUpperCase();
        cancelButton.title = 'No';
        cancelButton.className = 'button';
        cancelButton.onclick = function(){
            hideDialog();
            paginasImpresion = 0;
        };

        divElement.appendChild(anchorElement);
        var okButton = document.createElement('a');
        okButton.innerHTML = aceptar.toUpperCase();
        okButton.title = 'Ok';
        okButton.className = 'button';
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
        divElement.appendChild(h2Element);
        divElement.appendChild(pElement);
        divElement.appendChild(selectElement);
        divElement.appendChild(okButton);
        divElement.appendChild(cancelButton);
        return divElement;
    }

    /* function procesaInputFileModelo145(texto, destino, param1, param2){
        // Obtener el elemento input file por su id
        var inputFile = document.getElementById("doc_firmado_empleado").value;
        // Obtener la extensión del archivo
        let extension = inputFile.substring(inputFile.lastIndexOf("."), inputFile.length);
        // Si la extensión obtenida no está incluida en la lista de valores
        if (!(document.getElementById("doc_firmado_empleado").getAttribute("accept").split(",").indexOf(extension)) < 0) {
            showDialog("Solo se permiten archivos pdf");
        }
        else{
            showConfirm(texto, destino, param1, param2);
        }
    } */

    /**
     * Funcion para mostrar/ocultar elemento div #nif_conyuge cuando se selecciona un radio button
     */

    function MostrarElementoNifConyuge(elemento) {
        if (elemento.value == "2") {
            document.getElementById("nif_conyuge").style.display = "flex";
        }else{
            document.getElementById("nif_conyuge").style.display = "none";
        }
    }

    function MostrarElementoMovilidadReducida(elemento) {
        if (elemento.value != "") {
            document.getElementById("id_ayuda_movilidad_reducida").style.visibility = "visible";
        }
    }

    function MostrarElementoMovilidadReducidaDesc(elemento, i) {
        if (elemento.value != "") {
            document.getElementById("id_ayuda_movilidad_reducida_desc"+i).style.visibility = "visible";
        }
    }

    function MostrarElementoMovilidadReducidaAsc(elemento, i) {
        if (elemento.value != "") {
            document.getElementById("id_ayuda_movilidad_reducida_asc"+i).style.visibility = "visible";
        }
    }