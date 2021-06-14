const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  created_by: {
    ref: 'user',
    type: Schema.Types.ObjectId,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  authors: {
    type: [String],
  },
  duration: {
    required: true,
    type: Number,
  },
  editable: {
    type: Boolean,
  },
});

module.exports = mongoose.model('course', CourseSchema);
