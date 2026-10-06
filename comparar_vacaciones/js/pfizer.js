/**
 *  Funciones para pfizer
 */

/**
 * Variables globales
 */

function reloadProvinciasVenezuela(selectBox){
    if(selectBox != null){
        var pais_id = selectBox.options[selectBox.selectedIndex].value;
        var provinciasSelect = document.getElementById("id_provincias");
        var texto = provinciasSelect.options[0].text;
        provinciasSelect.options.length = 0;
        provinciasSelect.options[0] = new Option(texto,"");

        // Municipios Aqui
        var CodPais = selectBox.options[selectBox.selectedIndex].value;
        if(CodPais == paisVenezuela){
            document.getElementById("div_municipio").style.display = "block";
            const label = document.getElementById("label_municipio_vzla");
            label.innerHTML = "Municipio";
            var municipiosSelect = document.getElementById("municipio");
            var texto = municipiosSelect.options[0].text;
            municipiosSelect.options.length = 0;
            municipiosSelect.options[0] = new Option(texto,"");

            if(document.getElementById("poblacion") != null){
                poblacionesSelect = document.getElementById("poblacion");
                texto = poblacionesSelect.options[0].text;
                texto = texto.replace("Poblacion", "Municipio");
                poblacionesSelect.options.length = 0;
                poblacionesSelect.options[0] = new Option(texto,"");
            }
        }else{
            document.getElementById("div_municipio").style.display = "none";
            const label = document.getElementById("label_municipio_vzla");
            label.innerHTML = "Poblacion";
            if(document.getElementById("poblacion") != null){
                poblacionesSelect = document.getElementById("poblacion");
                texto = poblacionesSelect.options[0].text;
                texto = texto.replace("Municipio", "Poblacion");
                poblacionesSelect.options.length = 0;
                poblacionesSelect.options[0] = new Option(texto,"");
            }
        }
        if(document.getElementById("poblacion") != null){
            poblacionesSelect = document.getElementById("poblacion");
            texto = poblacionesSelect.options[0].text;
            poblacionesSelect.options.length = 0;
            poblacionesSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("id_codpostal") != null){
            codigosPostalesSelect = document.getElementById("id_codpostal");
            texto = codigosPostalesSelect.options[0].text;
            codigosPostalesSelect.options.length = 0;
            codigosPostalesSelect.options[0] = new Option(texto,"");
        }
        if(document.getElementById("id_licencias_conducir") != null){
            licenciasConducirSelect = document.getElementById("id_licencias_conducir");
            texto = licenciasConducirSelect.options[0].text;
            licenciasConducirSelect.options.length = 0;
            licenciasConducirSelect.options[0] = new Option(texto,"");
        }
        if(pais_id != ""){
            var url = "";
            var ajax = objetoAjax();;
            url = "../common/recarga_provincias.php?id=" + pais_id;
            ajax.open("GET", url, true);
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200){
                        esperaRespuesta(false);
                        var html_txt = ajax.responseText;
                        if(html_txt != ""){
                            var arr_aux = html_txt.split("|");
                            if(arr_aux[0] == 1){
                                //Do nothing
                            }else if(arr_aux[0] == 2){
                                showDialog(arr_aux[1]);
                                flag_echar = true;
                            }else if(arr_aux[0] == 3){
                                var arr_selects = arr_aux[1].split("#");
                                var arr_provincias = arr_selects[0].split(";");
                                var arr_licencias_conducir = arr_selects[1].split(";");
                                for (var ind = 0; ind <= (arr_provincias.length - 1); ind++){
                                    provinciasSelect.options[provinciasSelect.options.length]=new Option(arr_provincias[ind].split(",")[1], arr_provincias[ind].split(",")[0]);
                                }
                                if(document.getElementById("id_licencias_conducir") != null){
                                    for (var ind = 0; ind <= (arr_licencias_conducir.length - 1); ind++){
                                        licenciasConducirSelect.options[licenciasConducirSelect.options.length]=new Option(arr_licencias_conducir[ind].split(",")[1], arr_licencias_conducir[ind].split(",")[0]);
                                    }
                                }
                                var validate = document.getElementById("validate");
                                if(validate != null){
                                    validate.value = arr_selects[2];
                                }
                                if(arr_aux[2] !== null){
                                    diferencia_horaria = document.getElementById("diferencia_horaria");
                                    diferencia_horaria.value = arr_aux[2]; 
                                }
                            }else{
                                var arr_provincias = arr_aux[1].split(";");
                                for (var ind = 0; ind <= (arr_provincias.length - 1); ind++){
                                    provinciasSelect.options[provinciasSelect.options.length]=new Option(arr_provincias[ind].split(",")[1], arr_provincias[ind].split(",")[0]);
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
 * Funcion que recarga la lista de Provincias de Venezuela
 *
 */
function reloadProvinciasVenezuelaDirectorio(selectBox){
    if(selectBox != null){

        if(selectBox.name == "id_paises_trabajo"){
            var pais_id = selectBox.options[selectBox.selectedIndex].value;
            var provinciasSelect = document.getElementById("id_provincias_trabajo");
            var texto = provinciasSelect.options[0].text;
            provinciasSelect.options.length = 0;
            provinciasSelect.options[0] = new Option(texto,"");

            // Municipios Aqui
            var CodPais = selectBox.options[selectBox.selectedIndex].value;
            if(CodPais == paisVenezuela){
                document.getElementById("div_municipio_trabajo").style.display = "block";
                const label = document.getElementById("label_municipio_vzla_trabajo");
                label.innerHTML = "Municipio trabajo";
                var municipiosSelect = document.getElementById("municipio_trabajo");
                var texto = municipiosSelect.options[0].text;
                municipiosSelect.options.length = 0;
                municipiosSelect.options[0] = new Option(texto,"");

                if(document.getElementById("poblacion_trabajo") != null){
                    poblacionesSelect = document.getElementById("poblacion_trabajo");
                    texto = poblacionesSelect.options[0].text;
                    texto = texto.replace("Poblacion trabajo", "Municipio trabajo");
                    poblacionesSelect.options.length = 0;
                    poblacionesSelect.options[0] = new Option(texto,"");
                }
            }else{
                document.getElementById("div_municipio_trabajo").style.display = "none";
                const label = document.getElementById("label_municipio_vzla_trabajo");
                label.innerHTML = "Poblacion trabajo";
                if(document.getElementById("poblacion_trabajo") != null){
                    poblacionesSelect = document.getElementById("poblacion_trabajo");
                    texto = poblacionesSelect.options[0].text;
                    texto = texto.replace("Municipio Trabajo", "Poblacion Trabajo");
                    poblacionesSelect.options.length = 0;
                    poblacionesSelect.options[0] = new Option(texto,"");
                }
            }
            if(document.getElementById("poblacion_trabajo") != null){
                poblacionesSelect = document.getElementById("poblacion_trabajo");
                texto = poblacionesSelect.options[0].text;
                poblacionesSelect.options.length = 0;
                poblacionesSelect.options[0] = new Option(texto,"");
            }
            if(document.getElementById("id_codpostal_trabajo") != null){
                codigosPostalesSelect = document.getElementById("id_codpostal_trabajo");
                texto = codigosPostalesSelect.options[0].text;
                codigosPostalesSelect.options.length = 0;
                codigosPostalesSelect.options[0] = new Option(texto,"");
            }
        }

        if(selectBox.name == "id_paises_envio"){
            var pais_id = selectBox.options[selectBox.selectedIndex].value;
            var provinciasSelect = document.getElementById("id_provincias_envio");
            var texto = provinciasSelect.options[0].text;
            provinciasSelect.options.length = 0;
            provinciasSelect.options[0] = new Option(texto,"");

            // Municipios Aqui
            var CodPais = selectBox.options[selectBox.selectedIndex].value;
            if(CodPais == paisVenezuela){
                document.getElementById("div_municipio_envio").style.display = "block";
                const label = document.getElementById("label_municipio_vzla_envio");
                label.innerHTML = "Municipio envio";
                var municipiosSelect = document.getElementById("municipio_envio");
                var texto = municipiosSelect.options[0].text;
                municipiosSelect.options.length = 0;
                municipiosSelect.options[0] = new Option(texto,"");

                if(document.getElementById("poblacion_envio") != null){
                    poblacionesSelect = document.getElementById("poblacion_envio");
                    texto = poblacionesSelect.options[0].text;
                    texto = texto.replace("Poblacion envio", "Municipio envio");
                    poblacionesSelect.options.length = 0;
                    poblacionesSelect.options[0] = new Option(texto,"");
                }
            }else{
                document.getElementById("div_municipio_envio").style.display = "none";
                const label = document.getElementById("label_municipio_vzla_envio");
                label.innerHTML = "Poblacion envio";
                if(document.getElementById("poblacion_envio") != null){
                    poblacionesSelect = document.getElementById("poblacion_envio");
                    texto = poblacionesSelect.options[0].text;
                    texto = texto.replace("Municipio envio", "Poblacion envio");
                    poblacionesSelect.options.length = 0;
                    poblacionesSelect.options[0] = new Option(texto,"");
                }
            }
            if(document.getElementById("poblacion_envio") != null){
                poblacionesSelect = document.getElementById("poblacion_envio");
                texto = poblacionesSelect.options[0].text;
                poblacionesSelect.options.length = 0;
                poblacionesSelect.options[0] = new Option(texto,"");
            }
            if(document.getElementById("id_codpostal_envio") != null){
                codigosPostalesSelect = document.getElementById("id_codpostal_envio");
                texto = codigosPostalesSelect.options[0].text;
                codigosPostalesSelect.options.length = 0;
                codigosPostalesSelect.options[0] = new Option(texto,"");
            }
        }

        if(pais_id != ""){
            var url = "";
            var ajax = objetoAjax();;
            url = "../common/recarga_provincias.php?id=" + pais_id;
            ajax.open("GET", url, true);
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200){
                        esperaRespuesta(false);
                        var html_txt = ajax.responseText;
                        if(html_txt != ""){
                            var arr_aux = html_txt.split("|");
                            if(arr_aux[0] == 1){
                                //Do nothing
                            }else if(arr_aux[0] == 2){
                                showDialog(arr_aux[1]);
                                flag_echar = true;
                            }else if(arr_aux[0] == 3){
                                var arr_selects = arr_aux[1].split("#");
                                var arr_provincias = arr_selects[0].split(";");
                                var arr_licencias_conducir = arr_selects[1].split(";");
                                for (var ind = 0; ind <= (arr_provincias.length - 1); ind++){
                                    provinciasSelect.options[provinciasSelect.options.length]=new Option(arr_provincias[ind].split(",")[1], arr_provincias[ind].split(",")[0]);
                                }
                                var validate = document.getElementById("validate");
                                if(validate != null){
                                    validate.value = arr_selects[2];
                                }
                            }else{
                                var arr_provincias = arr_aux[1].split(";");
                                for (var ind = 0; ind <= (arr_provincias.length - 1); ind++){
                                    provinciasSelect.options[provinciasSelect.options.length]=new Option(arr_provincias[ind].split(",")[1], arr_provincias[ind].split(",")[0]);
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
