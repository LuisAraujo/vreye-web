var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var video = document.getElementById('video');
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

setInterval(function(){
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    console.log("ok");
}, 1000)