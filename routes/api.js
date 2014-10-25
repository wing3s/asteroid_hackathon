module.exports = function(app) {

    app.get('/api/asteroids/:zone/:magnitude/:name', function(req,res) {
        var zone = req.params.zone;
        var magnitude = req.params.magnitude;
        var name = req.params.name;
        var zone_query = zone === '0' ? "" : " AND zones = "+zone;
        var magnitude_query = magnitude === '0' ? "" : " AND absolute_magnitude >= " + magnitude;
        var name_query = name === '0' ? "" : " AND name IS NOT NULL";
        var sql = "SELECT id, object_type, radius_a, radius_b, name, absolute_magnitude " +
                    "FROM asteroids " +
                    "WHERE id > 0 " +
                    zone_query + magnitude_query + name_query;
        var query = client.query(sql, function(err, results) {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            res.send(results);
        });
    });
};