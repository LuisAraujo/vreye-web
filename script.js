var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


recognition.onresult = function(event) { 
    console.log(event);
    let length = event.results.length;  
    let command = event.results[length-1][0].transcript;
    console.log('Resultado recebido: ' + command + '.');

    if (command.toLowerCase().indexOf("aumentar") > -1){
        zoom = zoom+0.2;
        zooming();
    }
    else if (command.toLowerCase().indexOf("diminuir") > -1){
        zoom = zoom-0.2;
        zooming();
    }else if (command.toLowerCase().indexOf("original") > -1){
        zoom = 1;
        zooming();
    }else if (command.toLowerCase().indexOf("duas vezes") > -1){
        zoom = 2;
        zooming();
    }
    else if (command.toLowerCase().indexOf("três vezes") > -1){
        zoom = 3;
        zooming();
    }
}


recognition.onstart = function () {
    console.log('start');
};

recognition.onend = function () {
    console.log('end');
};

recognition.onerror = function (event) {
    console.log('error');
};


let currentFacingMode = 'environment';
  let zoom = 1;
  const videoPreview = document.querySelector('#video-preview');
  video_top = 0;
  video_left = 0;
  w_curr = 0;;
  h_curr = 0;

  const startCamera = (facingMode = 'environment') => {
    stopCamera();
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
        width: {
          max: 1980,
          ideal: 1024
        },
        height: {
          max: 1080,
          ideal: 768
        }
      }
    }).then((stream) => {
      videoPreview.srcObject = stream;
      w_initial =  videoPreview.offsetWidth;
      h_initial =  videoPreview.offsetHeight;
      w_curr = w_initial;
      h_curr = h_initial;
    })
  }

  const stopCamera = () => {
    if (videoPreview.srcObject) {
      const stream = videoPreview.srcObject;
      const tracks = stream.getTracks().forEach((track) => track.stop());
    }
  }

  const btnCamera = document.querySelector('#btn-camera');
  const canvas = document.querySelector('#canvas');
  const videoPreviewContainer = document.querySelector('#video-preview-container');
  const dialogCamera = document.querySelector('#dialog-camera');
  const btnZoomOut = document.querySelector('#btn-zoom-out');
  const btnZoomIn = document.querySelector('#btn-zoom-in');
  

  const btnOpenCamera = document.querySelector('#btn-open-camera');
  btnOpenCamera.addEventListener('click', () => {
    dialogCamera.classList.toggle('hidden');
    startCamera(currentFacingMode);
    recognition.start();
  });

 
  btnZoomOut.addEventListener('click', () => {
    zoom = zoom+0.2;
    zooming();
  });

  btnZoomIn.addEventListener('click', () => {
   
    zoom = zoom-0.2;
    zooming();
  
  });

  function zooming(){
    videoPreview.style.transform = "scale("+zoom+")";
    w_after = w_curr;
    h_after = h_curr;
    w_curr = w_initial * zoom;
    h_curr = h_initial * zoom;
    w_dif =  w_initial - w_curr;
    h_dif =  h_initial - h_curr;
    console.log("left top", video_left, video_top);
    video_top = h_dif/12;
    video_left = w_dif/12;
    videoPreview.style.top =  video_top + "px";
    videoPreview.style.left =  video_left+ "px";
    console.log("w h after", w_after, h_after);
    console.log("w h before", w_curr, h_curr);
    console.log("w h dif", w_dif, h_dif);
    console.log("left top", video_left, video_top);
    console.log("---");
  }