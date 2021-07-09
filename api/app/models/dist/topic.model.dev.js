"use strict";

var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String
  },
  "public": {
    type: Boolean,
    "default": false
  },
  author: {
    _id: {
      type: mongoose.Types.ObjectId
    },
    name: {
      type: String
    }
  },
  showAuthor: {
    type: Boolean,
    "default": false
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
    ref: 'User',
    unique: false
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
topicSchema.index({
  title: 1,
  user: 1
}, {
  unique: true
});
module.exports = mongoose.model('Topic', topicSchema);