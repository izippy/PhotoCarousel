const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['h1', 'h2'], localDataCenter: 'datacenter1', keyspace: 'guestly' });

module.exports = client;


/*
  STARTING CASSANDRA BECAUSE REASONS

  step one: /usr/libexec/java_home -V
  step two: export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_221`
  step three: java -version
  step four: cassandra
  step five: open new terminal tab -> cqlsh

  for more information:
  
  https://stackoverflow.com/questions/21964709/how-to-set-or-change-the-default-java-jdk-version-on-os-x
*/

