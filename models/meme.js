const mongoose = require('mongoose');
const schema = mongoose.Schema;
const memeSchema = new schema(
  {
    category: {
      type: String,
      default: ''
    },
    tags: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  }
);
module.exports = mongoose.model("meme",memeSchema);