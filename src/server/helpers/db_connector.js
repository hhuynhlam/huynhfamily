'use strict';

var path = require('path');
var mysql = require('mysql');
var _config = require(path.resolve(__dirname, '../prod.config.json'));
var connection = mysql.createConnection(_config.db);

var db = {
    query: function (queryString, success, fail) {
        connection.query(queryString, function(err, rows) {
            if (err) { fail.call(this, err); }
            else { success.call(this, rows); }
        });
    }
};

module.exports = db;