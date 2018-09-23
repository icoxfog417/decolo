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
            var image = new Image();
            if(GENDER == 1){
                image.src = "./static/img/crown_m.png";
            }else{
                image.src = "./static/img/crown_f.png";
            }
            ctracker.draw(canvas);
            drawStump(positions, image, [0, 9], 3);
        }
    }

    function drawStump(positions, image, location, scale){
        var eyeWidth = positions[32][0] - positions[27][0];
        var noseHeight = positions[62][1] - positions[33][1];

        var eyeHeight = positions[32][1] - positions[27][1];
        // calculate angle
        var eyeAngle = Math.atan2(eyeWidth, eyeHeight);
        
        var imageWidth = eyeWidth * scale;
        var imageHeight = image.height * (imageWidth / image.width);
        
        var measureX = eyeWidth / 2;
        var measureY = noseHeight / 2;
        var left = positions[62][0] + (location[0] * measureX) - (imageWidth /2);
        var top = positions[62][1] - (location[1] * measureY) - (imageHeight /2);

        //var left = left * Math.cos(eyeAngle) - top * Math.sin(eyeAngle);
        //var top = left * Math.sin(eyeAngle) + top * Math.cos(eyeAngle);

        context.drawImage(image, left, top, imageWidth, imageHeight);
        console.log([eyeAngle, left, top, imageWidth, imageHeight]);
    }

    ctracker.init();
    ctracker.start(video)
    video.play();
    drawLoop();

})();
