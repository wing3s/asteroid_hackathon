var planetSize = 26,
    constRotationSpeed = 2000,
    //xAxisLength = 200,
    //yAxisLength = 120,
    canvasWidth = canvas.getWidth(),
    canvasHeight = canvas.getHeight(),
    maxARadius = 5,
    maxBRadius = 5,
    maxMagnitude = 33;

function addAsteroidEarthView(index, xAxisLength, yAxisLength, orbit_type, magnitude, period, planetName) {

	opacity = magnitude /maxMagnitude;
  var orbit_img_id = orbit_type * (Math.floor(Math.random() * 4) + 1);
  var url = '/images/satellite/asteroid/png/asteroid-'+orbit_img_id+'.png';

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
    var planet = createEarthPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize, xAxisLength);
     //planets.push(planet);

		var planetLabel = new fabric.Text('', {
      fill: '#fff',
      fontSize: 16,
      fontFamily: 'Open Sans',
      textBackgroundColor: '#002244',
      name: planet.name
    });

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

function createEarthPlanet(index, planetsImg, tempCanvas, opacity, planetName, planetSize, xAxisLength) {

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

