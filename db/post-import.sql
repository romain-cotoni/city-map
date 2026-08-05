-- SQL EXECUTED AFTER CREATION OF THE DB IN DOCKER CONTAINER

ALTER TABLE ways
  ADD COLUMN cost_car DOUBLE PRECISION,
  ADD COLUMN reverse_cost_car DOUBLE PRECISION,
  ADD COLUMN cost_bike DOUBLE PRECISION,
  ADD COLUMN reverse_cost_bike DOUBLE PRECISION,
  ADD COLUMN cost_foot DOUBLE PRECISION,
  ADD COLUMN reverse_cost_foot DOUBLE PRECISION,
  ADD COLUMN cost_bike_path DOUBLE PRECISION,
  ADD COLUMN reverse_cost_bike_path DOUBLE PRECISION;


-- Voiture : voies carrossables uniquement, respecte le sens unique
UPDATE ways SET
  cost_car = CASE
    WHEN tag_id NOT IN (100,101,102,104,106,108,109,110,111,112,123,124,125) THEN -1
    WHEN one_way = -1 THEN -1   -- REVERSED : sens forward interdit
    ELSE length_m / 13.9
  END,
  reverse_cost_car = CASE
    WHEN tag_id NOT IN (100,101,102,104,106,108,109,110,111,112,123,124,125) THEN -1
    WHEN one_way = 1 THEN -1    -- YES : sens reverse interdit
    ELSE length_m / 13.9
  END;


-- Vélo priorisant les pistes cyclables : Pénalité x4 sur tout ce qui n'est pas une vraie piste cyclable (tag 118)
UPDATE ways SET
  cost_bike_path = CASE
    WHEN tag_id IN (101,102,104,105,122) THEN -1 -- exclu : autoroute, escaliers
    WHEN tag_id = 118 THEN length_m / 4.2        -- piste cyclable : coût normal
    ELSE (length_m / 4.2) * 4                    -- reste : pénalité x4
  END,
  reverse_cost_bike_path = CASE
    WHEN tag_id IN (101,102,104,105,122) THEN -1
    WHEN tag_id = 118 THEN length_m / 4.2
    ELSE (length_m / 4.2) * 4
  END;
  
-- Vélo : tout sauf autoroute et escaliers
UPDATE ways SET
  cost_bike = CASE WHEN tag_id NOT IN (101,102,104,105,122)
    THEN length_m / 4.2 ELSE -1 END,
  reverse_cost_bike = CASE WHEN tag_id NOT IN (101,102,104,105,122)
    THEN length_m / 4.2 ELSE -1 END;


-- Piéton : tout sauf autoroute
UPDATE ways SET
  cost_foot = CASE WHEN tag_id NOT IN (101,102,104,105)
    THEN length_m / 1.4 ELSE -1 END,
  reverse_cost_foot = CASE WHEN tag_id NOT IN (101,102,104,105)
    THEN length_m / 1.4 ELSE -1 END;


