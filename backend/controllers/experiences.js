import Experience from "../models/experiences.js";

export const getExperiences = async (req, res) => {
  try {
    const list = await Experience.find({});
    return res.status(200).json({ experiences: list });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getExperienceDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    return res.status(200).json(experience);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addExperience = async (req, res) => {
  try {
    const exp = req.body;
    await Experience.insertOne(exp);
    return res.status(201).json({ message: "added successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const findExperiences = async (req, res) => {
  try {
    const { title } = req.query;
    const list = await Experience.find({});
    const filteredList = list.filter((ex) =>
      ex.title.toLowerCase().includes(title.toLowerCase())
    );
    return res.status(200).json({ experiences: filteredList });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
