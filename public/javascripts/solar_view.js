var canvas = new fabric.Canvas('demo');

var constRotationSpeed = 20000,
    xAxisLength = 200,
    yAxisLength = 120,
    canvasWidth = canvas.getWidth(),
    canvasHeight = canvas.getHeight(),
    maxARadius = 5,
    maxBRadius = 5,
    maxMagnitude = 33;


addPlanets(1, 50, 2, 4, 4, "Sun", 33, "white", "white", 1, 20);
//addPlanets(2, 30, 4, 1, 1, "Mercury", 20, "blue", "white", 1, 20);

function addAsteroid(index, planetSize, period, xAxisLength, yAxisLength, planetName, magnitude, planetType, color1, color2, orbitOn, yawAngle) {
    
    rotationSpeed = constRotationSpeed/period;
    xAxisLength = xAxisLength* canvasWidth/maxARadius/2;
    yAxisLength = yAxisLength* canvasHeight/maxBRadius/2;
    var opacity = magnitude/maxMagnitude;

    var planet = new fabric.Circle({
      radius: planetSize,
      //left: canvas.getWidth()/2 - xAxisLength,
      //top: canvas.getHeight()/2 - yAxisLength,
      fill: "white",
      //stroke: 'rgba(0,192,255,0.5)',
      index: index,
    });
    canvas.add(planet);

    if(orbitOn)
        createOrbit(index, xAxisLength, yAxisLength,yawAngle, color1, color2);

    animatePlanet(planet, index, xAxisLength, yAxisLength);

    // // load sprite with planets
    // fabric.Image.fromURL(url, function(planetsImg) {

    //     // temp canvas to generate planet images
    //     var tempCanvas = new fabric.StaticCanvas();

    //     // only to fit one planet onto temp canvas
    //     tempCanvas.setDimensions({
    //       width: planetSize,
    //       height: planetSize
    //     });

    //     // make sure image is drawn from left/top corner
    //     planetsImg.originX = 'left';
    //     planetsImg.originY = 'top';

    //     // add it onto temp canvas
    //     tempCanvas.add(planetsImg);

    //     //for (var i = 0; i < totalPlanets; i++) {
    //       createOrbit(index, xAxisLength, yAxisLength,yawAngle, color1, color2);
    //     //}

    //     //for (var i = 0; i < totalPlanets; i++) {
    //       var planet = createPlanet(index, planetsImg, tempCanvas, opacity, planetName);
    //       //planets.push(planet);
    //       animatePlanet(planet, index, xAxisLength, yAxisLength);
    //     //}

    //  });
}

function addPlanets(index, planetSize, period, xAxisLength, yAxisLength, planetName, magnitude, color1, color2, orbitOn, yawAngle) {

    if(planetName == "Mercury")
        url = '../images/Mercury.png';
    else if(planetName == "Venus")
        url = '../images/Venus.png';
    else if(planetName == "Earth")
        url = '../images/Earth.png';
    else if(planetName == "Mars")
        url = '../images/Mars.png';
    else if(planetName == "Jupiter")
        url = '../images/Jupiter.png';
    else if(planetName == "Neptune")
        url = '../images/Neptune.png';
    else if(planetName == "Uranus")
        url = '../images/Uranus.png';
    else if(planetName == "Pluto")
        url = '../images/Pluto.png';
    else if(planetName == "Sun")
        url = '../images/Sun.png';
    else
        console.log("not valid planet type!");

    rotationSpeed = constRotationSpeed/period;
    xAxisLength = xAxisLength* canvasWidth/maxARadius/2;
    yAxisLength = yAxisLength* canvasHeight/maxBRadius/2;
    opacity = magnitude/maxMagnitude;

    // load sprite with planets
    fabric.Image.fromURL(url, function(planetsImg) {

        // temp canvas to generate planet images
        var tempCanvas = new fabric.StaticCanvas();

        // only to fit one planet onto temp canvas
        tempCanvas.setDimensions({
          width: planetSize,
          height: planetSize
        });

        // make sure image is drawn from left/top corner
        planetsImg.originX = 'left';
        planetsImg.originY = 'top';

        // add it onto temp canvas
        tempCanvas.add(planetsImg);

        //for (var i = 0; i < totalPlanets; i++) {
          createOrbit(index, xAxisLength, yAxisLength,yawAngle, color1, color2);
        //}

        //for (var i = 0; i < totalPlanets; i++) {
          var planet = createPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize);
          //planets.push(planet);
          animatePlanet(planet, index, xAxisLength, yAxisLength, planetSize);
        //}

     });
}


function createOrbit(index, xAxisLength, yAxisLength, yawAngle, color1, color2) {
    var orbit = new fabric.Ellipse({
      rx: xAxisLength,
      ry: yAxisLength,
      left: canvas.getWidth()/2 - xAxisLength,
      top: canvas.getHeight()/2 - yAxisLength,
      fill: "",
      //stroke: 'rgba(0,192,255,0.5)',
      strokeWidth: 1,
      index: index,
      //angle: yawAngle,
    });

    gradientAngle = fabric.util.getRandomInt(0, 1);

if(gradientAngle == 0)
{
    orbit.setGradient('stroke', {
    x1: 0,
    y1: orbit.height / 2,
    x2: orbit.width,
    y2: orbit.height / 2,
    colorStops: {
        0: color1,
        1: color2
        }
    });
}
else
{
    orbit.setGradient('stroke', {
    x1: orbit.width / 2,
    y1: 0,
    x2: orbit.width / 2,
    y2: orbit.height,
    colorStops: {
        0: color1,
        1: color2
        }
    }); 
}

console.log(orbit);
    canvas.add(orbit);
    //orbits.push(orbit);
}

function createPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize) {

    // offset planets sprite to fit each of the planets onto it
    planetsImg.left = -planetSize ;
    planetsImg.setCoords();
    tempCanvas.renderAll();

    // get data url for that planet
    var img = new Image;
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

function animatePlanet(oImg, planetIndex, xAxisLength, yAxisLength, planetSize) {

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

          // only render once
          //if (planetIndex === totalPlanets - 1) {
            canvas.renderAll();
          //}
        },
        onComplete: animate
      });
    })();
}

