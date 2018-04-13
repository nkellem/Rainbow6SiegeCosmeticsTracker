// Pulls in required dependencies
const models = require('../models');
const url = require('url');
const query = require('querystring');

// Loads Weapon objct from the models module
const { Weapon } = models;

// Renders the home page
const operatorsPage = (req, res) => {
  res.render('home');
};

// Creates a new document in the DB to store data about a specific Operator's gun
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

  weaponPromise.then(() => response.json({ message: 'Skin added successfully' }));

  weaponPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return response.status(400).json({ error: 'Weapon already exists' });
    }

    return response.status(400).json({ error: 'an error ocurred' });
  });

  return weaponPromise;
};

// Either creates or updates a document for a specific Operator's gun
const addWeaponSkin = (req, res) => {
  const request = req;
  const response = res;

  const id = request.session.account._id;
  const { opName } = request.body;
  const { weaponName } = request.body;

  return Weapon.WeaponModel.findWeaponByOwner(id, opName, weaponName, (err, docs) => {
    if (!docs || err) {
      createWeaponSkin(request, response);
    } else {
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

        return response.status(200).json({ message: 'Updated successfully' });
      });
    }
  });
};

// Queries the DB and returns the skins for a specific Operator's gun
const getWeaponSkins = (req, res) => {
  const request = req;
  const response = res;
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  const id = request.session.account._id;

  return Weapon.WeaponModel.findWeaponsByOwner(id, params.opName, (err, docs) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ error: 'An internal server error occurred' });
    }

    return res.status(200).json({ weapons: docs });
  });
};

// Exports methods for the module so they can be used by other files
module.exports = {
  operatorsPage,
  addWeaponSkin,
  getWeaponSkins,
};
