const models = require('../models');

const { Weapon } = models;

const operatorsPage = (req, res) => {
  res.render('home');
};

module.exports = {
  operatorsPage,
};
