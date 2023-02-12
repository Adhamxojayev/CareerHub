import { Employer } from "../models/index.js";

const GET = async (req, res) => {
  try {
    const employer = await Employer.findAll();
    res.status(200).json(employer);
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  GET,
};
