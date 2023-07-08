// Make the DIV element draggable:
dragElement(document.getElementById('avatar'));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var originalX = elmnt.offsetLeft;
  var originalY = elmnt.offsetTop;
  var returnTimeout;

  if (document.getElementById(elmnt.id + 'header')) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    clearTimeout(returnTimeout);
    returnTimeout = setTimeout(function () {
      returnToOriginalPosition(elmnt);
    }, 10000); // Delay of 10 seconds (10,000 milliseconds)
  }

  function returnToOriginalPosition(element) {
    var startX = element.offsetLeft;
    var startY = element.offsetTop;
    var targetX = originalX;
    var targetY = originalY;
    var distanceX = targetX - startX;
    var distanceY = targetY - startY;
    var duration = 1000; // milliseconds
    var startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = timestamp - startTime;
      var easeProgress = progress / duration;
      var currentX = startX + distanceX * easeProgress;
      var currentY = startY + distanceY * easeProgress;
      // restrict the element to stay within the window boundaries
      currentX = Math.max(
        0,
        Math.min(currentX, window.innerWidth - element.offsetWidth)
      );
      currentY = Math.max(
        0,
        Math.min(currentY, window.innerHeight - element.offsetHeight)
      );
      element.style.left = currentX + 'px';
      element.style.top = currentY + 'px';

      if (progress < duration) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  // Remove the "bottom: 0" CSS property from the element
  elmnt.style.bottom = '';
}
