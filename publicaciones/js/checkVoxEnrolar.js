//webkitURL is deprecated but nevertheless 
URL = window.URL || window.webkitURL;
var gumStream;

//stream from getUserMedia() 
var rec;

//Recorder.js object 
var input;

//MediaStreamAudioSourceNode we'll be recording 
// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;

var DNI;
var ID;
var trainingCount;
var elemento_id;

function entrenar(button, dni, id, tc, elemento){
	if (button.value == "Entrenar"){
		startRecording();
		animaGrabando(true);
		button.value = "Enviar";
	}else{
		DNI = dni.substring(0, dni.length -1);
		ID = id;
		trainingCount = tc;
		elemento_id = elemento;
		animaGrabando(false);
		stopRecording();
		button.value = "Entrenar";
	}
}

function startRecording() { 
    audioContext = new AudioContext();
    console.log("recordButton clicked"); 
    // Simple constraints object, for more advanced audio features see
    //https://addpipe.com/blog/audio-constraints-getusermedia/

    var constraints = {
    	video: false,
    	audio: {
    		sampleRate: 8000
    	}	
    }

    // We're using the standard promise based getUserMedia()

    //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
        // assign to gumStream for later use 
        gumStream = stream;
        // use the stream 
        input = audioContext.createMediaStreamSource(stream);
        // Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size 
        rec = new Recorder(input, {
            numChannels: 1
        }) 
        //start the recording process 
        rec.record()
        console.log("Recording started");
    }).catch(function(err) {
    	alert("No se pudo grabar");
    });
}

function stopRecording() {
    console.log("stopButton clicked");
    
    //tell the recorder to stop the recording 
    rec.stop(); //stop microphone access 
    gumStream.getAudioTracks()[0].stop();
    
    //create the wav blob and pass it
    rec.exportWAV(ajaxBlob);
    	
}

function ajaxBlob(blob){
    //Create the form to add the blob
    var data = new FormData();
    data.append('train', blob);
    data.append('id', ID);
    data.append('dni', DNI);
    data.append('tc', trainingCount);
    data.append('elemento_id', elemento_id);
    $.ajax({
        url : '../inc/procesa_voz.php',
        type: 'POST',
        data: data,
        contentType: false,
        processData: false,
        success: function(res) {
        	//alert(res);
        			var arr_aux = res.split("|");
	        		if(arr_aux[0] == 1){
	        			alert(arr_aux[1]);
	        		}else{
	        			document.getElementById("divEnrolar").innerHTML = arr_aux[1];
	        		}
        },    
        error: function() {
        			alert("Por favor revise su conexión");
        			location.reload();
        }
      });
}

//Funcion que anima la barra de grabando
function animaGrabando(flag){
    var img = document.getElementById("grabando");
    if(flag == true){
        img.style.display = "block";
    }else{
        img.style.display = "none";
    }
}
