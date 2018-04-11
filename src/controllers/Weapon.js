const models = require('../models');

const { Weapon } = models;

const operatorsPage = (req, res) => {
  res.render('home');
};

const createWeaponSkin = (req, res) => {
  const request = req;
  const response = res;

  if (!request.body.opName || !request.body.weaponName || !request.body.skin) {
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

  // add some response here

  weaponPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Weapon already exists' });
    }

    return res.status(400).json({ error: 'an error ocurred' });
  });

  return weaponPromise;
};

const addWeaponSkin = (req, res) => {
  const request = req;
  const response = res;

  Weapon.WeaponModel.findWeaponByOwner(request.session.account._id, request.body.opName, request.body.weaponName, (err, docs) => {
    if (!docs || err) {
			console.log('creation fired');
      createWeaponSkin(request, response);
    } else {
			console.log('update fired');
      const search = {
        owner: request.session.account._id,
        opName: request.body.opName,
        weaponName: request.body.weaponName,
      };
			
      const newSkins = docs.skins;
			newSkins.push(request.body.skin);

      Weapon.WeaponModel.update(search, { $set: { skins: newSkins } }, {}, (error) => {
        if (error) {
          return response.status(500).json({ error: 'Unable to update DB' });
        }

        return true;
      });
    }
  });
};

module.exports = {
  operatorsPage,
  addWeaponSkin,
};
