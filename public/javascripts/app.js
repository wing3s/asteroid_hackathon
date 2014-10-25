var canvas = new fabric.Canvas('demo');

var planetSize = 26,
    totalPlanets = 10,
    constRotationSpeed = 20000,
    xAxisLength = 200,
    yAxisLength = 120,
    index = 5,
    planetName = "Saturn",
    canvasWidth = canvas.getWidth(),
    canvasHeight = canvas.getHeight(),
    maxARadius = 5,
    maxBRadius = 5,
    maxMagnitude = 33;

var hoverCircle = new fabric.Ellipse({
							strokeWidth: 2, 
                            fill: "",
                            stroke: "green",
                            opacity: 0.3,                
                            rx: 500, ry:300, 
                            left: 100, top:0});

//canvas.add(hoverCircle);
//addAsteroid( 1, planetSize, 5.33, 3.04971, 3.03044, "K13C45M", 16.3, "M", 30);
//addAsteroid( 2, 30, 4.37, 2.67122, 2.6396, "0401391", 16.50, "M", 45);

//addAsteroidEarthView(1, .3, .1, "M", 16.3);
addAsteroidEarthView(2, .5, .3, "P", 21.3, 1);
addAsteroidEarthView(3, .6, .4, "M", 12.3, 1.2);
addAsteroidEarthView(4, .7, .5, "P", 15.2, 1.5);
addAsteroidEarthView(5, .9, .7, "S", 7.2, 2);
addAsteroidEarthView(6, 1.0, .8, "B", 16.2, 2.4);
addAsteroidEarthView(7, 1.1, .9, "M", 11.2, 3.1);
addAsteroidEarthView(8, 1.2, 1.0, "B", 16.2, 3.7);
addAsteroidEarthView(9, 1.4, 1.2, "M", 11.2, 4.3);

function addAsteroidEarthView(index, xAxisLength, yAxisLength, planetType, magnitude, period) {

	opacity = magnitude /maxMagnitude;

	if(planetType == "M")
		url = '../images/astroid-04.png';
	else if(planetType == "P")
 		url = '../images/astroid-05.png';
 	else if(planetType == "S")
		url = '../images/astroid-06.png';
	else if(planetType == "B")
		url = '../images/astroid-07.png';
	else if(planetType == "F")
		url = '../images/astroid-08.png';
	else if(planetType == "G")
		url = '../images/astroid-09.png';
	else if(planetType == "C")
		url = '../images/astroid-10.png';
	else 
		console.log("not valid planet type!");


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

		xAxisLength = xAxisLength * canvasWidth;
		yAxisLength = yAxisLength * canvasHeight;

		createOrbitEarthView(index, xAxisLength, yAxisLength, 0);	    
	    
	    //for (var i = 0; i < totalPlanets; i++) {
	      var planet = createPlanet(index, planetsImg, tempCanvas, opacity);
	      //planets.push(planet);
	      animatePlanetEarthView(planet, index, xAxisLength, yAxisLength, period);
	    //}

	 });

}

function createOrbitEarthView(index, xAxisLength, yAxisLength, yawAngle) {
    var orbit = new fabric.Ellipse({
      rx: xAxisLength,
      ry: yAxisLength,
      left: -xAxisLength,
      top: canvasHeight * 1.2 - yAxisLength,//canvas.getHeight()/4,
      fill: "",
      stroke: 'rgba(0,192,255,0.5)',
      strokeWidth: 2,
      index: index,
      //angle: yawAngle,
    });
    canvas.add(orbit);
    //orbits.push(orbit);
}

function animatePlanetEarthView(oImg, planetIndex, xAxisLength, yAxisLength, period) {

    var xLength = xAxisLength,
    	yLength = yAxisLength,
        
        cx = 0,
        cy = canvasHeight *1.2,

        // speed of rotation slows down for further planets
        duration = constRotationSpeed * period,

        // randomize starting angle to avoid planets starting on one line
        startAngle = fabric.util.getRandomInt(-180, 0),
        endAngle = startAngle + 349;

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

function addAsteroid(index, planetSize, period, xAxisLength, yAxisLength, planetName, magnitude, planetType, yawAngle) {
	
	if(planetType == "M")
		url = '../images/astroid-04.png';
	else if(planetType == "P")
 		url = '../images/astroid-05.png';
 	else if(planetType == "S")
		url = '../images/astroid-06.png';
	else if(planetType == "B")
		url = '../images/astroid-07.png';
	else if(planetType == "F")
		url = '../images/astroid-08.png';
	else if(planetType == "G")
		url = '../images/astroid-09.png';
	else if(planetType == "C")
		url = '../images/astroid-10.png';
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
	      createOrbit(index, xAxisLength, yAxisLength,yawAngle);
	    //}

	    //for (var i = 0; i < totalPlanets; i++) {
	      var planet = createPlanet(index, planetsImg, tempCanvas, opacity);
	      //planets.push(planet);
	      animatePlanet(planet, index, xAxisLength, yAxisLength);
	    //}

	 });
}

function createOrbit(index, xAxisLength, yAxisLength, yawAngle) {
    var orbit = new fabric.Ellipse({
      rx: xAxisLength,
      ry: yAxisLength,
      left: canvas.getWidth()/2 - xAxisLength,
      top: canvas.getHeight()/2 - yAxisLength,
      fill: "",
      stroke: 'rgba(0,192,255,0.5)',
      strokeWidth: 2,
      index: index,
      //angle: yawAngle,
    });
    canvas.add(orbit);
    //orbits.push(orbit);
}

function createPlanet(index, planetsImg, tempCanvas, opacity) {

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

function animatePlanet(oImg, planetIndex, xAxisLength, yAxisLength) {

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

