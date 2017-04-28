const mysql = require('mysql');
const aws = require('aws-sdk') ;

exports.handler = (event, context, callback) => {
  const signer = new aws.RDS.Signer({
    username: process.env.RdsIamUser,
    hostname: process.env.RdsEndpointAddress,
    port: 3306
  });
  signer.getAuthToken((err, token) => {
    if (err) callback(err);
    const conn = mysql.createConnection({
      host: process.env.RdsEndpointAddress,
      user: process.env.MasterUsername,
      password: token,
      database: 'mysql',
      ssl: 'Amazon RDS'
    });
    conn.connect();
    conn.query('SELECT * FROM `user`', (err, results) => {
      if (err) callback(err);
      console.log(results);
    });
    conn.end();
  });
  callback(null, 'success');
};
