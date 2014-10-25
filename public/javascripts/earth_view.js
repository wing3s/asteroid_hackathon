var canvas = new fabric.Canvas('demo');

var planetSize = 26,
	constRotationSpeed = 20000,
    //xAxisLength = 200,
    //yAxisLength = 120,
    canvasWidth = canvas.getWidth(),
    canvasHeight = canvas.getHeight(),
    maxARadius = 5,
    maxBRadius = 5,
    maxMagnitude = 33;

addAsteroidEarthView(1, 2.6, 2.2, "M", 16.3, 1, "Test2");
addAsteroidEarthView(2, 3.4, 3.0, "P", 21.3, 1, "ChuChu");
addAsteroidEarthView(3, 3.6, 3.2, "M", 12.3, 1.2, "Dede");
addAsteroidEarthView(4, 3.8, 3.4, "P", 15.2, 1.5, "BanBan");
addAsteroidEarthView(5, 4.1, 3.7, "S", 7.2, 2, "WH");
addAsteroidEarthView(6, 4.2, 3.8, "B", 16.2, 2.4, "JJ");
addAsteroidEarthView(7, 4.4, 4.0, "M", 11.2, 3.1, "Fon");
addAsteroidEarthView(8, 4.6, 4.2, "B", 16.2, 3.7, "Hack");
addAsteroidEarthView(9, 5.0, 4.6, "M", 11.2, 4.3, "Test");


function addAsteroidEarthView(index, xAxisLength, yAxisLength, planetType, magnitude, period, planetName) {

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
	      var planet = createPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize, xAxisLength);
	      //planets.push(planet);

		var planetLabel = new fabric.Text('', {
		    fill: '#fff',
		    fontSize: 16,
		    fontFamily: 'Open Sans',
		    textBackgroundColor: '#002244',
			name: planet.name});

		 canvas.add(planetLabel);

	     animatePlanetEarthView(planet, index, xAxisLength, yAxisLength, period, planetLabel);

		 });
	
}

function animatePlanetEarthView(oImg, planetIndex, xAxisLength, yAxisLength, period, planetLabel) {

    var cx = 0,
        cy = canvasHeight * 4,

        // speed of rotation slows down for further planets
        duration = constRotationSpeed * period,

        // randomize starting angle to avoid planets starting on one line
        startAngle = fabric.util.getRandomInt(-359, 0),
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

          var x = cx + xAxisLength * Math.cos(angle) - planetSize/2;
          var y = cy + yAxisLength * Math.sin(angle) - planetSize/2;
          
          oImg.set({ left: x, top: y }).setCoords();


		planetLabel.set({ left: oImg.left + 30, top: oImg.top + 10, text: oImg.name}).setCoords();

          // only render once
          //if (planetIndex === totalPlanets - 1) {
            canvas.renderAll();
          //}
        },
        onComplete: animate
      });
    })();
}

function createOrbitEarthView(index, xAxisLength, yAxisLength, yawAngle) {
    var orbit = new fabric.Ellipse({
      rx: xAxisLength,
      ry: yAxisLength,
      left: -xAxisLength,
      top: canvasHeight * 4 - yAxisLength,
      fill: "",
      stroke: 'rgba(0,192,255,0.5)',
      strokeWidth: 2,
      index: index,
      //angle: yawAngle,
    });
    canvas.add(orbit);
    //orbits.push(orbit);
}

function createPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize, xAxisLength) {

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

