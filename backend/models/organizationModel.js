const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    biotope: {
      type: String,
      enum: ["ocean", "forest", "desert", "jungle"],
      required: true,
    },
   category: {
      type: String,
      enum: ["Coral Reef", "Fishing Scene", "Exposed Fish","Conserve Ecosystems"],
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    donateLink: {
      type: String,
      required: true,
    },
    additionalLinks: [
      {
        type: String,
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
