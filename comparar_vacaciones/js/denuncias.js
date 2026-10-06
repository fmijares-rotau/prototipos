/**
 * 
 * Funcion para guardar las obervaciones de denuncias anonimas
 *
 */ 
function guardaDenunciasAnonimas(menu_opcion,submenu_opcion,formulario){
    $('body').click(function(e){
        e.preventDefault();
        e.stopImmediatePropagation(); //charles ma is right about that, but stopPropagation isn't also needed
    });
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id_denuncia',$('#id_denuncia').val());
    formData.append('observacion_rrhh', $('#observacion_rrhh').val());
    if (document.getElementById('estado').checked) {
        formData.append('estado', "Cerrada");
    } else {
        formData.append('estado', "Abierta");        
    }
    if($('#observacion_empl').val() != ''){
        formData.append('observacion_empl', $('#observacion_empl').val());
    }
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        var url = "";
        var ajax = objetoAjax();
        url = "../common/save_observaciones_denuncias_anonimas.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200){
                    esperaRespuesta(false);
                    hideDialogDenuncia();
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
                    showDialog("La pagina no existe");
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
    
    
        }else{
        showDialog("No es una opción válida");
    }
}
/**
 *  Funcción para cerrar una denuncia anonima.
 */

function cerrarDenunciaAnonima(menu_opcion,submenu_opcion, id_denuncia){

    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id_denuncia', id_denuncia);
    formData.append('estado', "Cerrada");
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        var url = "";
        var ajax = objetoAjax();
        url = "../common/save_observaciones_denuncias_anonimas.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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
                    showDialog("La pagina no existe");
                }else if(ajax.status != 0){
                    showDialog("Error:" + ajax.status);
                }
            }
        };
        ajax.send(formData);
        esperaRespuesta(true);
    
    
        }else{
        showDialog("No es una opción válida");
    }
}

/**
 * Funcion que recarga la lista de asunto
 *
 */
function reloadSubTopic(selectBox){
    if(selectBox != null){
        
        var topicId = selectBox.options[selectBox.selectedIndex].text;
        var asuntoSelect = document.getElementById("subject");
        var texto = asuntoSelect.options[0].text;
        asuntoSelect.options.length = 0;
        asuntoSelect.options[0] = new Option(texto,"");
        if(topicId != ""){
            var url = "";
            var ajax = objetoAjax();;
            url = "../common/recarga_asuntos.php?topicId=" + topicId;
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
                            }else{
                                var arr_asuntos = jsonData.asuntos.split(";");
                                for (var ind = 0; ind <= (arr_asuntos.length - 1); ind++){
                                    asuntoSelect.options[asuntoSelect.options.length]=new Option(arr_asuntos[ind], arr_asuntos[ind]);
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
 * 
 * Funcion para guardar las obervaciones de denuncias anonimas
 *
 */ 
function agregarAdministrador(menu_opcion,submenu_opcion){
    if(!isNaN(menu_opcion) && menu_opcion > 0 && menu_opcion <= maxMenu && !isNaN(submenu_opcion)){
        var formulario = document.getElementById("nuevo_elemento");
        var longitudFormulario = formulario.elements.length;
        var formData = new FormData();
        formData.append('op', menu_opcion);
        formData.append('sub', submenu_opcion);
        for (var i=0; i <= (longitudFormulario - 1);i++) {
            if(formulario.elements[i].required == true && formulario.elements[i].value == ""){
                showDialog(mensaje_faltan_campos);
                formulario.elements[i].classList.add("requerido");
                return false;
            }else if((formulario.elements[i].name == "password" || formulario.elements[i].name == "repassword") && formulario.elements[i].value !=""){
                formData.append(formulario.elements[i].name, formulario.elements[i].value);                
            }
            if(formulario.elements[i].type != 'file' && formulario.elements[i].value != ''){
                if(formulario.elements[i].type == "checkbox"){
                    if(formulario.elements[i].checked == true){
                        formData.append(formulario.elements[i].name, 'Cerrada');
                    } else {
                        formData.append(formulario.elements[i].name, 'Abierta');
                    }
                }else{
                    formData.append(formulario.elements[i].name, formulario.elements[i].value);
                }
            }else if(formulario.elements[i].value != ''){
                var files = formulario.elements[i].files;
                formData.append(formulario.elements[i].name, files[0], files[0].name);
            }
        }

        var url = "";
        var ajax = objetoAjax();;
        url = "../common/save_administrador_denuncias_anonimas.php";
        ajax.open("POST", url, true);
        //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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
 * 
 * Funciones para mostrar mensajes de validacion de contraseña y verificar contraseñas
 *
 */ 
function focusPass(){
    var divPass = document.getElementById('errores_contra');
    var divRePass = document.getElementById('errores_recontra');

    divRePass.classList.add("hidden");
    divPass.classList.remove("hidden");

}

function blurPass(){
    var divPass = document.getElementById('errores_contra');

    divPass.classList.add("hidden");

}
function focusRePass(){
    var divRePass = document.getElementById('errores_recontra');
    var divPass = document.getElementById('errores_contra');

    divPass.classList.add("hidden");
    divRePass.classList.remove("hidden");

}

function blurRePass(){
    var divRePass = document.getElementById('errores_recontra');

    divRePass.classList.add("hidden");

}

function verificaPassword(input,menu_opcion,submenu_opcion){
    var strPassword = input.value;
    document.getElementById("repassword").value='';
    document.getElementById("ind_repassword").innerHTML = '';
    document.getElementById("guardar").classList.remove('boton');
    document.getElementById("guardar").classList.add('boton_disable');

    let validaciones = 0;
    //validar longitud contraseña
    if ( strPassword.length >= 8 ) {
        validaciones ++;
        document.getElementById("length").classList.remove("invalid_password");
        document.getElementById("length").classList.add("valid_password");
    }else{
        document.getElementById("length").classList.remove("valid_password");
        document.getElementById("length").classList.add("invalid_password");
    }
    //validar letra
    if ( strPassword.match(/[A-z]/) ) {
        validaciones ++;
        document.getElementById("letter").classList.remove("invalid_password");
        document.getElementById("letter").classList.add("valid_password");
    }else{
        document.getElementById("letter").classList.remove("valid_password");
        document.getElementById("letter").classList.add("invalid_password");
    }
    //validar letra mayúscula
    if ( strPassword.match(/[A-Z]/) ) {
        validaciones ++;
        document.getElementById("capital").classList.remove("invalid_password");
        document.getElementById("capital").classList.add("valid_password");
    }else{
        document.getElementById("capital").classList.remove("valid_password");
        document.getElementById("capital").classList.add("invalid_password");
    }
    //validar numero
    if ( strPassword.match(/\d/) ) {
        validaciones ++;
        document.getElementById("number").classList.remove("invalid_password");
        document.getElementById("number").classList.add("valid_password");
    }else{
        document.getElementById("number").classList.remove("valid_password");
        document.getElementById("number").classList.add("invalid_password");
    }

    if ( strPassword.match(/[^a-zA-Z\d]/))  {
        validaciones ++;
        document.getElementById("special").classList.remove("invalid_password");
        document.getElementById("special").classList.add("valid_password");
    }else{
        document.getElementById("special").classList.remove("valid_password");
        document.getElementById("special").classList.add("invalid_password");
    }



    if(validaciones < 5){
        //document.getElementById("ind_password").innerHTML = 5 - validaciones;
        document.getElementById("ind_password").innerHTML = '&#x2718;';
        document.getElementById("ind_password").style.color = "red";
    } else {
        document.getElementById("ind_password").innerHTML = '&#10003;';
        document.getElementById("ind_password").style.color = "green";
    }
}

function verificaRepassword(input,menu_opcion,submenu_opcion){
    const repassword = input.value;
    const password = document.getElementById("password").value;    
    document.getElementById("guardar").classList.remove('boton');
    document.getElementById("guardar").classList.add('boton_disable');
        //validar longitud contraseña
        if ( repassword.length >= 8 ) {
            document.getElementById("relength").classList.remove("invalid_password");
            document.getElementById("relength").classList.add("valid_password");
        }else{
            document.getElementById("relength").classList.remove("valid_password");
            document.getElementById("relength").classList.add("invalid_password");
        }
        //validar letra
        if ( repassword.match(/[A-z]/) ) {
            document.getElementById("reletter").classList.remove("invalid_password");
            document.getElementById("reletter").classList.add("valid_password");
        }else{
            document.getElementById("reletter").classList.remove("valid_password");
            document.getElementById("reletter").classList.add("invalid_password");
        }
        //validar letra mayúscula
        if ( repassword.match(/[A-Z]/) ) {
            document.getElementById("recapital").classList.remove("invalid_password");
            document.getElementById("recapital").classList.add("valid_password");
        }else{
            document.getElementById("recapital").classList.remove("valid_password");
            document.getElementById("recapital").classList.add("invalid_password");
        }
        //validar numero
        if ( repassword.match(/\d/) ) {
            document.getElementById("renumber").classList.remove("invalid_password");
            document.getElementById("renumber").classList.add("valid_password");
        }else{
            document.getElementById("renumber").classList.remove("valid_password");
            document.getElementById("renumber").classList.add("invalid_password");
        }
    
        if ( repassword.match(/[^a-zA-Z\d]/))  {
            document.getElementById("respecial").classList.remove("invalid_password");
            document.getElementById("respecial").classList.add("valid_password");
        }else{
            document.getElementById("respecial").classList.remove("valid_password");
            document.getElementById("respecial").classList.add("invalid_password");
        }
    if(repassword != password){
        document.getElementById("ind_repassword").innerHTML = '&#x2718;';
        document.getElementById("ind_repassword").style.color = "red";
    } else {
        document.getElementById("ind_repassword").innerHTML = '&#10003;';
        document.getElementById("ind_repassword").style.color = "green";
        document.getElementById("guardar").setAttribute('onclick','javascript:agregarAdministrador('+menu_opcion+','+submenu_opcion+');');
        document.getElementById("guardar").classList.remove('boton_disable');
        document.getElementById("guardar").classList.add('boton');
    }
}

/**
 * Funcion muestra un dialogo
 *
 */
function showDialogDenuncia(contenido,titulo){
    var caja = document.getElementById('openModalDenuncias');
    if(caja != null){
        hideDialogDenuncia();
        caja.appendChild(genContenidoDialogoDenuncia(contenido,titulo));
        caja.style.opacity = 1;
        caja.style.pointerEvents = "auto";
         // Get the elements that closes the modal
         var modalCloser = $(".closes");

         // When the user clicks on the close element, close the modal
         modalCloser.click(function() {
            caja.hide();
         });
    }
}

/**
 * Funcion que genera el contenido en HTML de un dialogo
 *
 */
function genContenidoDialogoDenuncia(texto,titulo){
    var divElement = document.createElement('div');
    var anchorElement = document.createElement('a');
    anchorElement.innerHTML = 'X';
    anchorElement.title = 'Close';
    anchorElement.className = 'close';
    anchorElement.onclick = function(){
        hideDialogDenuncia();
        if(flag_echar == true){
            window.location = "../inc/salir.php";
            flag_echar= false;
        }else if(flag_recarga == true){
            window.location.reload();
            flag_recarga= false;
        }
    };
    var h2Element = document.createElement('h2');
    if(titulo != null && titulo != ""){
        h2Element.innerHTML = titulo;
    }else{
        h2Element.innerHTML = aviso;
    }
    var pElement = document.createElement('p');
    pElement.innerHTML = texto;
    divElement.appendChild(anchorElement);
    divElement.appendChild(h2Element);
    divElement.appendChild(pElement);
    return divElement;
}

/**
 * Funcion que oculta un dialogo
 *
 */
function hideDialogDenuncia(){
    var caja = document.getElementById('openModalDenuncias');
    if(caja != null){
        caja.innerHTML = '';
        caja.style.opacity = 0;
        caja.style.pointerEvents = "none";
    }
}

/**
  * Realizado por: Mauro Molina
  * Fecha: 08/08/2023 
  * Objetivo: Función para enviar mensaje y recurar todo los mensajes actualizado.
  * 
  */
function enviarMensajeAnonimas(menu_opcion,submenu_opcion,id_denuncias){
    $('body').click(function(e){
        e.preventDefault();
        e.stopImmediatePropagation(); //charles ma is right about that, but stopPropagation isn't also needed
    });
    var mensaje = document.getElementById("observacion_empl").value
    var textarea = document.getElementById("observacion_empl")
    if(mensaje == ""){
        textarea.focus();
        return false;
    }
    const scroll=document.querySelector("#modal_denuncia");
    var formData = new FormData();
    formData.append('id_denuncias', id_denuncias);
    formData.append('menu_opcion', menu_opcion);
    formData.append('submenu_opcion', submenu_opcion);
    formData.append('mensaje', mensaje);
   
    var url = "";
    var ajax = objetoAjax();;
    url = "../common/save_mensajes_denuncias.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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
                        let denuncia = JSON.parse(arr_aux[1]);
                        console.log(denuncia); 
                        texto =``;
                        $(".denu_mens").remove();
                        denuncia.forEach(function(mensaje, index){
                            adjunto = '';
                            if(mensaje.ubicacion != null){
                                adjunto = `<a href="${mensaje.ubicacion}" target="_blank">Ver</a>`;
                            }
                            fecha = formaFecha(mensaje.fecha);
                            texto +=`<tr class=denu_mens><td style=width:15%;> ${fecha} </td><td  style=width:25%;> ${mensaje.razon} </td><td style=width:45%> ${mensaje.texto} </td><td style=width:15%>${adjunto}</td></tr>`;
                        });
                        $('#mensajes').append(texto);                       
                        document.getElementById("observacion_empl").value="";
                        scroll.scrollTop=scroll.scrollHeight;
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

//Create a function that copy text to #url_denuncia
function copyToClipboard(elemento){
    var url = document.getElementById(elemento);
    url_value = url.innerHTML; 
    //var boton = document.getElementById("copy_button");
    navigator.clipboard.writeText(url_value);
    //give a message when copy to clipboard for 3 seconds
    var mensaje = document.getElementById("denuncias_mensaje");
    mensaje.style.visibility = "visible";
    setTimeout(function() {
        // Cerrar el mensaje
        mensaje.style.visibility = "hidden";
        }, 2000);
}

function MostrarModalDenuncia(){
    var toggle_denuncia = document.getElementById("toggle_denuncia");
    var modal_denuncia = document.getElementsByClassName("modal_denuncia")[0];
    var toggle_close_modal = document.getElementById("toggle_close_modal_denuncias");
    var close_modal = document.getElementsByClassName("close_modal_denuncias")[0];

    if(toggle_denuncia.checked == true){
        modal_denuncia.style.display = "block";
        modal_denuncia.style.transform = "translateY(10%)";  
        close_modal.style.display = "block";
    }else{
        modal_denuncia.style.display = "none";
        modal_denuncia.style.transform = "translateY(0%)";
        close_modal.style.display = "none";
        toggle_close_modal.checked = false;
    }
}

function CerrarModalDenuncia(){
    var toggle_denuncia = document.getElementById("toggle_denuncia");
    var modal_denuncia = document.getElementsByClassName("modal_denuncia")[0];
    var toggle_close_modal = document.getElementById("toggle_close_modal_denuncias");
    var close_modal = document.getElementsByClassName("close_modal_denuncias")[0];

    if(toggle_close_modal.checked == true){
        modal_denuncia.style.display = "none";
        modal_denuncia.style.transform = "translateY(0%)";
        toggle_close_modal.checked = false;
        close_modal.style.display = "none";
        toggle_denuncia.checked = false;
    }
}

function closeButtonDenuncia(){
    var button_denuncia = document.getElementsByClassName("button_denuncia")[0];
    var toggle_denuncia = document.getElementById("toggle_denuncia");
    var toggle_close_button_denuncia = document.getElementById("toggle_close_button_denuncia");
    var container_main_denuncia = document.getElementsByClassName("container_main_denuncia")[0];
    if(toggle_close_button_denuncia.checked == true){
        container_main_denuncia.style.visibility = "hidden";
    }
}

function formaFecha(fecha) {
    fformat = '';
    if(fecha != ''){
        fullfecha = new Date(fecha); 
                                fformat = [fullfecha.getDate().padLeft(),
                                    (fullfecha.getMonth()+1).padLeft(),
                                    fullfecha.getFullYear()].join('-') +' ' +
                                   [fullfecha.getHours().padLeft(),
                                    fullfecha.getMinutes().padLeft(),
                                    fullfecha.getSeconds().padLeft()].join(':');
    }
    return fformat;
}


/* var modal_denuncia = document.getElementsByClassName("modal_denuncia")[0];
document.addEventListener('click', function(e){
    // Obtener el elemento clickeado
    var target = e.target;
    // Verificar si el elemento clickeado es el modal o no
    if (target != modal_denuncia) {
        // Esconder el modal
        modal_denuncia.style.opacity = 0;
    }
    }); */
