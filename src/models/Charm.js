// Pulls in required dependencies
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Instantiates the CharmModel
let CharmModel = {};

// Properties so we can keep track of weapon by owner
const convertId = mongoose.Types.ObjectId;

const CharmSchema = new mongoose.Schema({
  charmNames: {
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
CharmSchema.statics.toAPI = doc => ({
  charmNames: doc.charmNames,
});

// Queries the DB and returns the charms for a user
CharmSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CharmModel.findOne(search).select('charmNames').exec(callback);
};

// Redefines the CharmModel object to include the schema
CharmModel = mongoose.model('Charm', CharmSchema);

// exports the necessary functions
module.exports = {
  CharmModel,
  CharmSchema,
};
