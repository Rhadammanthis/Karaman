'use strict';

import mongoose from 'mongoose';

var PatientSchema = new mongoose.Schema({
  name: String,
  parentalLastName: String,
  maternalLastName: String,
  sex: String,
  dateOfBirth: Date,
  fatherName: String,
  fatherAge: Number,
  fatherBloodType: String,
  motherName: String,
  motherAge: String,
  motherBloodType: String,
  address: String,
  neighborhood: String,
  municipality: String,
  state: String,
  postalCode: String
});

export default mongoose.model('Patient', PatientSchema);
