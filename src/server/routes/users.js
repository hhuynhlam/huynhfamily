'use strict';

var db = require('../helpers/db-connector');
var queryBuilder = require('../helpers/query-builder');
var express = require('express');
var router = express.Router();

//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.get('/',
function (req, res) {
    var queryString = queryBuilder(req.body);
    db.query(queryString, res, function (data) {
        var result = (data && data.rows && data.rows.length) ? data.rows[0] : [];
        return res.status(200).json( result );
    });
});


module.exports = router;
