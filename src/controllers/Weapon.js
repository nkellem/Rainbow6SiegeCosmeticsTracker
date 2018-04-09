const models = require('../models');

const { Weapon } = models;

const operatorsPage = (req, res) => {
  res.render('home');
};

const addWeaponSkin = (req, res) => {
	
};

module.exports = {
  operatorsPage,
	addWeaponSkin,
};
