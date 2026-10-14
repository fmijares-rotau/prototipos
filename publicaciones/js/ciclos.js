//Variable de timeOut para el cuadrante de simulación
let timeOutSimulacion = null

//Función que valida los datos ingresados en el formulario de ciclos
function validaFormularioCiclos(){
    const data = {}
    let errores = '';

    data.nombre = document.getElementById("nombre").value;
    if (data.nombre.length <= 0){
        errores += '- Debe darle un nombre al ciclo<br/>';
    }

    const selectorHorario = document.getElementById("horarios_id");
    data.horarios_id = selectorHorario.options[selectorHorario.selectedIndex].value;
    if (data.horarios_id == -1){
        errores += '- Debe seleccionar un horario<br/>';
    }

    data.dias_ciclo = document.getElementById("dias_ciclo").value;
    if (data.dias_ciclo <= 0){
        errores += '- Debe colocar los días del ciclo<br/>';
    }

    const selectorDia = document.getElementById("primer_dia");
    data.primer_dia = selectorDia.options[selectorDia.selectedIndex].value;
    if (data.primer_dia == -1){
        errores += '- Debe seleccionar un primer día<br/>';
    }

    data.empleados_ciclo = document.getElementById("empleados_ciclo").value;
    if(data.empleados_ciclo <= 0){
        errores += '- Debe colocar la cantidad de empleados del ciclo<br/>';
    }

    if(document.getElementById('armar_ciclos').style.display !== 'none'){
        data.cuadrante = {}
        const tablaCuadrante = document.getElementById('tablaCuadrante')
        const filas = tablaCuadrante.rows
        for(let i = 0; i < filas.length - 1; i++){
            const celdas = filas[i+1].cells
            
            data.cuadrante[i] = {}
            for(let j = 0; j < celdas.length; j++){
                if(j === 0){
                    indiceDia = celdas[j].getAttribute('data-dia')
                    data.cuadrante[i]['indiceDia'] = indiceDia
                }else{
                    //Sacar la cantidad seleccionada en el selector de empleados
                    const selectorEmpleados = [...celdas[j].childNodes].find(element => element.nodeName === 'SELECT')
                    if(selectorEmpleados){
                        data.cuadrante[i][celdas[j].getAttribute('data-turno')] = selectorEmpleados.options[selectorEmpleados.selectedIndex].value;
                    }
                }
            }
        }
    }

    if (errores.length > 0){
        throw new Error(errores);
    } else {
        return data;
    }
}

//Función que crea el cuadrante de acuerdo a los datos ingresados en el formulario de ciclos
function crearCuadrante(menu_id, elemento_id){
    //Limpiar el timeout de la simulación
    clearTimeout(timeOutSimulacion)

    timeOutSimulacion = setTimeout(async function(){
        //Limpiar los datos del cuadrante actual
        const cuadranteCiclo = document.getElementById("armar_ciclos");
        if(cuadranteCiclo){
            cuadranteCiclo.innerHTML = "";
            cuadranteCiclo.style.display = "none";
        }
        
        try{
            const dataCiclo = validaFormularioCiclos()
            
            dataCiclo.op = menu_id
            dataCiclo.sub = elemento_id

            const resp = await fetch(
                '../common/crea_ciclos.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify(dataCiclo)
                })

            if(resp.ok){
                const respJson = await resp.json()
                if(respJson.code === 200){
                    //Actualizar elementos del formulario
                    actualizaFormularioCiclos(menu_id, elemento_id, respJson.cuadrante)
                }else throw new Error(respJson.message)
            }else throw new Error('Hubo un problema con el servicio, intentelo más tarde')
        }catch(error){
            showDialog(error.message);
        }
    }, 1000)
}

//Función que actualiza los elementos del formulario de ciclos
function actualizaFormularioCiclos(menu_id, elemento_id, cuadrante){
    //Mostrar cuadrante
    const tablaCuadrante = document.getElementById('armar_ciclos')
    tablaCuadrante.innerHTML = cuadrante
    tablaCuadrante.style.display = 'block'

    //Ocultar botón de crear cuadrante
    const btnCrearCuadrante = document.getElementById('boton_continuar')
    btnCrearCuadrante.style.display = 'none'

    //Mostrar botón de guardar cuadrante
    const btnGuardarCuadrante = document.getElementById('boton_guardar')
    btnGuardarCuadrante.style.display = 'block'

    //Poner la función crearCuadrante como evento de los elementos del formulario
    const selectorHorario = document.getElementById("horarios_id")
    selectorHorario.onchange = function(){crearCuadrante(menu_id, elemento_id)}

    const inputDiasCiclo = document.getElementById("dias_ciclo")
    inputDiasCiclo.onchange = function(){crearCuadrante(menu_id, elemento_id)}
    inputDiasCiclo.onkeyup = function(){crearCuadrante(menu_id, elemento_id)}

    const selectorDia = document.getElementById("primer_dia")
    selectorDia.onchange = function(){crearCuadrante(menu_id, elemento_id)}

    const inputEmpleadosCiclo = document.getElementById("empleados_ciclo")
    inputEmpleadosCiclo.onkeyup = function(){crearCuadrante(menu_id, elemento_id)}
    inputEmpleadosCiclo.onchange = function(){crearCuadrante(menu_id, elemento_id)}
}

//Función que guarda el ciclo
async function guardaCiclo(menu_id, elemento_id, idCiclo){
    try{
        const dataCiclo = validaFormularioCiclos()
        
        dataCiclo.op = menu_id
        dataCiclo.sub = elemento_id
        if(idCiclo) dataCiclo.ciclo_id = idCiclo

        const resp = await fetch(
            '../common/grabar_ciclo.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                body: JSON.stringify(dataCiclo)
            })

        if(resp.ok){
            const respJson = await resp.json()
            if(respJson.code === 200){
                showDialog(respJson.message)
                irAContenido(menu_activo,menu_id,elemento_id)
            }else throw new Error(respJson.message)
        }else throw new Error('Hubo un problema con el servicio, intentelo más tarde')
    }catch(error){
        showDialog(error.message);
    }
}

//Función que recarga el selector de ciclos según el id de centro o empresa
async function reloadCiclos(selector, idMenu, idSubmenu){
    //Limpiar el selector de ciclos
    const ciclosSelector = document.getElementById("id_ciclo");

    if(!ciclosSelector) return

    ciclosSelector.options.length = 1;

    //Limpiar el cuadrante de simulación, si estamos en turnos y si existe
    const simulacionTurno = document.getElementById("simulacion");
    if(simulacionTurno){
        simulacionTurno.innerHTML = "";
        simulacionTurno.style.display = "none";
    }

    //El selector puede ser de id_centros o id_empresas
    const selectedKey = selector.id
    const selectedValue = selector.options[selector.selectedIndex].value
    
    const data = {
        'idMenu': idMenu,
        'idSubmenu': idSubmenu,
        [selectedKey]: selectedValue
    }

    try{
        const response = await fetch('../common/recargaCiclos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error(response.statusText)
        }

        const result = await response.json()
        if(result.code !== 200){
            throw new Error(result.message)
        }

        //Poner en el selector las opciones de ciclos
        Object.keys(result.ciclos).forEach(key => {
            ciclosSelector.options[ciclosSelector.options.length] = new Option(result.ciclos[key], key)
        });
    }catch(error){
        showDialog(error.message);
    }
}