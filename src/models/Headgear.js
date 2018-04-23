// Pulls in the necessary dependencies
const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

// Instantiates the HeadgearModel
let HeadgearModel = {};

// Properties so we can keep track of headgear by owner
const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim(0);

// Defines the Schema for Headgear documents to be saved in the DB
const HeadgearSchema = new mongoose.Schema({
  opName: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  headgear: {
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
HeadgearSchema.statics.toAPI = doc => ({
  opName: doc.opName,
  headgear: doc.headgear,
});

// Queries the database to return all headgear for an Operator saved by a user
HeadgearSchema.statics.findByOwner = (ownerId, opName, callback) => {
  const search = {
    owner: convertId(ownerId),
    opName,
  };

  return HeadgearModel.findOne(search).select('headgear').exec(callback);
};

// Redefines the HeadgearModel object to include the Schema
HeadgearModel = mongoose.model('Headgear', HeadgearSchema);

module.exports = {
  HeadgearModel,
  HeadgearSchema,
};
