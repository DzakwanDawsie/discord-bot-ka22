'use strict';

const success = (res) =>  {
  const data = {
      success: true,
      data: data
  };

  res.json(data);
  res.end();
}

const failed = (message, res) =>  {
  const data = {
      success: false,
      message: data
  };

  res.json(data);
  res.end();
}

module.exports = {
  success
}