var mysql = require('mysql');
var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port:process.env.PORT,
  database: process.env.MYSQL_DATABASE
});
  con.connect(function (err){
      if(err) throw err
      else{
        console.log('Connected to the database')
      };
  });
  module.exports = con;
