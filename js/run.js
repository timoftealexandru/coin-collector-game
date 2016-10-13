var LEVELS=[];
LEVELS[0]=[
  "   =xxx   |            v     |o x",
  "=   x!x                         x",
  "     o          	  o o   o      x",
  "xxx                           o x",
  "!!x          x=    x x   x  xxxxx",
  "!!x         o o    x!x o x!!x o x",
  "!!x @      xxxxx   x!x   xxxx = x",
  "!!xxx x|           x!x          x",
  "!!!!x!x!!!!!!!!!!!!x!x          x",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "                               "
];



function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
var arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);
  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}
function runGame(plans, Display) {
  function startLevel(n) {
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost")
        startLevel(n);
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else{
		 document.body.innerHTML='<div class="won">YOU WON !</div>';
	  }
    });
  }
  startLevel(0);
}
runGame(LEVELS, DOMDisplay);