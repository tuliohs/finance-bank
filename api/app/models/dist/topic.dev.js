"use strict";

var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String //required: true

  },
  imageName: {
    type: String,
    "default": "none"
  },
  imageData: {
    type: String
  },
  imagePath: {
    type: String
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User' //required: true

  },
  //categories: [
  //    {
  //        type: mongoose.Types.ObjectId,
  //        ref: 'Category',
  //        //   require:true
  //    }
  //],
  criadoEm: {
    type: Date,
    required: true,
    "default": Date.now
  },
  atualizadoEm: {
    type: Date,
    required: true,
    "default": Date.now
  }
});
module.exports = mongoose.model('Topic', topicSchema);