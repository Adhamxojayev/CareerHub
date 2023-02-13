import { Job } from "../models/index.js";

const GET = async (req, res, next) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    return next(error);
  }
};

const POST = async (req, res, next) => {
  try {
    req.body.employerId = req.employerId;
    const job = await Job.create(req.body);
    
    res.status(200).json(job);
  } catch (error) {
    return next(error);
  }
};

export default {
  GET,
  POST,
};

