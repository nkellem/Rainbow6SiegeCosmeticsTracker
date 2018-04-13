// Pulls in the necessary dependencies
const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

// Instantiates the WeaponModel
let WeaponModel = {};

// Properties so we can keep track of weapon by owner
const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim(0);

// Defines the Schema for Weapon documents to be saved in the DB
const WeaponSchema = new mongoose.Schema({
  opName: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  weaponName: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  skins: {
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
WeaponSchema.statics.toAPI = doc => ({
  opName: doc.opName,
  weaponName: doc.weaponName,
  skins: doc.skins,
});

// Queries the database to return all weapons for an Operator saved by a user
WeaponSchema.statics.findByOwner = (ownerId, opName, callback) => {
  const search = {
    owner: convertId(ownerId),
    opName,
  };

  return WeaponModel.find(search).select('weaponName skins').exec(callback);
};

// Queries the database to return a specific weapon for an operator saved by a user
WeaponSchema.statics.findWeaponByOwner = (ownerId, opName, weaponName, callback) => {
  const search = {
    owner: convertId(ownerId),
    opName,
    weaponName,
  };

  return WeaponModel.findOne(search).select('skins').exec(callback);
};

//
WeaponSchema.statics.findWeaponsByOwner = (ownerId, opName, callback) => {
  const search = {
    owner: convertId(ownerId),
    opName,
  };

  return WeaponModel.find(search).select('weaponName skins').exec(callback);
};

// Redefines the WeaponModel object to include the Schema
WeaponModel = mongoose.model('Weapon', WeaponSchema);

module.exports = {
  WeaponModel,
  WeaponSchema,
};
