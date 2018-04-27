// Pulls in required dependencies
const models = require('../models');

// Loads Uniform object from the Models module
const { Uniform } = models;

// Creates a new document in the DB to store charms
const createUniform = (req, res) => {
  const request = req;
  const response = res;

  if (!request.body.uniformName || !request.body.opName) {
    return response.status(400).json({ error: 'Missing Uniform name' });
  }

  const uniformData = {
    uniforms: [request.body.uniformName],
    opName: request.body.opName,
		owner: request.session.account._id,
  };

  const newUniform = new Uniform.UniformModel(uniformData);

  const uniformPromise = newUniform.save();

  uniformPromise.then(() => response.json({ message: 'Uniform added successfully' }));

  uniformPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return response.status(400).json({ error: 'Uniform already exists' });
    }

    return response.status(400).json({ error: 'an error ocurred' });
  });

  return uniformPromise;
};

// Either creates or updates Uniform list
const addUniform = (req, res) => {
  const request = req;
  const response = res;

  const id = request.session.account._id;
  const { opName } = request.body;

  return Uniform.UniformModel.findByOwner(id, opName, (err, docs) => {
    if (!docs || err) {
      createUniform(request, response);
    } else {
      const search = {
        owner: request.session.account._id,
        opName: request.body.opName,
      };

      const newUniforms = docs.uniforms;
      newUniforms.push(request.body.uniformName);

      Uniform.UniformModel.update(search, { $set: { uniforms: newUniforms } }, {}, (error) => {
        if (error) {
          return response.status(500).json({ error: 'Unable to update DB' });
        }

        return response.status(200).json({ message: 'Updated successfully' });
      });
    }
  });
};

// Queries the DB and returns the uniforms for a specific Operator
const getUniforms = (req, res) => {
  const request = req;
  const response = res;

  const id = request.session.account._id;
  const { opName } = request.body;

  return Uniform.UniformModel.findByOwner(id, opName, (err, docs) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ error: 'An internal server error occurred' });
    }

    return res.status(200).json({ uniforms: docs });
  });
};

// Exports methods for the module so they can be used by other files
module.exports = {
  addUniform,
  getUniforms,
};
