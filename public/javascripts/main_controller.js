var canvas = new fabric.Canvas('demo');
var orbit_type_count = 10;
var neo_delay = 2; //sec
var orbits_delay = 3; // sec
var orbit_asteroids_delay_max = 100; //  ms
var orbit_asteroids_timeout = false;
var orbits_timeout = false;
var neo_timeout = false;

$(document).ready(function() {
    // Solar System View
    $("#solarsystem_button").click(function() {

        clearTimeout(neo_timeout);
        clearCanvasObjs();
        // addPlanets(1, 60, 5, 0, 0, "Sun", 33, "white", "white", 1, 20);
        (function orbits_loop(i) {
            orbits_timeout = setTimeout(function() {
                $.ajax({
                    url: '/api/asteroids?orbit_type='+i,
                    dataType: "json",
                    success: function(results) {
                        (function orbit_asteroids_loop(j) {
                            orbit_asteroids_timeout = setTimeout(function() {
                                var asteroid = results[j];
                                addAsteroid(asteroid.id, 10, asteroid.period, asteroid.radius_a, asteroid.radius_b, asteroid.name, asteroid.magnitude, asteroid.orbit_type, 'white', 'blue', 1, 0);

                                console.log(results[j]);
                                if (++j<results.length) {
                                    orbit_asteroids_loop(j);
                                }
                            }, Math.floor(Math.random() * orbit_asteroids_delay_max) + 1);
                        })(0);
                    }
                });
                if (++i<10) {
                    orbits_loop(i);
                }
            }, orbits_delay*1000+Math.floor(Math.random() * 1000) + 1);
        })(0);
    });

    // Earth View
    $("#earth_button").click(function() {
        clearTimeout(orbit_asteroids_timeout);
        clearTimeout(orbits_timeout);
        clearCanvasObjs();
        $.ajax({
            url: '/api/neo',
            dataType: "json",
            success: function(results) {
                (function neo_loop(i) {
                    noe_timeout = setTimeout(function() {
                        console.log(results[i]);
                        if (++i<results.length) {
                            neo_loop(i);
                        }
                    }, neo_delay*1000+Math.floor(Math.random() * 1000) + 1);
                })(0);
            }
        });


    });



});




function clearCanvasObjs() {
    while(canvas.getObjects().length > 0) {
        canvas.remove(canvas.getObjects()[0]);
    }
    console.log('canva cleared');
}
