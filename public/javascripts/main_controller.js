var canvas = new fabric.Canvas('demo');
var orbit_type_count = 10;
var neo_delay = 2; //sec
var orbits_delay = 3; // sec
var orbit_asteroids_delay_max = 100; //  ms
var orbit_asteroids_timeout = false;
var orbits_timeout = false;
var neo_timeout = false;

$(document).ready(function() {
    $("#home_button").click(function() {
        location.reload();
    });


    // Solar System View
    $("#solarsystem_button").click(function() {
        $('body').css('background-image', 'url("/images/backgroung.png")');
        clearTimeout(neo_timeout);
        clearCanvasObjs();
        addSolarPlanets();
        (function orbits_loop(i) {
            orbits_timeout = setTimeout(function() {
                $.ajax({
                    url: '/api/asteroids?orbit_type='+i,
                    dataType: "json",
                    success: function(results) {
                        (function orbit_asteroids_loop(j) {
                            orbit_asteroids_timeout = setTimeout(function() {
                                var asteroid = results[j];
                                addAsteroid(asteroid.id, asteroid.orbit_type, asteroid.period, asteroid.radius_a, asteroid.radius_b, asteroid.name, asteroid.magnitude, asteroid.orbit_type, 'white', 'blue', 1000, 0);

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

        $('body').css('background-image', 'url("/images/asteroid-20.png")');
        $('body').css('background-repeat','no-repeat;');
        $.ajax({
            url: '/api/neo',
            dataType: "json",
            success: function(results) {
                clearCanvasObjs();
                (function neo_loop(i) {
                    neo_timeout = setTimeout(function() {
                        neo_obj = results[i];
                        var turb = Math.random()*0.6;
                        addAsteroidEarthView(neo_obj.id, 1.7 + turb , 3.5 + turb, neo_obj.orbit_type, neo_obj.magnitude, neo_obj.period, neo_obj.name);

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
}
