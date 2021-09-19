// const mysql = require('mysql')
require('dotenv').config()
const fs = require('fs');
const util = require('util');
const csv = require('csv-parser')
// let dataJson = require("./RecruitmentTestData.json")
let dataJson = require('./data.json')

var mysql = require('mysql');
var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: process.env.PORT
});
var conWithDatabase = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: process.env.PORT,
    database: process.env.MYSQL_DATABASE
});
con.connect(async function (err) {
    if (err) throw err
    else {
        let csvData = []
        let data = fs.createReadStream('RecruitmentTestData.csv')
        data.pipe(csv())
            .on('data', (data) => csvData.push(data))
            .on('end', () => {


                // console.log(csvData, "dataa")
                let createDatabase =
                    `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`
                let createTable = `CREATE TABLE IF NOT EXISTS borrowers (Id varchar(200) NOT NULL, CustomerName varchar(200)  NULL, DatePurchase varchar(200)  NULL, Amount_due__c decimal(15,2) NOT NULL, Discount__c decimal(15,2) NOT NULL, GST__c decimal(15,2) NOT NULL, CreatedDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, LastModifiedDate timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, deleted_at timestamp NULL DEFAULT NULL, PRIMARY KEY (id))`
                con.query(createDatabase, async (err, result) => {
                    console.log('create database success')
                    conWithDatabase.connect(function (err) {
                        if (err) throw err
                        else {
                            conWithDatabase.query(createTable, async (err, result) => {
                                // console.log(result)
                                // console.log(dataJson)
                                let mix = dataJson.concat(csvData)
                                const keys = ['Id'],
                                    duplikasi = mix.filter(
                                        (s => o =>
                                            (k => !s.has(k) && s.add(k))
                                                (keys.map(k => o[k]).join('|'))
                                        )
                                            (new Set)
                                    );
                                let finalData = []
                                duplikasi.forEach(element => {
                                    let newDate = element
                                    newDate.CreatedDate = new Date(String(element.CreatedDate))
                                    newDate.LastModifiedDate = new Date(element.LastModifiedDate)
                                    // console.log(element.CreatedDate, "date")
                                    // if (newDate.CreatedDate == "Invalid Date") {
                                    //     console.log(element, "test")
                                    // }
                                    // else {

                                    // }
                                    finalData.push(newDate)

                                });

                                // console.log(finalData)
                                let stringData = ""
                                for (let property1 in finalData[0]) {
                                    // console.log(property)
                                    stringData += property1 + ", "
                                }
                                // console.log(finalData[0], "test")
                                console.log(stringData.slice(0, stringData.length - 2))

                                var sql = `INSERT INTO borrowers (${stringData.slice(0, stringData.length - 2)}) VALUES ?`
                                let values = []
                                finalData.forEach(element2 => {
                                    let stringObject = []
                                    for (let property in element2) {
                                        // console.log(element2[property])

                                        stringObject.push(element2[property])
                                    }
                                    values.push(stringObject)
                                });
                                // console.log(sql)
                                // console.log(values)
                                // fs.writeFileSync("tes" + '.json', JSON.stringify(finalData), 'utf8');

                                conWithDatabase.query(sql, [values], function (err, results) {
                                    if (err) {
                                        // err.object = dataJson
                                        console.log(err.message)
                                        console.log('error')
                                    }
                                    else {
                                        console.log(results)
                                        let createTableUser = "CREATE TABLE IF NOT EXISTS users (Id varchar(200) NOT NULL, Email varchar(200)  NULL , Password varchar(200)  NULL, CreatedDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, LastModifiedDate timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, deleted_at timestamp NULL DEFAULT NULL, PRIMARY KEY (id))"
                                        conWithDatabase.query(createTableUser, async (err, result) => {
                                            if (err) {
                                                // err.object = dataJson
                                                console.log(err.message)
                                                console.log('error')
                                            }
                                            else {
                                                console.log(result)

                                            }
                                        });

                                    }



                                })
                            });


                        }
                        console.log('Connected to the database')
                    });


                });
            })
        // console.log(hasil)

    }
    // console.log('Connected to the database')
});
