'use strict';

import mongoose from 'mongoose';

//Sub-docs
var photo = {
	file: String,
  name: String,
  notes: String
}

var room = {
  photos: [photo],
  size: Number,
  windows: Number,
  floor: Number,
  isBathroom: Boolean,
  notes: String
}

var home = {
	photos: [photo],
  name: String,
  size: Number,
  floors: Number,
  hvac: {
    heat: {
      type: String,
      enum: ['Furnace', 'Boiler', 'Heat Pump', 'Other']
    },
    ac: { 
      type: String,
      enum: ['Central Air', 'Window Unit', 'Mini Split', 'Other']
    },
    installed: Date
  },
  rooms: [room],
  bathrooms: Number
}

//Customer Schema
var CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: String,
  address: {
  	street: String,
  	city: String,
    state: String,
  	zip: String
  },
  email: { type: String, lowercase: true },
  phoneNumber: String,
  homes: [home]
});

export default mongoose.model('Customer', CustomerSchema);
