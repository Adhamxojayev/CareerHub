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
    const { id, role } = req.user;
    if(role === 'employer'){
      req.body.employerId = id;
      const job = await Job.create(req.body);

      return res.status(200).json(job);
    }else{
      throw new Error("You do not have the required role to add a job")
    }
  } catch (error) {
    return next(error);
  }
};

export default {
  GET,
  POST,
};

