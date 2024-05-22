// models/Course.js
"use strict";

/**
 * Listing 17.6 (p. 249)
 * 새로운 스키마와 모델의 생성
 */
const mongoose = require("mongoose"),
  courseSchema = mongoose.Schema({
    _id: {
      type: String,
      require: true,
      unique: true
    },
    title: {
      type: String,
      require: true,
      unique: true
    },
    description: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true,
      min: 0
    },
    courseImg: {
      type: String
    },
    items: {

    }
  });

// Methods
courseSchema.methods.getInfo = function() {
  return `Title: ${this.title} Description: ${this.description}`;
}

// Find smae price
courseSchema.methods.findSamePrice = function(callback) {
  return this.model("Course")
    .find({price: this.price})
    .exec();
}

// Find lower price
courseSchema.methods.findLowerPrice = function(price) {
  return this.model("Course")
    .find({price: { $lt: price }})
    .exec();
}

// Give discount (Example)
courseSchema.methods.discount = function(price) {
  const discount = this.price *((100 - price) / 100);
  return callback(null, discount); // Check
}

// Connect data
courseSchema.virtual("subscribers", {
  ref: "Subscriber",
  localField: "_id",
  foreignField: "courses"
});

// Set Object and JSON vituals
courseSchema.set("toObject", { virtuals: true });
courseSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Course", courseSchema);
