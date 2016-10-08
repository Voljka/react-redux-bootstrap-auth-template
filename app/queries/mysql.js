var mysql = require('mysql');
var dbConfig = require('../../config/database.json');
var pool = mysql.createPool( dbConfig );

exports.query = function (sql, props) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {

            connection.query(
                sql, props,
                function (err, res) {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
            connection.release();
        });
    });
};