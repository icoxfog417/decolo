navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

(function() {
    var canvas = document.getElementById("canvas");
    var video = document.getElementById("video");
    var context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    video.width = window.innerWidth;
    var height = Math.round(video.width / 4 * 3);
    canvas.height = height;
    video.height = height;
    context = canvas.getContext("2d");

    var ctracker = new clm.tracker();
    ctracker.init();
    ctracker.start(video)

    function gumSuccess( stream ) {
        // add camera stream if getUserMedia succeeded
        if ("srcObject" in vid) {
            video.srcObject = stream;
        } else {
            video.src = (window.URL && window.URL.createObjectURL(stream));
        }
        vid.onloadedmetadata = function() {
            adjustVideoProportions();
            video.play();
        }
        vid.onresize = function() {
            adjustVideoProportions();
            if (trackingStarted) {
                ctrack.stop();
                ctrack.reset();
                ctrack.start(vid);
            }
        }
    }

    var media = navigator.mediaDevices.getUserMedia(
        {video: true, audio: false}
    )
    media.then(function(stream){
        if ("srcObject" in video) {
            video.srcObject = stream;
        } else {
            video.src = (window.URL && window.URL.createObjectURL(stream));
        }
        vidio.onloadedmetadata = function() {
            vidio.play();
        }
    }).catch(function(err){
        console.log(err);
    })

    function drawLoop() {
        requestAnimationFrame(drawLoop);
        var positions = ctracker.getCurrentPosition();
        context.clearRect(0, 0, canvas.width, canvas.height);
        ctracker.draw(canvas);
    }
    drawLoop();

})();