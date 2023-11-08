'use strict';

const response = require('../utils/response');

exports.index = (req, res) => {
    response.ok("Success", res)
};