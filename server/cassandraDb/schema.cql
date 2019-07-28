CREATE KEYSPACE IF NOT EXISTS guestly WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
use guestly;
CREATE TABLE IF NOT EXISTS listings (id int, PRIMARY KEY (id)) WITH compression = {'class': 'LZ4Compressor', 'chunk_length_in_kb': 4};
