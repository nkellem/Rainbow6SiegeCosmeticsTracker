// Pulls in required dependencies
const models = require('../models');

// Loads Charm object from the Models module
const { Charm } = models;

// Creates a new document in the DB to store charms
const createCharm = (req, res) => {
  const request = req;
  const response = res;

  if (!request.body.charmName) {
    return response.status(400).json({ error: 'Missing charm name' });
  }

  const charmData = {
    charmName: [request.body.charmName],
  };

  const newCharm = new Charm.CharmModel(charmData);

  const charmPromise = newCharm.save();

  charmPromise.then(() => response.json({ message: 'Charm added successfully' }));

  charmPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return response.status(400).json({ error: 'Charm already exists' });
    }

    return response.status(400).json({ error: 'an error ocurred' });
  });

  return charmPromise;
};

// Either creates or updates charm list
const addCharm = (req, res) => {
  const request = req;
  const response = res;

  const id = request.session.account._id;

  return Charm.CharmModel.findByOwner(id, (err, docs) => {
    if (!docs || err) {
      createCharm(request, response);
    } else {
      const search = {
        owner: request.session.account._id,
      };

      const newCharms = docs.charmNames;
      newCharms.push(request.body.charmName);

      Charm.CharmModel.update(search, { $set: { charmNames: newCharms } }, {}, (error) => {
        if (error) {
          return response.status(500).json({ error: 'Unable to update DB' });
        }

        return response.status(200).json({ message: 'Updated successfully' });
      });
    }
  });
};

// Queries the DB and returns the skins for a specific Operator's gun
const getCharms = (req, res) => {
  const request = req;
  const response = res;

  const id = request.session.account._id;

  return Charm.CharmModel.findByOwner(id, (err, docs) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ error: 'An internal server error occurred' });
    }

    return res.status(200).json({ charms: docs });
  });
};

// Exports methods for the module so they can be used by other files
module.exports = {
  addCharm,
  getCharms,
};
