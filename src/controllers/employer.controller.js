import { Application, Employer, Job, Worker } from "../models/index.js";
import jwt from "../utils/jwt.js";
import { EmployerSchema, IdSchema } from "../utils/joi.js";

const GET = async (req, res, next) => {
  try {
    const employer = await Employer.findAll({
      include: [
        {
          model: Job,
          attributes: { exclude: ["createdAt", "updatedAt", "employerId"] },
        },
      ],
      attributes: ["id", "name", "email"],
    });
    res.status(200).json(employer);
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
    const employer = await Employer.findOne({
      where: { id },
      include: [
        {
          model: Job,
          attributes: { exclude: ["createdAt", "updatedAt", "employerId"] },
        },
      ],
      attributes: ["id", "name", "email"],
    });
    if (!employer) {
      throw new Error("employer not found");
    }
    res.status(200).json(employer);
  } catch (error) {
    return next(error);
  }
};

const REGISTER = async (req, res, next) => {
  try {
    const { error } = EmployerSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: "Bad Request", message: error.message });
    }

    const employer = await Employer.create(req.body);

    res.status(201).json({
      status: 201,
      message: "you are registered",
      access_token: jwt.sign({ id: employer.id, role: "employer" }),
    });
  } catch (error) {
    return next(error);
  }
};

const LOGIN = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const employer = await Employer.findOne({
      where: { name },
    });
    let isEmployer = employer?.validPassword(password);

    if (!isEmployer) {
      throw new Error("wrong name or password");
    }

    res.status(200).json({
      status: 200,
      message: "You have successfully logged in",
      access_token: jwt.sign({ id: employer.id, role: "employer" }),
    });
  } catch (error) {
    return next(error);
  }
};

const GET_PROFILE = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    if (role === "employer") {
      const employer = await Job.findAll({
        include: [
          {
            model: Application,
            include: [
              {
                model: Worker,
                attributes: { exclude: ["createdAt", "updatedAt", "password"] },
              },
            ],
            attributes: { exclude: ["updatedAt", "workerId", "jobId"] },
          },
        ],
        where: { employerId: id },
        attributes: { exclude: ["employerId"] },
      });
      res.status(200).json(employer);
    } else {
      throw new Error("you are not allowed");
    }
  } catch (error) {
    return next(error);
  }
};

export default {
  GET,
  LOGIN,
  REGISTER,
  GET_BYID,
  GET_PROFILE,
};
