const mysql = require('mysql')
console.log(process.env)
let db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: process.env.PORT,
    database: 'komunal'
})

db.connect(function (err) {
    if (err) throw err
    else {
        console.log("Database Connected")
    }
})

module.exports = db