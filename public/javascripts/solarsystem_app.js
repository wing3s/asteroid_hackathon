// var totalPlanets = 10,
var constRotationSpeed = 20000;
var canvasWidth  = 1200;
var canvasHeight = 600;
console.log(canvasWidth);
var maxARadius = 5;
var maxBRadius = 5;
var maxMagnitude = 33;


function addPlanets(index, planetSize, period, xAxisLength, yAxisLength, planetName, magnitude, color1, color2, orbitOn, yawAngle) {
    var url = "/images/planet/"+planetName+".png";

    var rotationSpeed = constRotationSpeed/period;
    xAxisLength = xAxisLength* canvasWidth/maxARadius/2;
    yAxisLength = yAxisLength* canvasHeight/maxBRadius/2;
    var opacity = magnitude/maxMagnitude;

    // load sprite with planets
    fabric.Image.fromURL(url, function(planetsImg) {
        // temp canvas to generate planet images
        var tempCanvas = new fabric.StaticCanvas();
        // only to fit one planet onto temp canvas
        tempCanvas.setDimensions({
          width: planetSize,
          height: planetSize
        });
        console.log(tempCanvas);

        // make sure image is drawn from left/top corner
        planetsImg.originX = 'left';
        planetsImg.originY = 'top';
        // add it onto temp canvas
        tempCanvas.add(planetsImg);
        
        createOrbit(index, xAxisLength, yAxisLength,yawAngle, color1, color2, planetSize);

        var planet = createPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize, xAxisLength);
        animatePlanet(planet, index, xAxisLength, yAxisLength, rotationSpeed, planetSize);
     });
}

function createPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize, xAxisLength) {
    // offset planets sprite to fit each of the planets onto it
    planetsImg.left = -planetSize ;
    planetsImg.setCoords();
    tempCanvas.renderAll();

    // get data url for that planet
    var img = new Image();
    img.src = tempCanvas.toDataURL();

    // create image of a planet from data url
    var oImg = new fabric.Image(img, {
        width: planetSize,
        height: planetSize,
        opacity: opacity,
        name: planetName,
        index: index,
        // position planet 90px from canvas center and 26px from previous planet
        left: (canvas.getWidth() / 2) - xAxisLength,
        top: canvas.getHeight() / 2,
        // remove borders and corners but leaving object available for events
        hasBorders: false,
        hasControls: false
    });
    canvas.add(oImg);
    return oImg;
}


function animatePlanet(oImg, planetIndex, xAxisLength, yAxisLength, rotationSpeed, planetSize) {
    var xLength = xAxisLength,
        yLength = yAxisLength,
        
        // rotate around canvas center
        cx = canvas.getWidth() / 2,
        cy = canvas.getHeight() / 2,

        // speed of rotation slows down for further planets
        duration = rotationSpeed,

        // randomize starting angle to avoid planets starting on one line
        startAngle = fabric.util.getRandomInt(-180, 0),
        endAngle = startAngle + 359;

    (function animate() {
      fabric.util.animate({
        startValue: startAngle,
        endValue: endAngle,
        duration: duration,
        // linear movement
        easing: function(t, b, c, d) { return c*t/d + b; },
        onChange: function(angle) {
          angle = fabric.util.degreesToRadians(angle);
          var x = cx + xLength * Math.cos(angle) - planetSize/2;
          var y = cy + yLength * Math.sin(angle) - planetSize/2;
          
          oImg.set({ left: x, top: y }).setCoords();
          canvas.renderAll();
        },
        onComplete: animate
      });
    })();
}


function createOrbit(index, xAxisLength, yAxisLength, yawAngle, color1, color2, planetSize) {
    var orbit = new fabric.Ellipse({
      rx: xAxisLength,
      ry: yAxisLength,
      left: canvasWidth/2 - xAxisLength,
      top: canvasHeight/2 - yAxisLength,
      fill: "",
      stroke: 'rgba(0,192,255,0.5)',
      strokeWidth: 1,
      index: index,
      //angle: yawAngle,
    });
    gradientAngle = fabric.util.getRandomInt(0, 1);
    console.log(orbit);
    // if(gradientAngle === 0) {
    //     orbit.setGradient('stroke', {
    //     x1: 0,
    //     y1: orbit.height / 2,
    //     x2: orbit.width,
    //     y2: orbit.height / 2,
    //     colorStops: {
    //         0: color1,
    //         1: color2
    //         }
    //     });
    // } else {
    //     orbit.setGradient('stroke', {
    //     x1: orbit.width / 2,
    //     y1: 0,
    //     x2: orbit.width / 2,
    //     y2: orbit.height,
    //     colorStops: {
    //         0: color1,
    //         1: color2
    //         }
    //     });
    // }
    canvas.add(orbit);
}