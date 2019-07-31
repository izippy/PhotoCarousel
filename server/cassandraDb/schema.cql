CREATE KEYSPACE IF NOT EXISTS guestly WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
use guestly;
CREATE TABLE IF NOT EXISTS photos (
  id int,
  listing_id int,
  photoUrl text,
  tinyUrl text,
  caption text,
  priority int,
  PRIMARY KEY (id)
) WITH compression = {'class': 'LZ4Compressor', 'chunk_length_in_kb': 4};

CREATE TABLE IF NOT EXISTS photosGreaterPriority (
  id uuid,
  listing_id int,
  photoUrl text,
  tinyUrl text,
  caption text,
  priority int,
  PRIMARY KEY (id, listing_id)
) WITH compression = {'class': 'LZ4Compressor', 'chunk_length_in_kb': 4};
-- CREATE INDEX IF NOT EXISTS listing_id_priority
-- ON guestly.photos ( listing_id, priority );