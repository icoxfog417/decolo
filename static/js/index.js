(function() {
    var container = document.getElementById("wrap");
    var canvas = document.getElementById("canvas");
    var video = document.getElementById("video");
    var context = canvas.getContext("2d");
    var media = navigator.mediaDevices.getUserMedia(
        {video: {facingMode: "user"}, audio: false}
    )
    media.then(function(stream){
        video.srcObject = stream;
    }).catch(function(err){
        console.log(err);
    })

    var ctracker = new clm.tracker();
    ctracker.init();

    function beginTrack(){
        ctracker.stop();
        ctracker.reset();
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        video.width = container.offsetWidth;
        video.height = container.offsetHeight;
        context = canvas.getContext("2d");
        ctracker.start(video)
    }

    window.addEventListener("resize", function() {
      (!window.requestAnimationFrame) ? setTimeout(beginTrack, 300): window.requestAnimationFrame(beginTrack);
    });

    function drawLoop() {
        requestAnimationFrame(drawLoop);
        var positions = ctracker.getCurrentPosition();
        context.clearRect(0, 0, canvas.width, canvas.height);
        ctracker.draw(canvas);
    }
    drawLoop();

})();
