const mongoose = require("mongoose");
const slugify = require("slugify");
var geocoder = require("../utils/geocoder.js");

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    unique: false,
    trim: true,
    maxLength: [50, "Name cannot be more than 50 chars"],
    index: true,
  },
  slug: String,
  amount: {
    type: Number,
    required: [true, "Please add an amount"],
    unique: false,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
    unique: false,
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
});

// Create expense slug from the name
ExpenseSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  console.log("Slugify ran", this.title);
  next();
});

// Geocode & create location field
ExpenseSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  console.log("test");
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  //DO NOT SAVE ADDRESS
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Expense", ExpenseSchema);
