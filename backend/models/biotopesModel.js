const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const biotopesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    biotope: {
      type: String,
      enum: ["ocean", "forest", "desert", "jungle"],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Biotopes", biotopesSchema);
