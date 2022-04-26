let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, required: true, min: 1 },
    currentPage: {type: Number, min: 1},
    createdAt: { type: Date, default: Date.now },
    endedAt: { type: Date},
    status: { type: Number, default: 0} //0: Not started; 1: in progress; 2: blocked; 3: completed
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
BookSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  if(!this.status) {
    this.status = 0;
  }
  next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('book', BookSchema);