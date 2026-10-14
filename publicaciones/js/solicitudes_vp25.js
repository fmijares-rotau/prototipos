/**
 * Funcion que muestra el formulario para justificar una ausencia que se redirija a solcitudes
 *
 */
function justificarSol(menu_opcion, submenu_opcion, fecha, idEmpleado, filtro) {
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('fecha', fecha);
    formData.append('id', idEmpleado);
    formData.append('filtro', filtro);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_new_justificante_sol.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if (html_txt != "") {
                    var arr_aux = html_txt.split("|");
                    if (arr_aux[0] == 1) {
                        showDialog(arr_aux[1]);
                    } else if (arr_aux[0] == 2) {
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    } else {
                        document.getElementById("content").innerHTML = arr_aux[1];
                    }
                } else {
                    showDialog(noResults);
                }
                inputsPersonalizadosForm();
            } else if (ajax.status == 404) {
                showDialog(error404);
            } else if (ajax.status != 0) {
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que muestra el formulario para generar una solicitud de horas justificar un retraso
 *
 */
function justificaRetraso(menu_opcion, submenu_opcion, idEmpleados, fechaFichaje, retraso) {
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id', idEmpleados);
    formData.append('ff', fechaFichaje);
    formData.append('re', retraso);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_new_justificante_retraso.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if (html_txt != "") {
                    var arr_aux = html_txt.split("|");
                    if (arr_aux[0] == 1) {
                        showDialog(arr_aux[1]);
                    } else if (arr_aux[0] == 2) {
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    } else {
                        document.getElementById("content").innerHTML = arr_aux[1];
                    }
                } else {
                    showDialog(noResults);
                }
                inputsPersonalizadosForm();
            } else if (ajax.status == 404) {
                showDialog(error404);
            } else if (ajax.status != 0) {
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que muestra datos del justificante
 *
 */
function verJustificante(menu_opcion, submenu_opcion, idJustificante, origen) {
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('id', idJustificante);
    formData.append('ori', origen);
    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_view_justificante.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if (html_txt != "") {
                    var arr_aux = html_txt.split("|");
                    if (arr_aux[0] == 1) {
                        showDialog(arr_aux[1]);
                    } else if (arr_aux[0] == 2) {
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    } else {
                        document.getElementById("content").innerHTML = arr_aux[1];
                    }
                } else {
                    showDialog(noResults);
                }
                inputsPersonalizadosForm();
            } else if (ajax.status == 404) {
                showDialog(error404);
            } else if (ajax.status != 0) {
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);
}

/**
 * Funcion que muestra el formulario para generar una solicitud de horas justificar un retraso
 *
 */
function cambiaFichaje(menu_opcion, submenu_opcion, idFichaje) {
    var formData = new FormData();
    formData.append('op', menu_opcion);
    formData.append('sub', submenu_opcion);
    formData.append('fi', idFichaje);

    var url = "";
    var ajax = objetoAjax();;
    url = "../common/gen_new_cambio_fichaje.php";
    ajax.open("POST", url, true);
    //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                esperaRespuesta(false);
                var html_txt = ajax.responseText;
                if (html_txt != "") {
                    var arr_aux = html_txt.split("|");
                    if (arr_aux[0] == 1) {
                        showDialog(arr_aux[1]);
                    } else if (arr_aux[0] == 2) {
                        showDialog(arr_aux[1]);
                        flag_echar = true;
                    } else {
                        setTimeout(function () {
                            $('.clockpicker').clockpicker();
                            redondearBordes();
                        }, 500);
                        document.getElementById("content").innerHTML = arr_aux[1];
                        $(function () {
                            $.datepicker.setDefaults($.datepicker.regional[idiomaNavegador]);
                            $("#fecha").datepicker({
                                firstDay: 1,
                                dateFormat: "dd-mm-yy"
                            });
                        });
                    }
                } else {
                    showDialog(noResults);
                }
                inputsPersonalizadosForm();
            } else if (ajax.status == 404) {
                showDialog(error404);
            } else if (ajax.status != 0) {
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(formData);
    esperaRespuesta(true);

}