/**
 *  Funciones para la pagina www.instran.net
 */

/**
 * Variables globales
 */
var map;
var poly;
var markers = [];
var timer;
var intervalo_seg = 100;
var html_infowindow = '';
var html_infowindow_replace = '';
var direcciones = [];
var coordenadas_marker = [];
/**
 * Funcion que inicializa mapa de Google Maps
 * 
 */
function initializeGM(jsonText) {
    document.getElementById("map-canvas").onclick = "";
    //setTimeout(function(){}, 0);
    clearTimeout(timeOutMapa);
    var obj = JSON.parse(jsonText);
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(parseFloat(obj.latitud), parseFloat(obj.longitud)),
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }

    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    
    var contenidoCaja = '<div id="infoFichaje">';
    contenidoCaja += '<h1>' + obj.empleado + '</h1>';
    contenidoCaja += '<p style="text-transform: capitalize;">' + fecha + ': ' + obj.fecha + '</p>';
    contenidoCaja += '<p style="text-transform: capitalize;">' + hora + ': ' + obj.hora + '</p>';
    contenidoCaja += '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contenidoCaja
    });
    var posicion = new google.maps.LatLng(parseFloat(obj.latitud), parseFloat(obj.longitud));
    var marker = new google.maps.Marker({
        map: map,
        position: posicion,
        title: 'Empleado'
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
    infowindow.open(map,marker);
}

/**
 * Funcion que muestra un recorrido en Google Maps
 * 
 */
function showTracker(jsonText) {
    document.getElementById("map-canvas").onclick = "";
    //setTimeout(function(){}, 0);
    clearTimeout(timeOutMapa);
    var obj = JSON.parse(jsonText);
    var empleado = obj.empleado;
    var arrFechas = obj.fechas;
    var arrDispositivos = obj.dispositivos;
    var arrGPS = obj.gps;
    var arrInfo = obj.info;
    var centro = new Array("40.416933","-3.703519");
    
    if(arrGPS.length > 0){
        centro = arrGPS[0].split(",");
    }else{
        showDialog(mensaje_error_no_gps_precision);
    }
    
    
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(parseFloat(centro[0]), parseFloat(centro[1])),
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }

    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    
    poly = new google.maps.Polyline({
        strokeColor: '#736F6F',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    
    poly.setMap(map);
    var path =poly.getPath();
    var bounds = new google.maps.LatLngBounds();
    
    for(var i = 0; i < arrFechas.length;i++){
        
        //alert(arrInfo[i].acc);
        
        var contenidoCaja = '<div id="infoFichaje">';
        contenidoCaja += '<h1>' + empleado + '</h1>';
        contenidoCaja += '<p style="text-transform: capitalize;">' + arrFechas[i] + '</p>';
        contenidoCaja += '<p style="text-transform: capitalize;">' + (i + 1) + ' / ' + arrFechas.length + '</p>';
        contenidoCaja += '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contenidoCaja
        });
        var punto = arrGPS[i].split(",");
        var posicion= new google.maps.LatLng(parseFloat(punto[0]), parseFloat(punto[1]));
        path.push(posicion);
        
        var marker = new google.maps.Marker({
            map: map,
            position: posicion,
            title: 'Empleado ' + arrFechas[i],
            infowindow: infowindow
        });
        
        google.maps.event.addListener(marker, 'click', function () {
            // where I have added .html to the marker object.
            this.infowindow.open(map, this);
        });

        bounds.extend(marker.getPosition());
    }
    if(arrGPS.length > 0){
        map.fitBounds(bounds);
    }else{
        map.setZoom(7);
    }
}

/**
 * Funcion que muestra un recorrido en Google Maps
 * 
 */
function showLastGPS(jsonText) {
    
    var iconBase = '../images/iconmaps/';
    var marker;
    
    timer = setTimeout("$(\"#bot_act\").click();", (intervalo_seg * 1000));
    
    document.getElementById('intervalo').value = intervalo_seg;
    
    markers = [];
    
    document.getElementById("map-canvas").onclick = "";
    //setTimeout(function(){}, 0);
    clearTimeout(timeOutMapa);
    var obj = JSON.parse(jsonText);
    var arrEmpleados = obj.empleado;
    var arrFechas = obj.fechas;
    var arrDispositivos = obj.dispositivos;
    var arrGPS = obj.gps;
    
    //alert (JSON.stringify(obj, null, 4));
    
    var centro = arrGPS[0].split(",");
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(parseFloat(centro[0]), parseFloat(centro[1])),
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }

    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    
//    poly = new google.maps.Polyline({
//        strokeColor: '#736F6F',
//        strokeOpacity: 1.0,
//        strokeWeight: 3
//    });
    
    //poly.setMap(map);
    //var path =poly.getPath();
    var bounds = new google.maps.LatLngBounds();
    var geocoder = new google.maps.Geocoder;
    
    var boxContents = [];
    
    for(i = 0; i < arrFechas.length;i++){
        var contenidoCaja = '<div id="infoFichaje_' + i + '">';
        contenidoCaja += '<h1>' + arrEmpleados[i] + '</h1>';
        contenidoCaja += '<p style="text-transform: capitalize;">FECHA: ' + arrFechas[i] + '</p>';
        
        if (obj.infogps[i] !== null) {
            contenidoCaja += '<p style="text-transform: capitalize;">FUENTE: ' + obj.infogps[i].source + '</p>';
            contenidoCaja += '<p style="text-transform: capitalize;">PRECISION: ' + obj.infogps[i].acc.replace('.', ',') + ' metros</p>';
        }else {
            contenidoCaja += '<p style="text-transform: capitalize;">FUENTE: ----- </p>';
            contenidoCaja += '<p style="text-transform: capitalize;">PRECISION: ----- </p>';
        }
        contenidoCaja += '<p style="text-transform: capitalize;">GEOCODE: -localizacion-</p>';
        contenidoCaja += '</div>';
        
        boxContents[i] = contenidoCaja;
        
        var infowindow = new google.maps.InfoWindow({
            content: boxContents[i]
        });
        var punto = arrGPS[i].split(",");
        var posicion= new google.maps.LatLng(parseFloat(punto[0]), parseFloat(punto[1]));
        //path.push(posicion);
        
        marker = new google.maps.Marker({
            map: map,
            position: posicion,
            title: 'Empleado ' + arrFechas[i],
            infowindow: infowindow,
            icon: iconBase + 'number_' + i + '.png'
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        	return function() {
        		//alert(boxContents[i]);	        	
        		//alert (marker.getPosition());
	            map.setCenter(marker.getPosition());
	            map.setZoom(14);
	            infowindow.setContent(boxContents[i]);
	            html_infowindow = infowindow.getContent();
	           
	            if (typeof coordenadas_marker[i] === 'undefined') coordenadas_marker[i] = new google.maps.LatLng(parseFloat(0), parseFloat(0));
	            
	            var distancia_geo = getDistance (marker.getPosition(), coordenadas_marker[i]);
	            
	            if ((typeof direcciones[i] === 'undefined') || (distancia_geo > 5)) {
		            geocode_callback (marker, geocoder, function (direccion) {
		            	coordenadas_marker[i]  = marker.getPosition();
		            	
		            	direcciones[i] = direccion;
		            	html_infowindow_replace = html_infowindow.replace("-localizacion-", direcciones[i], "gi");
		 	            infowindow.setContent(html_infowindow_replace);
		 	            // where I have added .html to the marker object.
		 	            //this.infowindow.open(map, this);
		 	            infowindow.open(map, marker);
		            });
	            } else {
	            	html_infowindow_replace = html_infowindow.replace("-localizacion-", direcciones[i], "gi");
	 	            infowindow.setContent(html_infowindow_replace);
	 	            // where I have added .html to the marker object.
	 	            //this.infowindow.open(map, this);
	 	            infowindow.open(map, marker);
	            }
        	}
        })(marker, i));

        bounds.extend(marker.getPosition());
        
        markers.push(marker);
        
        
    }
    
    map.fitBounds(bounds);
}

function myClick(id){
    google.maps.event.trigger(markers[id], 'click');
}

function geocode_callback (marker_c, geocoder_c, callback) {
	geocoder_c.geocode({'location': marker_c.getPosition()}, function(results, status) {
        if (status === 'OK') {
          if (results[1]) {
        	 callback(results[1].formatted_address);
          } else {
        	 callback('Dirección no encontrada'); 
          }
        } else {
        	callback('Geocoding no disponible'); 
        }
    });
}

var rad = function(x) {
	  return x * Math.PI / 180;
	};

var getDistance = function(p1, p2) {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(p2.lat() - p1.lat());
	var dLong = rad(p2.lng() - p1.lng());
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	
	return d; // returns the distance in meter
};


function stopTimer () {
	clearTimeout(timer);
}

function startTimer (segundos) {
    var milisegundos = segundos * 1000;
    intervalo_seg = segundos;
    timer = setTimeout("$(\"#bot_act\").click();", milisegundos);
}

function stateTimer (chk) {
    
    if (chk.checked){
        startTimer (document.getElementById('intervalo').value);
        console.log('started');
    } else {
        stopTimer ();
        console.log('stopped');
    }
    
}

function update_acc (){
    var precision_p = document.getElementById('precision').value;
    
    $.post("../common/set_recorrido_precision.php",
    {
        precision: precision_p
    },
    function(data, status){
        $("#bot_act").click();
    });
    
}

