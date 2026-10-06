
/**
 * Funcion que muestra una grafica de barra del tiempo Activo e Inactivo de Aplicaciones
 * 
 */
function verGraficasChart_(actividad,inactividad){

    var a= actividad.split(' ');
    var i= inactividad.split(' ');
    var ctx = document.getElementById("canvasbar");
    var data = {
            labels: ["L", "M", "M" , "J" , "V", "S", "D" ],
            datasets: [{
                label: 'Minutos de Actividad',
                data: [ a[0], a[1], a[2], a[3], a[4], a[5], a[6]],
                backgroundColor: "#5889d6",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }, {
                label: 'Minutos de Inactividad',
                data: [ i[0], i[1], i[2], i[3], i[4], i[5], i[6]],
                backgroundColor: " #b3b3ff",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }]
            };
    
    var options = {
            legend: { 
                labels: {
                    fontSize: 18,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    
                    
                }]
            }
        };
    
    var canvas = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    window.pie = new Chart(data,data);
}

function verGraficasChart(actividad,inactividad){
    $("#divTest").addClass('btn btn-primary');
    var a= actividad.split(' ');
    var i= inactividad.split(' ');
    var ctx = document.getElementById("canvasbar");
    const data = {
        labels: ["L", "M", "Mi" , "J" , "V", "S", "D" ],
        datasets: [
            {
                label: 'Actividad',
                data: [ a[0], a[1], a[2], a[3], a[4], a[5], a[6]],
                backgroundColor: "#3598AF",
                borderRadius: 5
            },{
                label: 'Inactividad',
                data: [ i[0], i[1], i[2], i[3], i[4], i[5], i[6]],
                backgroundColor: "#1a2941",
                borderRadius: 5
            }
        ]
      };
      const options = {
        scales: {
          x: {
            grid: {
              drawBorder: false,
              display: false
            },
          },
          y: {
            grid: {
              drawBorder: false,
            },
          },
        },
        plugins: {
            legend:{
                position:'bottom'
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        switch(context[0]['label']) {
                            case 'L':
                              return 'Lunes';
                            case 'M':
                              return 'Martes';
                            case 'Mi':
                              return 'Miércoles';
                            case 'J':
                              return 'Jueves';
                            case 'V':
                              return 'Viernes';
                            case 'S':
                              return 'Sábado';
                            case 'D':
                              return 'Domingo';
                            default:
                              return 'S/N';
                          }
                    }
                }
            }
        }
      };
      const myChart = new Chart4(ctx, {
        type: 'bar',
        data: data,
        options: options,
      });
}

/**
 * Funcion que muestra una doughnut de productividad
 * 
 */

function doughnutChart_(valores){
    var v= valores.split(' ');
    var ctx = document.getElementById("chart-area");
    var data = {
            labels: ["Productivo: "+v[0]+"M", "No Productivo: "+v[1]+"M", "Neutral: "+v[2]+"M"],
            datasets: [{
                label: 'Tiempo de Actividad en minutos',
                // data: [ v[0], v[1], v[2]],
                data: [ 300, 200, 100],
                backgroundColor: [ "#5889d6","#ffff00","#33cc33"],
                }]
            };
    var options = {
            responsive: true,
                legend: {
                    position: 'top',
                    fontSize: 20,
                },
                title: {
                    display: true,
                    text: 'Tiempo de Actividad en minutos',
                    fontSize: 18,
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            };
    var chart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
        
    window.pie = new Chart(data,data);        
}

function doughnutChart(valores){
    var v= valores.split(' ');
    var donutData = [
        {label: "Productivo", value: v[0]},
        {label: "No Productivo", value: v[1]},
        {label: "Neutral", value: v[2]}
    ];
    new Morris.Donut({
        element: 'chart-area',
        data: donutData,
        colors: ['#3bc0c3','#1a2942','#dcdcdc']
    });
}

/**
 * Funcion que muestra una grafica de barra del tiempo Activo e Inactivo de Aplicaciones de un empleado
 * 
 */
function GraficasPersonal(actividad,inactividad){

    var a= actividad.split(' ');
    var i= inactividad.split(' ');
    
    var ctx = document.getElementById("myBarChart");
    var data = {
            labels: ["L", "M", "M" , "J" , "V", "S", "D" ],
            datasets: [{
                label: 'Minutos de Actividad',
                data: [ a[0], a[1], a[2], a[3], a[4], a[5], a[6]],
                backgroundColor: "#5889d6",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }, {
                label: 'Minutos de Inactividad',
                data: [ i[0], i[1], i[2], i[3], i[4], i[5], i[6]],
                backgroundColor: " #b3b3ff",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }]
            };
    
    var options = {
            legend: { 
                labels: {
                    fontSize: 15,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };
    
    var chart= new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    window.pie = new Chart(data,data);
}

/**
 * Funcion que muestra una grafica de barra del tiempo Activo e Inactivo de Aplicaciones de un empleado
 * 
 */
function GraficasPersonal2(actividad,inactividad){

    var a= actividad.split(' ');
    var i= inactividad.split(' ');
    var ctx = document.getElementById("myBarChart2");
    var data = {
            labels: ["ENE", "FEB", "MAR" , "ABR" , "MAY", "JUN", "JUL", "AGO","SEP","OCT","NOV","DIC"],
            datasets: [{
                label: 'Actividad del Mes',
                data: [ a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12]],
                backgroundColor: "#5889d6",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }, {
                label: 'Inactividad del Mes',
                data: [ i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12]],
                backgroundColor: " #b3b3ff",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }]
            };
    
    var options = {
            legend: { 
                labels: {
                    fontSize: 15,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };
    
    var chart= new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    window.pie = new Chart(data,data);
}

/**
 * Funcion que muestra una barra horizontal  de actividad e inactividad por aplicaciones de un empleado
 * 
 */
function graficaApp(app,act,inact){
    
    var ap= app.split(' ');
    var a= act.split(' ');
    var i= inact.split(' ');
    var ctx = document.getElementById("myApp");
    var data = {
            labels: ap,
            datasets: [{
                label: 'Minutos de Actividad',
                data: a,
                backgroundColor: "#5889d6",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }, {
                label: 'Minutos de Inactividad',
                data: i,
                backgroundColor: " #b3b3ff",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }]
            };
    
    var options = {
            legend: { 
                labels: {
                    fontSize: 15,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontSize: 9,
                    }
                }],
                xAxes: [{
                    fontSize: 9,
                }]
            }
        };
    
    var chart= new Chart(ctx, {
            type: 'horizontalBar',
            data: data,
            options: options
        });
    window.myHorizontalBar = new Chart(data,data);
}

/**
 * Funcion que muestra una doughnut de productividad
 * 
 */
function graficaApp2_(app,act,cant){
    
    var ap= app.split(',');
    var a= act.split(',');
    
    //50 colores
    var colores=[
        "#7A1CE8",
        "#E7E81C",
        "#E84C0C",
        "#54E861",
        "#451DF2",
        "#F2DD1D",
        "#F22E0C",
        "#7CF257",
        "#46CFDB",
        "#2635DB",
        "#DBB625",
        "#DB0101",
        "#A4DB59",
        "#07E891",
        "#1D67F2",
        "#F2B21D",
        "#F20C7F",
        "#E8F257",
        "#07F2DA",
        "#1C98E8",
        "#E8961C",
        "#E80CE8",
        "#E8DC54",
        "#05B6DB",
        "#9956E8",
        "#E8B513",
        "#E8774A",
        "#4AE81E",
        "#E80C5C",
        "#765AF2",
        "#F2A713",
        "#F2644E",
        "#97F21F",
        "#850CF2",
        "#5C67DB",
        "#DB861C",
        "#DB5055",
        "#CDDB28",
        "#F20CD4",
        "#5A8FF2",
        "#F26D13",
        "#F24EA5",
        "#F2E21F",
        "#B100DC",
        "#56AFE8",
        "#E84A13",
        "#E54AE8",
        "#E8C41E",
        "#E8151B",
        "#85ADF2"];
    
    var colores_aux=new Array();
    var labels_aux=new Array();
    
    for (var i = 0; i < cant; i++) {
        colores_aux[i]=colores[i];
    }
    for (var j = 0; j < cant; j++) {
        labels_aux[j]=ap[j]+":"+a[j]+" %";
    }
    
    var ctx = document.getElementById("myApp2");
    var data = {
            labels: labels_aux,
            datasets: [{
                label: 'Minutos de Actividad',
                data: a,
                backgroundColor: colores_aux,
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }]
            };
    var options = {
            responsive: true,
                legend: {
                    position: 'top',
                    fontSize: 20,
                },
                title: {
                    display: true,
                    text: 'Tiempo de Actividad en Porcentaje',
                    fontSize: 18,
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                }
            };
    var chart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    
        
    window.pie = new Chart(data,data);        
}

function graficaApp2(app,act,cant){
    var ap= app.split(',');
    var a= act.split(',');
    //50 colores
    var colores=[
        "#7A1CE8",
        "#E7E81C",
        "#E84C0C",
        "#54E861",
        "#451DF2",
        "#F2DD1D",
        "#F22E0C",
        "#7CF257",
        "#46CFDB",
        "#2635DB",
        "#DBB625",
        "#DB0101",
        "#A4DB59",
        "#07E891",
        "#1D67F2",
        "#F2B21D",
        "#F20C7F",
        "#E8F257",
        "#07F2DA",
        "#1C98E8",
        "#E8961C",
        "#E80CE8",
        "#E8DC54",
        "#05B6DB",
        "#9956E8",
        "#E8B513",
        "#E8774A",
        "#4AE81E",
        "#E80C5C",
        "#765AF2",
        "#F2A713",
        "#F2644E",
        "#97F21F",
        "#850CF2",
        "#5C67DB",
        "#DB861C",
        "#DB5055",
        "#CDDB28",
        "#F20CD4",
        "#5A8FF2",
        "#F26D13",
        "#F24EA5",
        "#F2E21F",
        "#B100DC",
        "#56AFE8",
        "#E84A13",
        "#E54AE8",
        "#E8C41E",
        "#E8151B",
        "#85ADF2"];
    var colores_aux=new Array();
    var labels_aux=new Array();
    var donutData = new Array();
    for (var i = 0; i < cant; i++) {
        colores_aux[i]=colores[i];
    }
    for (var j = 0; j < cant; j++) {
        labels_aux[j]=ap[j]+":"+a[j]+" %";
    }
   
    a.forEach((elm,idx)=>{
        donutData.push({
            label: labels_aux[idx], 
            value: parseFloat(elm)
        });
    });
    new Morris.Donut({
        element: 'myApp2',
        data: donutData,
        colors: colores_aux
    });
}

/**
 * Funcion que muestra una doughnut de productividad
 * 
 */
function graficaAppMes(app,act,cant){
    
    var ap2= app.split(',');
    var a2= act.split(',');
    
    console.log(cant);
    
    //50 colores
    var colores=[
        "#7A1CE8",
        "#E7E81C",
        "#E84C0C",
        "#54E861",
        "#451DF2",
        "#F2DD1D",
        "#F22E0C",
        "#7CF257",
        "#46CFDB",
        "#2635DB",
        "#DBB625",
        "#DB0101",
        "#A4DB59",
        "#07E891",
        "#1D67F2",
        "#F2B21D",
        "#F20C7F",
        "#E8F257",
        "#07F2DA",
        "#1C98E8",
        "#E8961C",
        "#E80CE8",
        "#E8DC54",
        "#05B6DB",
        "#9956E8",
        "#E8B513",
        "#E8774A",
        "#4AE81E",
        "#E80C5C",
        "#765AF2",
        "#F2A713",
        "#F2644E",
        "#97F21F",
        "#850CF2",
        "#5C67DB",
        "#DB861C",
        "#DB5055",
        "#CDDB28",
        "#F20CD4",
        "#5A8FF2",
        "#F26D13",
        "#F24EA5",
        "#F2E21F",
        "#B100DC",
        "#56AFE8",
        "#E84A13",
        "#E54AE8",
        "#E8C41E",
        "#E8151B",
        "#85ADF2"];
    
    var colores_aux=new Array();
    var labels_aux=new Array();
    
    for (var i = 0; i < cant; i++) {
        colores_aux[i]=colores[i];
    }
    for (var j = 0; j < cant; j++) {
        labels_aux[j]=ap2[j]+":"+a2[j]+" %";
    }
    
    var ctx = document.getElementById("myAppMes");
    var data = {
            labels: labels_aux,
            datasets: [{
                label: 'Minutos de Actividad',
                data: a2,
                backgroundColor: colores_aux,
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }]
            };
    var options = {
            responsive: true,
                legend: {
                    position: 'top',
                    fontSize: 20,
                },
                title: {
                    display: true,
                    text: 'Tiempo de Actividad en Porcentaje',
                    fontSize: 18,
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                }
            };
    var chart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });        
    window.pie = new Chart(data,data);        
}


/**
 * Funcion que muestra una barra horizontal  de actividad e inactividad por web
 * 
 */
function graficaWeb_(web,actWeb,inactWeb){
    
    var web= web.split(' ');
    var a= actWeb.split(' ');
    var i= inactWeb.split(' ');
    var ctx = document.getElementById("myWeb");
    var data = {
            labels: web,
            datasets: [{
                label: 'Minutos de Actividad',
                data: a,
                backgroundColor: "#5889d6",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }, {
                label: 'Minutos de Inactividad',
                data: i,
                backgroundColor: " #b3b3ff",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }]
            };
    
    var options = {
            legend: { 
                labels: {
                    fontSize: 18,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontSize: 15,
                    }
                }],
                xAxes: [{
                    fontSize: 11,
                }]
            }
        };
    
    var chart= new Chart(ctx, {
            type: 'horizontalBar',
            data: data,
            options: options
        });
    window.myHorizontalBar = new Chart(data,data);
}

function graficaWeb(web,actWeb,inactWeb){
    console.log(web)
    var web= web.split(' ');
    var a= actWeb.split(' ');
    var i= inactWeb.split(' ');
    var ctx = document.getElementById("myWeb");

    const data = {
        labels: web,
        datasets: [{
                label: 'Minutos de Actividad',
                data: a,
                backgroundColor: "#5889d6",
                borderRadius: 10
            },{
                label: 'Minutos de Inactividad',
                data: i,
                backgroundColor: " #b3b3ff",
                borderRadius: 10
            }]
    };
    const options = {
        indexAxis: 'y',
        scales: {
          x: {
            min: 0,
          },
          y: {
            position: 'left',
            border: {
                dash: [1,2],
                display: true,
            }, 
          },
        },
        plugins:{
          legend:{
            position: 'top'
          }
        },
        responsive:'true',
      };
    const myChart = new Chart4(ctx, {
        type: 'bar',
        data: data,
        options: options,
    });
}

/**
 * Funcion que muestra una barra horizontal  de actividad e inactividad por aplicacion
 * 
 */
function graficaMostrarApp_(ap,actAp,inactAp){
    
    var app= ap.split(' ');
    var a= actAp.split(' ');
    var i= inactAp.split(' ');
    var ctx = document.getElementById("myAt");
    var data = {
            labels: app,
            datasets: [{
                label: 'Minutos de Actividad',
                data: a,
                backgroundColor: "#9966ff",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }, {
                label: 'Minutos de Inactividad',
                data: i,
                backgroundColor: "#ccb3ff",
                
                borderColor: "#ffffff",
                
                borderWidth: 2
                }]
            };
    
    var options = {
            legend: { 
                labels: {
                    fontSize: 18,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontSize: 15,
                    }
                }],
                xAxes: [{
                    fontSize: 11,
                }]
            }
        };
    
    var chart= new Chart(ctx, {
            type: 'horizontalBar',
            data: data,
            options: options
        });
    window.myHorizontalBar = new Chart(data,data);
}

function graficaMostrarApp(ap,actAp,inactAp){
    
    var app= ap.split(' ');
    var a= actAp.split(' ');
    var i= inactAp.split(' ');
    var ctx = document.getElementById("myAt");
    const data = {
        labels: app,
        datasets: [{
                label: 'Minutos de Actividad',
                data: a,
                backgroundColor: "#5889d6",
                borderRadius: 10
            },{
                label: 'Minutos de Inactividad',
                data: i,
                backgroundColor: " #b3b3ff",
                borderRadius: 10
            }]
    };
    const options = {
        indexAxis: 'y',
        scales: {
          x: {
            min: 0,
          },
          y: {
            position: 'left',
            border: {
                dash: [1,2],
                display: true,
            }, 
          },
        },
        plugins:{
          legend:{
            position: 'top'
          }
        },
        responsive:'true',
      };
    const myChart = new Chart4(ctx, {
        type: 'bar',
        data: data,
        options: options,
    });
}

/**
* Funcion que muestra una barra de seguimiento diario por horas de aplicaciones en un fecha especifica para solo empleados
* 
*/
function graficaDiaria(elemento){
     var data = []; 
     var app=elemento['aplicacion'].split(',');
     var registro=elemento['datos'].split(';');
     var punto;

     for (var linea =0; linea<registro.length; linea++) {
       punto=registro[linea].split(',');       
       var obj=new Object();
       obj.x=parseFloat(punto[0]);
       obj.x2=parseFloat(punto[1]);
       obj.y=parseFloat(punto[2]);
       data[linea]=obj;
     }
     var conjunto=JSON.stringify(data);

     Highcharts.chart('container2', {
        chart: {
          type: 'xrange'
        },
        title: {
          text: 'Seguimiento Diario'
        },
        accessibility: {
          point: {
            descriptionFormatter: function (point) {
              var ix = point.index + 1,
                category = point.yCategory,
                from = new Date(point.x),
                to = new Date(point.x2);
              return ix + '. ' + category + ', ' + from.toDateString() +
                ' to ' + to.toDateString() + '.';
            }
          }
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          title: {
            text: ''
          },
          categories: app,
          reversed: true,
          borderWidth:0
        },
        series: [{
            name:  elemento['fecha'],
            showInLegend: false,
            pointWidth: 10,
            data: eval(conjunto),
            dataLabels: {
              enabled: true
            }
        }]
      
      });
    
}
    
/**
  * Funcion que muestra una barra de linea de seguimiento bolsa del empleado por Meses del Año
  * 
  */
  function graficaBolsa(bolsa,bolsafecha){
    var a= bolsa.split(' ');
    if(bolsafecha!=0){
        var b= bolsafecha.split(' ');
    }else{
        var b= a;
    }
    console.log(b);
    //alert(a);
    var color = Chart.helpers.color;
    var ctx = document.getElementById("canvas");
    var data = {
        labels: b,
        datasets: [{
            label: 'Historial bolsa en minutos',
            borderColor: window.chartColors.blue,
            backgroundColor: window.chartColors.blue,
            fill: false,
            data: a,
        }
        ]
    };
    var options ={
    responsive: true,
                hoverMode: 'index',
            stacked: false,
            /*title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis'
            },*/
            /*scales: {
                y: {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                },
                
            }*/
    }
    var chart= new Chart(ctx, {
    type: 'line',
        data: data,
        options: options
    });
    window.myline = new Chart(data,data);
}

/**
  * Funcion que muestra una barra de linea de seguimiento bolsa del empleado por Meses del Año
  * 
  */
function graficaBolsaMes(bolsaMes){
    var a= bolsaMes.split(' ');
    //alert(a);
    var color = Chart.helpers.color;
    var ctx = document.getElementById("canvas3");
    var data = {
        labels: ["ENE", "FEB", "MAR" , "ABR" , "MAY", "JUN", "JUL", "AGO","SEP","OCT","NOV","DIC"],
        datasets: [{
            label: 'Historial bolsa en horas',
            borderColor: window.chartColors.blue,
            backgroundColor: window.chartColors.blue,
            fill: false,
            data: a,
        }
        ]
    };
    var options ={
    responsive: true,
                hoverMode: 'index',
                stacked: false,
                /*title: {
                    display: true,
                    text: 'Chart.js Line Chart - Multi Axis'
                },*/
                /*scales: {
                    y: {
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: 'left',
                    },
                    
                }*/
    }
    var chart= new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
    window.myline = new Chart(data,data);      
}
  
/**
  * Funcion que muestra una barra de linea de seguimiento bolsa pleno del empleado por Meses del Año
  * 
  */
function graficaBolsaPleno(bolsaPleno){
        var a= bolsaPleno.split(' ');
        //alert(a);
        var color = Chart.helpers.color;
        var ctx = document.getElementById("canvas2");
        var data = {
            labels: a,
            datasets: [{
                label: 'Historial bolsa OOPP en minutos',
                borderColor: window.chartColors.blue,
                backgroundColor: window.chartColors.blue,
                fill: false,
                data: a,
            }
            ]
        };
        var options ={
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            /*title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis'
            },*/
            /*scales: {
                y: {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                },
                
            }*/
        }
        var chart= new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
        window.myline = new Chart(data,data);
}

/**
  * Funcion encargada de mostrar el organigrama
  * 
  */

 function graficaOrganigrama(titulo,empresa,niveles,dataSeries,dataNodes,dataEtiquetas) {
	var altura = 0;
	if (niveles > 5) {
		altura = 120;
	}
	if (niveles <= 5) {
		altura = 140;
	}
	if (niveles <= 3) {
		altura = 160;
	}		
	dataSeries = JSON.parse(dataSeries);
	dataEtiquetas = JSON.parse(dataEtiquetas);
    
    Highcharts.AST.allowedReferences = [...Highcharts.AST.allowedReferences, 'data:image/jpeg;base64'];
    Highcharts.AST.allowedReferences = [...Highcharts.AST.allowedReferences, 'data:image/jpg;base64'];
    Highcharts.AST.allowedReferences = [...Highcharts.AST.allowedReferences, 'data:image/gif;base64'];
    Highcharts.AST.allowedReferences = [...Highcharts.AST.allowedReferences, 'data:image/svg;base64'];
    Highcharts.AST.allowedReferences = [...Highcharts.AST.allowedReferences, 'data:image/png;base64'];


	Highcharts.chart('container3', {
		lang: {
			viewFullscreen: dataEtiquetas[0],
			printChart: dataEtiquetas[1],
			downloadPDF: dataEtiquetas[2],    
			downloadPNG: dataEtiquetas[3],
			downloadJPEG: dataEtiquetas[4],
			downloadSVG: dataEtiquetas[5],
			contextButtonTitle: dataEtiquetas[6],
		},		
		chart: {
			height: altura*niveles,
			inverted: true
		},
		title: {
			text: titulo
		},
        tooltip: {
            enabled: false // Desactiva el tooltip
        },
		accessibility: {
			point: {
				descriptionFormatter: function (point) {
					var nodeName = point.toNode.name,
						nodeId = point.toNode.id,
						nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
						parentDesc = point.fromNode.id;
					return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
				}
			}
		},
		series: [{
			type: 'organization',
			name: empresa,
			keys: ['from', 'to'],
			data: dataSeries,
			nodes: dataNodes,
			colorByPoint: true,
			//color: '#5889d6',
			borderColor: 'white',
			padding: 8,
			nodeWidth: 85,
			linkLineWidth: 2
		}],
		credits: false,
		exporting: {
			allowHTML: true,
			sourceWidth: 800,
			sourceHeight: 600
		}
	});
}

/**
 * 
 *  Funcion para cargar graficas de informes de cursos
 * 
 */
function graficaMostrarSeccion(titulo,data,contendor) {
    // Create the chart
Highcharts.chart(contendor, {
    chart: {
      type: titulo.tipo
    },
    title: {
      text: titulo.titulo
    },
    subtitle: {
      text: titulo.subtitulo
    },
  
    accessibility: {
      announceNewData: {
        enabled: true
      },
      point: {
        valueSuffix: '%'
      }
    },
  
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%'
        }
      }
    },
  
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
  
    series: [
      {
        name: titulo.subtitulo,
        colorByPoint: true,
        data: data
      }
    ]
  });
}


/**
 * 
 *  Funcion para cargar graficas de Promedio y Notas Turegistroescolar
 * 
 */
function graficaTREMostrarPromedioNotas(titulo,datapromedio,datanotas,contendor) {
    // Create the chart
Highcharts.chart(contendor, {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: ``
                },
                subtitle: {
                    text: ``

                },
                xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
                }
            }
                },
                yAxis: {
                    title: {
                        text: 'Nota'
                    }
                },
                legend: {
                    enabled: true
                },
                plotOptions: {
                    line: {
                      dataLabels: {
                        enabled: false
                      }
                    }
                },
              credits: {
            text: ''
            },
                series: [{
                    type: 'line',
                    name: 'Nota',
                    color: '#ae0303',
                    data: datanotas,
          //pointStart: Date.UTC(2019, 8, 26),
          pointInterval: 24 * 3600 * 1000
                }, {
                    type: 'line',
                    name: 'Promedio',
                    color: '#031fae',
                    data: datapromedio,
          //pointStart: Date.UTC(2019, 8, 26),
          pointInterval: 24 * 3600 * 1000
                }]
  });
}

