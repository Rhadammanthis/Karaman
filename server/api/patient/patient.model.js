'use strict';

import mongoose from 'mongoose';

var PatientSchema = new mongoose.Schema({
  name: String, //important
  parentalLastName: String, //important
  maternalLastName: String, //important
  sex: String, //important
  dateOfBirth: Date, //important
  fatherName: String, //important
  fatherAge: Number,
  fatherBloodType: String,
  motherName: String, //important
  motherAge: String,
  motherBloodType: String,
  street: String, //important
  neighborhood: String, 
  municipality: String,
  state: String, //important
  postalCode: String
});

export default mongoose.model('Patient', PatientSchema);
