CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  category_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(id)
);

ALTER TABLE IF EXISTS contacts
  DROP CONSTRAINT contacts_category_id_fkey;

ALTER TABLE IF EXISTS contacts
  ADD CONSTRAINT category_fk FOREIGN KEY(category_id) REFERENCES categories(id)
  ON DELETE SET NULL;
