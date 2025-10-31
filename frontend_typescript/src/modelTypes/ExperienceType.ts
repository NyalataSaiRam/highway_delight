export type TimeSlotType = {
  _id: string;
  time: string; // "09:00 AM"
  count: number; // available slots
};

export type DateSlotType = {
  _id: string;
  date: string;
  times: [TimeSlotType];
};

export type ExperienceType = {
  _id: string;
  imageUrl: string;
  title: string;
  location: string;
  place: string;
  description: string;
  price: number;
  dates: [DateSlotType];
};
