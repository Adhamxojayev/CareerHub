import { Job } from "../models/index.js";
import { Op } from "sequelize";
import { IdSchema, JobSchema } from "../utils/joi.js";

const GET = async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'employerId'] }
    });
    res.status(200).json(jobs);
  } catch (error) {
    return next(error);
  }
};

const GET_FILTER = async (req, res, next) => {
  try {

    const { title='', minSalary, maxSalary } = req.query;

    const jobs = await Job.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
        salary: {
          [Op.gte]: minSalary,
          [Op.lte]: maxSalary,
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "employerId"] },
    });

    res.status(200).json(jobs);
  } catch (error) {
    return next(error);
  }
};

const GET_BYID = async (req, res, next) => {
  try {
    const { error } = IdSchema.validate(req.params);
    if (error) {
      return res
        .status(400)
        .json({ error: "Bad Request", message: error.message });
    }

    const { id } = req.params;
    const job = await Job.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt", "employerId"] },
    });

    if (!job) {
      throw new Error("job not found");
    }

    res.status(200).json(job);
  } catch (error) {
    return next(error);
  }
};

const POST = async (req, res, next) => {
  try {
    const { error } = JobSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: "Bad Request", message: error.message });
    }

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
  GET_BYID,
  GET_FILTER
};

