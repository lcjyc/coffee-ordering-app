import mongoose from "mongoose";

const DrinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    temp: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Drink || mongoose.model("Drink", DrinkSchema);
