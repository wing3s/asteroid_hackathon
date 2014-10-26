var constSolarRotationSpeed = 20000,
    xAxisLength = 200,
    yAxisLength = 120,
    canvasWidth = canvas.getWidth(),
    canvasHeight = canvas.getHeight(),
    maxARadius = 5,
    maxBRadius = 5,
    maxMagnitude = 33;




function addSolarPlanets() {
    addPlanets(1, 85, 2, 0, 0, "Sun", 33, "white", "white", 1, 20);
    addPlanets(2, 51, 11.8618, 5.204, 4.950, "Jupiter", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
    addPlanets(2, 21, 2.135, 1.523679, 1.3814, "Mars", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
    addPlanets(2, 16, 0.240, 0.387, 0.307, "Mercury", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
    addPlanets(2, 43, 164.8, 30.07, 29.809, "Neptune", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
    addPlanets(2, 21, 247.68, 39.264, 29.657, "Pluto", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
    addPlanets(2, 69, 29.457, 9.582, 9.048, "Saturn", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
    addPlanets(2, 47, 84.016, 19.189, 18.283, "Uranus", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
    addPlanets(2, 24, 0.615, 0.723, 0.718, "Venus", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
    addPlanets(2, 26, 1, 1, 0.983, "Earth", 20, "rgba(169  ,82 , 165, 0.8)", 'rgba(102, 45, 145, 0.4)', 1, 20);
}

//addAsteroid( 1, 10, 5.33, 3.04971, 3.03044, "K13C45M", 16.3, "M", "blue", "white", 1, 0);


function addAsteroid(index, planetSize, period, xAxisLength, yAxisLength, planetName, magnitude, orbit_type, color1, color2, orbitOn, yawAngle) {
    
    rotationSpeed = constSolarRotationSpeed/period;
    xAxisLength = xAxisLength* canvasWidth/maxARadius/2;
    yAxisLength = yAxisLength* canvasHeight/maxBRadius/2;
    var opacity = magnitude/maxMagnitude;

    var orbit_colors = {
        0: ['white', 'blue'],
        1:  ['rgba(237  ,30 , 121, 0.4)', 'rgba(147, 39, 143, 0.05)'],
        2:  ['rgba(237  ,28 , 36, 0.4)', 'rgba(247, 147, 30, 0.05)'],
        3:  ['rgba(251  ,176 , 59, 0.4)', 'rgba(241, 90, 36, 0.05)'],
        4:  ['rgba(251  ,176 , 59, 0.4)', 'rgba(34, 181, 115, 0.05)'],
        5:  ['rgba(34  ,181 , 115, 0.4)', 'rgba(0, 113, 188, 0.05)'],
        6:  ['rgba(0  ,169 , 157, 0.4)', 'rgba(0, 113, 188, 0.05)'],
        7:  ['rgba(41  ,171 , 226, 0.4)', 'rgba(102, 45, 145, 0.05)'],
        8:  ['rgba(169  ,82 , 165, 0.4)', 'rgba(102, 45, 145, 0.05)'],
        9:  ['rgba(169  ,82 , 165, 0.4)', 'rgba(0, 113, 188, 0.05)'],
        10: ['rgba(102  ,102 , 102, 0.4)', 'rgba(26, 26, 26, 0.05)'],
    };


    // var planet = new fabric.Circle({
    //   radius: planetSize,
    //   //left: canvas.getWidth()/2,
    //   //top: canvas.getHeight()/2,
    //   fill: "white",
    //   //stroke: 'rgba(0,192,255,0.5)',
    //   index: index,
    // });
    // canvas.add(planet);

    if(orbitOn)
        createOrbit(index, xAxisLength, yAxisLength, yawAngle, orbit_colors[orbit_type][0], orbit_colors[orbit_type][1]);

    // animatePlanet(planet, index, xAxisLength, yAxisLength, planetSize);

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

    url = '/images/planet/'+planetName+'.png';

    rotationSpeed = constSolarRotationSpeed/period;
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

    if(gradientAngle === 0) {
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
    } else {
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
    canvas.add(orbit);
    canvas.sendToBack(orbit);
}

function createPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize) {

    // offset planets sprite to fit each of the planets onto it
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

