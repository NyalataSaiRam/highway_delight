import { model, Schema } from "mongoose";

const timeSlotSchema = new Schema({
  time: { type: String, required: true }, // "09:00 AM"
  count: { type: Number, required: true }, // available slots
});

const dateSlotSchema = new Schema({
  date: { type: String, required: true }, // "2025-10-30"
  times: [timeSlotSchema],
});

const ExperienceSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dates: [dateSlotSchema],
});

const Experience = model("experience", ExperienceSchema);

export default Experience;
