CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgrouting;

CREATE TABLE IF NOT EXISTS coordinates (
    id BIGSERIAL PRIMARY KEY,
    coordinates GEOMETRY(Point, 4326) NOT NULL,
    label VARCHAR(255) NOT NULL,
    description VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_coordinates_geom ON coordinates USING GIST (coordinates);

/*CREATE TABLE track_point (
  id BIGSERIAL PRIMARY KEY,
  lat DOUBLE PRECISION NOT NULL,
  lon DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE track_segment (
  id BIGSERIAL PRIMARY KEY,
  from_point_id BIGINT REFERENCES track_point(id),
  to_point_id BIGINT REFERENCES track_point(id),
  geom geometry(LineString, 4326),
  cost DOUBLE PRECISION,
  created_at TIMESTAMP DEFAULT now()
);*/


-- Points Of Interest (POI)
INSERT INTO coordinates (coordinates, label, description) VALUES
    (ST_SetSRID(ST_MakePoint(7.2708, 43.6961), 4326), 'Place Masséna', 'Place du centre ville'),
    (ST_SetSRID(ST_MakePoint(7.2853, 43.7047), 4326), 'Maison', 'Mon domicile à Nice'),
    (ST_SetSRID(ST_MakePoint(7.2847, 43.6988), 4326), 'Arturo', 'Café du samedi matin'),
    (ST_SetSRID(ST_MakePoint(7.2620, 43.7045), 4326), 'Gare Nice-Ville', 'Gare du centre ville de Nice'),
    (ST_SetSRID(ST_MakePoint(7.2109, 43.6654), 4326), 'Aéroport T1', 'Aéroport de Nice Terminal 1');
    
