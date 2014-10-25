module.exports = function(app) {

    app.get('/api/asteroids', function(req,res) {
        var output_params = [
            'id',
            'object_type',
            '(perihelion_distance + aphelion_distance)/2 radius_a',
            'SQRT(perihelion_distance * aphelion_distance) radius_b',
            'name',
            'absolute_magnitude as magnitude',
            'period',
            'orbit_type',
        ];
        var magnitude   = req.query.magnitude;
        var orbit_type  = req.query.orbit_type;
        var needname    = req.query.needname;
        var magnitude_query = typeof magnitude !== 'undefined' ? ' AND absolute_magnitude >='+magnitude : '';
        var orbit_type_query = typeof orbit_type !== 'undefined' ? ' AND orbit_type ='+orbit_type : '';
        var needname_query = typeof needname !== 'undefined' ? ' AND name IS NOT NULL' : '';

        var sql = " SELECT  " + output_params.join(', ') +
                  " FROM mp_properties " +
                  " WHERE id > 0 " +
                    magnitude_query + orbit_type_query + needname_query +
                  " LIMIT 100";
        var query = client.query(sql, function(err, results) {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            console.log(query.sql);
            res.send(results);
        });
    });

    app.get('/api/asteroid_spec/:id', function(req, res) {
        var id = req.params.id;
        var output_params = [
            'object_type',
            'name',
            'period'
        ];
        var sql = "SELECT " + output_params.join(', ') + " FROM mp_properties WHERE id=" + id;
        client.query(sql, function(err, results) {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.send({});
            }
        });
    });

    app.get('/api/neo', function(req, res) {
        var output_params = [
            'id',
            'name',
            '(perihelion_distance + aphelion_distance)/2 radius_a',
            'SQRT(perihelion_distance * aphelion_distance) radius_b',
            'orbit_type',
            'absolute_magnitude as magnitude',
            'period',
        ];
        var sql = " SELECT " + output_params.join(', ') +
                  " FROM mp_properties WHERE neo=1 AND name IS NOT NULL AND km_neo=1" +
                  " ORDER BY perihelion_distance ASC";
        client.query(sql, function(err, results) {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            res.send(results);
        });
    });
};