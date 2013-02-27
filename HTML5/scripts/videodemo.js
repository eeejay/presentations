function toggle(button) {
  var video = document.querySelector(':target video.demo');
  if (video.paused) {
    button.innerHTML = 'Stop Demo';
    startVideo(video);
    return;
  }

  button.innerHTML = 'Start Demo';
  video.pause();
  video.src = null;
  if (video.mozSrcObject)
    video.mozSrcObject.stop();
  video.onmousemove = null;
}

function startVideo(video) {
  navigator.mozGetUserMedia(
    {video: true},
    function(stream) {
      video.mozSrcObject = stream;
      video.play();
      video.onmousemove = function (e) {
        if (e.buttons)
          translate(e.mozMovementX, e.mozMovementY);
      };
    },
    function(err) {
      alert("An error occured! " + err);
    }
  );
}

function rotate(degrees) {
  var video = document.querySelector(':target video.demo');
  video._rotation = (video._rotation || 0) + degrees;

  updateTransforms(video);
};

function scale(factor) {
  var video = document.querySelector(':target video.demo');
  video._scale = (video._scale || 1) + factor;
  updateTransforms(video);
};

function translate(x, y) {
  var video = document.querySelector(':target video.demo');
  video._translation = video._translation || {x: 0, y: 0};

  video._translation.x += x;
  video._translation.y += y;
  updateTransforms(video);
};

function updateTransforms(video) {
  var currentRotation = video._rotation || 0;
  var currentScale = video._scale || 1;
  var currentTranslation = video._translation || {x: 0, y: 0};
  if (video._origTransform == undefined) {
    video._origTransform = getComputedStyle(video).transform;
  }

  video.style.transform = video._origTransform + ' scale('+ currentScale +') ' +
    'rotate('+currentRotation+'deg)';
  console.log(video.style.transform);
  video.style.marginLeft = currentTranslation.x + 'px';
  video.style.marginTop = currentTranslation.y + 'px';
}