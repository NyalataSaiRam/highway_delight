import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connToDB from "./dbConfig.js";
import cors from "cors";

import experiencesRouter from "./routes/experiences.js";
import Booking from "./models/bookings.js";
import mongoose from "mongoose";
import Experience from "./models/experiences.js";

const app = express();
connToDB(process.env.CONN_STR);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/experiences", experiencesRouter);

app.post("/bookings", async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const {
      experience_id,
      dateId,
      timeId,
      fullname,
      email,
      title,
      date,
      time,
      quantity,
      subtotal,
      tax,
      total,
      afterDiscount,
    } = req.body;

    if (fullname.length < 3) throw Error("Full name must be 3 letters long");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) throw Error("Invalid email id");

    const booking = await Booking.find(
      { experience_id, dateId, timeId, email },
      null,
      { session }
    );

    if (booking.length) {
      throw new Error("You have already booked this time slot.");
    }

    const result = await Experience.updateOne(
      { _id: experience_id },
      {
        $inc: {
          "dates.$[date].times.$[time].count": -quantity,
        },
      },
      {
        arrayFilters: [
          { "date._id": dateId },
          { "time._id": timeId, "time.count": { $gte: quantity } },
        ],
        session,
      }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Not enough slots available.");
    }

    const codeApplied = afterDiscount == total ? false : true;

    const bookingDocs = await Booking.create(
      [
        {
          fullname,
          email,
          title,
          experience_id,
          date,
          dateId,
          time,
          timeId,
          quantity,
          subtotal,
          tax,
          total,
          afterDiscount,
          promoCodeApplied: codeApplied,
        },
      ],
      { session }
    );

    const _id = bookingDocs[0]._id;

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ id: _id });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(401).json({ error: error.message });
  }
});

app.post("/promo/validate", async (req, res) => {
  const codes = ["SAVE10", "FLAT100"];

  const { email, code } = req.body;
  try {
    const booking = await Booking.find({ email, promoCodeApplied: true });
    if (booking.length) throw Error("Promo code allowed only once per user.");
    if (codes.includes(code)) {
      let discount = 0;
      if (code == "SAVE10") {
        discount = 10;
      }
      if (code == "FLAT100") {
        discount = 100;
      }
      return res.status(200).json({ allowDiscount: discount });
    } else {
      throw Error("Invalid promo code");
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`app started on port ${process.env.PORT}`)
);
