function generarCodigoQR() {

    const id_empresas = document.getElementById("id_empresas").value;
    const div = document.getElementById('qr-container');
    // Obtener el elemento div
    if(id_empresas == ""){
        showDialog(seleccionar_empresa);       
        return;
    }
    var formData = new FormData();
    formData.append('id_empresas', id_empresas);
    var url = "";
    var ajax = objetoAjax();
    url = "../common/get_numero_aleatorio_empresas.php";
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
                        // showDialog(arr_aux[1]);
                        // irAContenido(menu_activo,menu_opcion,submenu_opcion);
                        // Crear una instancia de QRious
                        var qr = new QRious({
                        // Establecer el tamaño del código QR
                        size: 200,
                        // Establecer el valor del código QR
                        value: arr_aux[1]
                        });        
                        // Añadir el elemento canvas del código QR al div
                        div.replaceChildren(qr.canvas);
                        document.getElementById("numero").readOnly = true;
                        document.getElementById("numero").value = arr_aux[1];
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

function activarCodigoQR(elem) {
    const tipo = elem.value; 
    const div = document.getElementById('qr-container');   
    if(tipo == tecnologia_tipo_codigo_qr){
        document.getElementById('btn_generar').classList.remove('ocultar'); 
        generarCodigoQR()       
    } else {        
        document.getElementById('btn_generar').classList.add('ocultar');
        document.getElementById("numero").readOnly = false;
        document.getElementById("numero").value = "";
        while(div.hasChildNodes()){
            div.removeChild(div.firstChild);	
        }
    }
}

function buscarSiCodigoQR(){

    const id_tarjetas =  $('#tarjetas').val();
    const div = document.getElementById('qr-container');
    // Obtener el elemento div
    
    var formData = new FormData();
    formData.append('id_tarjetas', id_tarjetas);
    var ajax = objetoAjax();
    url = "../common/get_codigo_qr_tarjetas.php";
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
                        // showDialog(arr_aux[1]);
                        // irAContenido(menu_activo,menu_opcion,submenu_opcion);
                        // Crear una instancia de QRious
                        jsonData = JSON.parse(arr_aux[1]);
                        document.getElementById('codigo_qr').classList.add('ocultar');
                        while(div.hasChildNodes()){
                            div.removeChild(div.firstChild);	
                        }
                        cqr = "";
                        for(let i = 0; i < jsonData.length; i++) {
                            tarjeta = jsonData[i];
                            if(tarjeta.tipo == tecnologia_tipo_codigo_qr){
                                document.getElementById('codigo_qr').classList.remove('ocultar');
                                var qr = new QRious({
                                // Establecer el tamaño del código QR
                                size: 200,
                                // Establecer el valor del código QR
                                value: tarjeta.numero
                                });        
                                // Añadir el elemento canvas del código QR al div
                                div.append(qr.canvas);
                                cqr = cqr + qr.toDataURL() + "#" 
                            }
                        }
                        $('#mail-qr').val(cqr);
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

function enviarCodigoQRSelecionados(id_tarjetas,id_empleado){
    
    var formData = new FormData();
    let tarjetas = id_tarjetas.split('#');
    cqr = "";
    for(let i = 0; i < tarjetas.length; i++) {
        tarjeta = tarjetas[i];        
        var qr = new QRious({
        // Establecer el tamaño del código QR
        size: 200,
        // Establecer el valor del código QR
        value: tarjeta
        });        
        // Añadir el elemento canvas del código QR al div
        cqr = cqr + qr.toDataURL() + "#" 
    }

    formData.append('id_tarjetas', cqr);
    formData.append('id_empleado', id_empleado);
    var ajax = objetoAjax();
    url = "../common/enviar_codigo_qr_tarjetas.php";
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
                        showDialog(arr_aux[1]);
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