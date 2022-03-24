const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { collection: "contacts" }
);

const model = mongoose.model("ContactSchema", ContactSchema);

module.exports = model;
