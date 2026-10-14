function insertarReloj(){
    if (document.getElementById("contendor_reloj_index") && document.getElementById("contendor_reloj_index2")) {
        var spacing = 10,
        //contains values for hours, minutes, seconds
        times,times2,
        //text elements
        elements = {
            H: document.getElementById("H"),
            M: document.getElementById("M"),
            S: document.getElementById("S")
        },
        elements2 = {
            H_2: document.getElementById("H_2"),
            M_2: document.getElementById("M_2"),
            S_2: document.getElementById("S_2")
        }

    //set text colors
    Object.keys(elements).forEach((k, i) =>{
    switch (i) {
        case 0:
            elements[k].style.color = "#412DB6";
            break;
        case 1:
            elements[k].style.color = "	#412DB699";
            break;
        case 2:
            elements[k].style.color = "#412DB666";
            break;
        default:
            break;
    }
    });

    //set text colors
    Object.keys(elements2).forEach((k, i) =>{
        switch (i) {
            case 0:
                elements2[k].style.color = "#2D3748CC";
                break;
            case 1:
                elements2[k].style.color = "#2D3748CC";
                break;
            case 2:
                elements2[k].style.color = "#2D3748CC";
                break;
            default:
                break;
        }
        });

    //update time values and text once per second
    function updateTime(diferencia = 0) {
        var time = new Date();
        if(diferencia === 0){
            times = {
                H: time.getHours(),
                M: time.getMinutes(),
                S: time.getSeconds()
            };

            //update text
            Object.keys(times).forEach(k =>
                elements[k].innerHTML =
                //pad with 0s if needed
                String(times[k]).length > 1 ?
                times[k] :
                times[k] = "0" + times[k]
            );

            times2 = {
                H_2: time.getHours(),
                M_2: time.getMinutes(),
                S_2: time.getSeconds()
            };

            //update text
            Object.keys(times2).forEach(k =>
                elements2[k].innerHTML =
                //pad with 0s if needed
                String(times2[k]).length > 1 ?
                times2[k] :
                times2[k] = "0" + times2[k]
            );

            setTimeout(updateTime, 1000);
        }else{
            var diferenciaHoraria = diferencia;
            time.setHours(time.getHours() + diferenciaHoraria);
            // Obtiene las partes de la fecha y hora
            var hora = time.getHours();
            var minutos = time.getMinutes();
            var segundos = time.getSeconds();
            times = {
                H: hora,
                M: minutos,
                S: segundos
            };
            times2 = {
                H_2: hora,
                M_2: minutos,
                S_2: segundos
            };

            //update text
            Object.keys(times).forEach(k =>
                elements[k].innerHTML =
                //pad with 0s if needed
                String(times[k]).length > 1 ?
                times[k] :
                times[k] = "0" + times[k]
            );

            //update text
            Object.keys(times2).forEach(k =>
                elements2[k].innerHTML =
                //pad with 0s if needed
                String(times2[k]).length > 1 ?
                times2[k] :
                times2[k] = "0" + times2[k]
            );
        }
    }
    //start
    updateTime();
    }
}

  