'use strict';

const base = require('../controllers/schedule.controller');

module.exports = function(app) {
    app.route('/').get(base.index);
};