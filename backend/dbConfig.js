import mongoose from "mongoose";

async function connToDB(url) {
  try {
    await mongoose.connect(url);
    console.log(`mongodb connected`);
  } catch (error) {
    console.error(error);
  }
}

export default connToDB;
