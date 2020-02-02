-- psql -U $ROOT_USER -a -f db/postgres/schema.sql

DROP DATABASE IF EXISTS hoodie;
CREATE DATABASE hoodie;

\connect hoodie;

CREATE TABLE city (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(40) NOT NULL,
  coordinates VARCHAR(50) NOT NULL,
  UNIQUE (id)
);

CREATE TABLE marker_group (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
  city_id INTEGER REFERENCES city(id),
  name VARCHAR(60) NOT NULL,
  url VARCHAR(60) NOT NULL,
  UNIQUE (id)
);

CREATE TABLE marker (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
  marker_group_id INTEGER REFERENCES marker_group(id),
  coordinates VARCHAR(50) NOT NULL,
  marker_text VARCHAR(200) NOT NULL,
  UNIQUE (id)
);
