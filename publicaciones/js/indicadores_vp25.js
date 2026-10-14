
/**
 * Pone los indicadores en sus elementos
 */
function activaIndicadores(){
    let url = "";
    let ajax = objetoAjax();
    url = "../common/indicadores.php";
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
                        const arrIndicadores = JSON.parse(arr_aux[1]);
                        const indSecciones = arrIndicadores.secciones;
                        const indElementos = arrIndicadores.elementos;
                        
                        document.querySelectorAll('[id^="sesi_"]').forEach(function (elem) {
                        	elem.classList.add('hidden');
                        });
                        document.querySelectorAll('[id^="elem_"]').forEach(function (elem) {
                        	elem.classList.add('hidden');
                        });

                        Object.entries(indSecciones).forEach(entry => {
                        	const [seccion, cantidad] = entry;
                        	let domSeccion = document.getElementById(`sesi_${seccion}`);
                        	// let TooltipSeccion = document.getElementById(`tooltip-sesi_${seccion}`);
                        	if(domSeccion != null){
                                domSeccion.classList.remove('hidden');
                        	}
                        });
                        
                        Object.entries(indElementos).forEach(entry => {
                        	const [elemento, cantidad] = entry;
                        	let domElemento = document.getElementById(`elem_${elemento}`);
                        	if(domElemento != null){
                                domElemento.classList.remove('hidden');
                        	}
                        });
                    }
                }else{
                    showDialog(noResults);
                }
            }else if(ajax.status==404){
                showDialog(error404);
            }else if(ajax.status==500){
                showDialog("Error code");
            }else if(ajax.status != 0){
                showDialog("Error:" + ajax.status);
            }
        }
    };
    ajax.send(null);
    esperaRespuesta(true);
 }

