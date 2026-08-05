package fr.dev.map.repository;

import fr.dev.map.dto.RouteDto;
import fr.dev.map.enumeration.TransportModeEnum;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RouteRepository {

    private final NamedParameterJdbcTemplate jdbc;

    public RouteRepository(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }


    /*public Long findNearestNode(double lat, double lon) {
        String sql = """
            SELECT id
            FROM ways_vertices_pgr
            ORDER BY geom <-> ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)
            LIMIT 1
            """;
        var params = new MapSqlParameterSource()
                .addValue("lat", lat)
                .addValue("lon", lon);
        return jdbc.queryForObject(sql, params, Long.class);
    }*/
    public Long findNearestNode(double lat, double lon, TransportModeEnum mode) {
        String sql = """
        SELECT v.id
        FROM ways_vertices_pgr v
        WHERE EXISTS (
            SELECT 1 FROM ways w
            WHERE (w.source = v.id OR w.target = v.id)
            AND (%s > 0 OR %s > 0)
        )
        ORDER BY v.geom <-> ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)
        LIMIT 1
        """.formatted(mode.costColumn(), mode.reverseCostColumn());
        var params = new MapSqlParameterSource()
                .addValue("lat", lat)
                .addValue("lon", lon);
        return jdbc.queryForObject(sql, params, Long.class);
    }


    public RouteDto findWay(long sourceId, long targetId, TransportModeEnum mode) {
        String edgesSql = """
            SELECT id, source, target, %s AS cost, %s AS reverse_cost
            FROM ways
            """.formatted(mode.costColumn(), mode.reverseCostColumn());

        String sql = """
            SELECT json_build_object(
                'type', 'Feature',
                'geometry', ST_AsGeoJSON(
                    ST_MakeLine(
                        CASE WHEN d.node = w.source THEN w.geom ELSE ST_Reverse(w.geom) END
                        ORDER BY d.seq
                    )
                )::json,
                'properties', json_build_object('totalCost', SUM(d.cost))
            ) AS feature
            FROM pgr_dijkstra('%s', :source, :target, true) d
            JOIN ways w ON w.id = d.edge
            WHERE d.edge != -1
            """.formatted(edgesSql);

        var params = new MapSqlParameterSource()
                .addValue("source", sourceId)
                .addValue("target", targetId);
        return jdbc.queryForObject(sql, params, (rs, i) -> new RouteDto(rs.getString("feature")));
    }



    /*public RouteDto findWay(long sourceId, long targetId, TransportModeEnum mode) {
        String sql = """
            SELECT json_build_object(
                'type', 'Feature',
                'geometry', ST_AsGeoJSON(
                    ST_MakeLine(
                        CASE WHEN d.node = w.source THEN w.geom ELSE ST_Reverse(w.geom) END
                        ORDER BY d.seq
                    )
                )::json,
                'properties', json_build_object('totalCost', SUM(d.cost))
            ) AS feature
            FROM pgr_dijkstra('SELECT id, source, target, cost, reverse_cost FROM ways', :source, :target, true) d
            JOIN ways w ON w.id = d.edge
            WHERE d.edge != -1
        """;
        var params = new MapSqlParameterSource()
                .addValue("source", sourceId)
                .addValue("target", targetId);
        return jdbc.queryForObject(sql, params, (rs, i) -> new RouteDto(rs.getString("feature")));
    }*/


}
