//Función que valida los datos ingresados en el formulario de turnos
function validaFormularioTurnos(){
    const data = {}
    let errores = '';

    data.nombre = document.getElementById("nombre").value;
    if (data.nombre.length <= 0){
        errores += '- Debe darle un nombre al turno<br/>';
    }

    const selectorCiclo = document.getElementById("id_ciclo");
    data.id_ciclo = selectorCiclo.options[selectorCiclo.selectedIndex].value;
    if (data.id_ciclo == -1){
        errores += '- Debe seleccionar un ciclo<br/>';
    }

    data.fecha_inicial = document.getElementById("fecha_inicial").value;
    if (data.fecha_inicial.length <= 0){
        errores += '- Debe colocar la fecha inicial<br/>';
    }else{
        // Convertir la fecha inicial al formato YYYY-MM-DD
        const partesFecha = data.fecha_inicial.split('-');
        const fechaInicial = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
        // Obtener la fecha actual
        const fechaActual = new Date();
        // Comparar las fechas
        if (fechaInicial <= fechaActual) {
            errores += '- La fecha inicial no puede ser menor o igual a la fecha actual<br/>';
        }
    }
    
    data.fecha_final = document.getElementById("fecha_final").value;
    if (data.fecha_final.length <= 0){
        errores += '- Debe colocar la fecha final<br/>';
    }

    data.centro_id = document.getElementById("centro_id").value;
    if (!data.centro_id || data.centro_id.length <= 0){
        errores += '- Debe seleccionar un centro<br/>';
    }

    data.empleado_ids = document.getElementById("empleado_ids").value;
    if (!data.empleado_ids || data.empleado_ids.length <= 0){
        errores += '- Debe seleccionar los empleados para el turno<br/>';
    }

    if (errores.length > 0){
        throw new Error(errores);
    } else {
        return data;
    }
}

//Función que crea el turno de acuerdo a los datos ingresados en el formulario de turnos
async function crearTurno(menu_id, elemento_id, id_turno){
    try{
        const dataTurno = validaFormularioTurnos()
        
        dataTurno.op = menu_id
        dataTurno.sub = elemento_id
        if(id_turno) dataTurno.id_turno = id_turno

        const resp = await fetch(
            '../common/procesa_turnos.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                body: JSON.stringify(dataTurno)
            })

        if(resp.ok){
            const respJson = await resp.json()
            console.log(respJson)
            if(respJson.code === 200){
                //Actualizar elementos del formulario
                showDialog(respJson.message)
                irAContenido(menu_activo,menu_id,elemento_id)
            }else throw new Error(respJson.message)
        }else throw new Error('Hubo un problema con el servicio, intentelo más tarde')
    }catch(error){
        showDialog(error.message);
    }
}

//Función que valida los datos necesarios para crear un plan de trabajo
function validaFormularioAplicaTurno(){
    const data = {}
    let errores = '';

    idEmpleadosCheckboxes = document.getElementsByName("idEmpleado");
    if(!idEmpleadosCheckboxes || idEmpleadosCheckboxes.length <= 0){
        errores += '- Debe seleccionar al menos un empleado<br/>';
    }else{
        data.empleado_ids = []
        for(let i = 0; i < idEmpleadosCheckboxes.length; i++){
            if(idEmpleadosCheckboxes[i].checked){
                data.empleado_ids.push(idEmpleadosCheckboxes[i].value)
            }
        }
    }
    if(data.empleado_ids.length <= 0){
        errores += '- Debe seleccionar al menos un empleado<br/>';
    }

    if (errores.length > 0){
        throw new Error(errores);
    } else {
        return data;
    }
}

//Función que aplica el plan de trabajo a los empleados del turno
async function aplicaTurno(menu_id, elemento_id, id_turno){
    try{
        const dataTurno = validaFormularioAplicaTurno()
        dataTurno.op = menu_id
        dataTurno.sub = elemento_id
        if(id_turno) dataTurno.id_turno = id_turno

        const resp = await fetch(
            '../common/asignar_planes_turno.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                body: JSON.stringify(dataTurno)
            })

        if(resp.ok){
            const respJson = await resp.json()
            if(respJson.code === 200){
                //Actualizar elementos del formulario
                showDialog(respJson.message)
            }else throw new Error(respJson.message)
        }else throw new Error('Hubo un problema con el servicio, intentelo más tarde')
    }catch(error){
        showDialog(error.message);
    }
}
