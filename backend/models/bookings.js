import mongoose, { model, Schema } from "mongoose";

const BookingSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  experience_id: { type: Schema.Types.ObjectId, required: true },
  date: { type: String, required: true },
  dateId: { type: Schema.Types.ObjectId, required: true },
  time: { type: String, required: true },
  timeId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  afterDiscount: { type: Number, required: true },
  promoCodeApplied: { type: Boolean },
});

const Booking = model("booking", BookingSchema);

export default Booking;
