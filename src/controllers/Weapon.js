const models = require('../models');

const { Weapon } = models;

const operatorsPage = (req, res) => {
  res.render('home');
};

const addWeaponSkin = (req, res) => {
	const request = req;
  const response = res;

  if (!request.opName || !request.weaponName || !request.skin) {
    return response.status(400).json({ error: 'Operator Name, Weapon Name, and a Skin are all required' });
  }

  const weaponData = {
    opName: request.body.opName,
    weaponName: request.body.weaponName,
    skins: [request.body.skin],
    owner: request.session.account._id,
  };

  const newWeapon = new Weapon.WeaponModel(weaponData);

  const weaponPromise = newWeapon.save();

  //add some response here

  weaponPromise.catch(err => {
    console.log(err);
    if (err.code === 11000) {
      //TODO: Add logic to add to existing Weapon
      return res.status(400).json({ error: 'Weapon already exists' });
    }

    return res.status(400).json({ error: 'an error ocurred' });
  });

  return weaponPromise;
};

module.exports = {
  operatorsPage,
	addWeaponSkin,
};
