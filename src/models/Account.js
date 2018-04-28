// Pulls in required dependencies
const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Defines the model object
let AccountModel = {};
// Defines the options for password hash/encryption generation
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

// Defines the Schema for a user account
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
	premium: {
		type: Boolean,
		default: false,
	},
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Formats the account's username and objectId
// in the DB into an object to be attached to the session
AccountSchema.statics.toAPI = doc => {
	const accountData = {
		username: doc.username,
		_id: doc._id,
	};
	
	if (doc.premium) {
		accountData.premium = doc.premium;
	} else {
		accountData.premium = false;
	}
	
	return accountData;
};

// Encrypts the user's submitted password to see if it matches the hash in the DB
const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

// Executes the callback if a user is found with the given name
AccountSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return AccountModel.findOne(search, callback);
};

// Encrypts and generates a hash based on the submitted password
AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex')));
};

// Authenticates a user's credentials with the accounts stored in the DB
AccountSchema.statics.authenticate = (username, password, callback) =>
  AccountModel.findByUsername(username, (err, doc) => {
    if (err) {
      return callback(err);
    }

    if (!doc) {
      return callback();
    }

    return validatePassword(doc, password, (result) => {
      if (result === true) {
        return callback(null, doc);
      }

      return callback();
    });
  });

// Redfines the AccountModel object
AccountModel = mongoose.model('Account', AccountSchema);

// Exports the AccountModel and AccountSchema
module.exports = {
  AccountModel,
  AccountSchema,
};
