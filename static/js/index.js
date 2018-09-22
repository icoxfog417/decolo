navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;


window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
             return window.setTimeout(callback, 1000/60);
           };
  })();


(function() {
    var canvas = document.getElementById("canvas");
    var video = document.getElementById("video");

    video.width = window.innerWidth;
    video.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var context = canvas.getContext("2d");
    var ctracker = new clm.tracker();

    var media = null;
    if (navigator.mediaDevices) {
        media = navigator.mediaDevices.getUserMedia({video : {facingMode: "user"}});
    } else if (navigator.getUserMedia) {
        media = navigator.getUserMedia({video : true});
    } else {
        video.src = "./static/img/fall.mp4";
    }

    media.then(function(stream){
        if ("srcObject" in video) {
            video.srcObject = stream;
        } else {
            video.src = (window.URL && window.URL.createObjectURL(stream));
        }
        video.onloadedmetadata = function() {
            video.play();
        }
    }).catch(function(err){
        video.src = "./static/img/fall.mp4";
        console.log(err);
    })

    $(window).resize(function(){
        video.width = window.innerWidth;
        video.height = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 40;
        context = canvas.getContext("2d");
        ctracker.stop();
        ctracker.reset();
        ctracker.start(video);
    })
    
    function drawLoop() {
        requestAnimFrame(drawLoop);
        var positions = ctracker.getCurrentPosition();
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (ctracker.getCurrentPosition()) {
            ctracker.draw(canvas);
        }
    }

    ctracker.init();
    ctracker.start(video)
    video.play();
    drawLoop();

})();
