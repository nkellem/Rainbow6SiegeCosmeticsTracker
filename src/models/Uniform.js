// Pulls in the necessary dependencies
const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

// Instantiates the UniformModel
let UniformModel = {};

// Properties so we can keep track of uniform by owner
const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim(0);

// Defines the Schema for Uniform documents to be saved in the DB
const UniformSchema = new mongoose.Schema({
  opName: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  uniforms: {
    type: [String],
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

// Formats the data returned from a DB query
UniformSchema.statics.toAPI = doc => ({
  opName: doc.opName,
  uniforms: doc.uniforms,
});

// Queries the database to return all uniforms for an Operator saved by a user
UniformSchema.statics.findByOwner = (ownerId, opName, callback) => {
  const search = {
    owner: convertId(ownerId),
    opName,
  };

  return UniformModel.findOne(search).select('uniforms').exec(callback);
};

// Redefines the UniformModel object to include the Schema
UniformModel = mongoose.model('Uniform', UniformSchema);

module.exports = {
  UniformModel,
  UniformSchema,
};
