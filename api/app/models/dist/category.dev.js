"use strict";

var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topic: {
    type: mongoose.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  level: {
    type: String
  },
  items: [{
    id: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    imageName: {
      type: String,
      "default": "none"
    },
    imageData: {
      type: String
    },
    revisions: [{
      note: {
        type: String,
        required: true
      },
      revisionDate: {
        type: Date
      },
      createDate: {
        type: Date,
        "default": Date.now
      }
    }],
    iconName: {
      type: String
    }
  }],
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
module.exports = mongoose.model('Category', categorySchema);