const mongoose = require('mongoose');

const modelName = 'user';

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 32,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      maxlength: 60,
    },
    permissions: {
      type: Array,
      default: ['user'],
      validate: [
        (val) => val.length <= 10,
        '{PATH} count exceeds the limit of 10',
      ],
    },
    credUpdatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    collation: { locale: 'fa', strength: 1 },
  }
);

if (mongoose.modelNames().includes(modelName)) {
  mongoose.deleteModel(modelName);
}

module.exports = mongoose.model(modelName, schema);
