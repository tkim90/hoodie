-- psql -U $ROOT_USER -a -f db/postgres/schema.sql

CREATE DATABASE hoodie;

\connect hoodie;

CREATE TABLE markers (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
  city VARCHAR(40) NOT NULL,
  coordinates VARCHAR(50) NOT NULL,
  marker_text VARCHAR(200) NOT NULL,
  group_id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
  FOREIGN KEY (group_id) REFERENCES restaurants (id) MATCH FULL,
  -- created_at
  -- updated_at
  UNIQUE (id)
);

CREATE TABLE groups (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(40) NOT NULL,
  city VARCHAR(40) NOT NULL
);

-- ALTER TABLE reservations ADD CONSTRAINT fk_reservations FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) MATCH FULL;