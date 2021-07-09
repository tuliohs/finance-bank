"use strict";

var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true
  },
  topic: {
    type: mongoose.Types.ObjectId,
    ref: 'Topic',
    required: true,
    unique: false
  },
  items: [{
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
    level: {
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
      association: {
        type: String
      },
      link: {
        type: String
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
}); //create index in schema level

categorySchema.index({
  title: 1,
  topic: 1
}, {
  unique: true
});
module.exports = mongoose.model('Category', categorySchema);