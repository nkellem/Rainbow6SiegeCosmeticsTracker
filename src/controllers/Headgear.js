// Pulls in required dependencies
const models = require('../models');
const url = require('url');
const query = require('querystring');

// Loads Headgear object from the Models module
const { Headgear } = models;

// Creates a new document in the DB to store headgear
const createHeadgear = (req, res) => {
  const request = req;
  const response = res;

  if (!request.body.headgearName || !request.body.opName) {
    return response.status(400).json({ error: 'Missing Headgear name' });
  }

  const headgearData = {
    headgear: [request.body.headgearName],
    opName: request.body.opName,
    owner: request.session.account._id,
  };

  const newHeadgear = new Headgear.HeadgearModel(headgearData);

  const headgearPromise = newHeadgear.save();

  headgearPromise.then(() => response.json({ message: 'Headgear added successfully' }));

  headgearPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return response.status(400).json({ error: 'Headgear already exists' });
    }

    return response.status(400).json({ error: 'an error ocurred' });
  });

  return headgearPromise;
};

// Either creates or updates Headgear list
const addHeadgear = (req, res) => {
  const request = req;
  const response = res;

  if (!request.session.account.premium) {
    return response.status(403).json({ error: 'Must be a premium member to save headgear' });
  }

  const id = request.session.account._id;
  const { opName } = request.body;

  return Headgear.HeadgearModel.findByOwner(id, opName, (err, docs) => {
    if (!docs || err) {
      createHeadgear(request, response);
    } else {
      const search = {
        owner: request.session.account._id,
        opName: request.body.opName,
      };

      const newHeadgear = docs.headgear;
      newHeadgear.push(request.body.headgearName);

      Headgear.HeadgearModel.update(search, { $set: { headgear: newHeadgear } }, {}, (error) => {
        if (error) {
          return response.status(500).json({ error: 'Unable to update DB' });
        }

        return response.status(200).json({ message: 'Updated successfully' });
      });
    }
  });
};

// Queries the DB and returns the headgear for a specific Operator
const getHeadgear = (req, res) => {
  const request = req;
  const response = res;
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  const id = request.session.account._id;

  return Headgear.HeadgearModel.findByOwner(id, params.opName, (err, docs) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ error: 'An internal server error occurred' });
    }

    return res.status(200).json({ headgear: docs });
  });
};

// Exports methods for the module so they can be used by other files
module.exports = {
  addHeadgear,
  getHeadgear,
};
