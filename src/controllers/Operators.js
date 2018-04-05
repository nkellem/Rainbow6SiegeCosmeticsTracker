const models = require('../models');

//const Operators = models.Operatorsl;

const operatorsPage = (req, res) => {
  res.render('home');
};

module.exports = {
  operatorsPage,
};
