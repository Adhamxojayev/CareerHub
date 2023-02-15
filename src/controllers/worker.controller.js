import { Worker } from "../models/index.js";
import jwt from "../utils/jwt.js";
import { WorkerSchema, IdSchema } from "../utils/joi.js";

const GET = async (req, res, next) => {
  try {
    const workers = await Worker.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    res.status(200).json(workers);
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
    const worker = await Worker.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    if (!worker) {
      throw new Error("worker not found");
    }
    res.status(200).json(worker);
  } catch (error) {
    return next(error);
  }
};

const REGISTER = async (req, res, next) => {
  try {
    req.body.resume = req.file.filename;

    const { error } = WorkerSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: "Bad Request", message: error.message });
    }

    const worker = await Worker.create(req.body);

    res.status(201).json({
      status: 201,
      message: "you are registered",
      access_token: jwt.sign({ id: worker.id, role: "worker" }),
    });
  } catch (error) {
    return next(error);
  }
};

const LOGIN = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const worker = await Worker.findOne({
      where: { name },
    });

    let isWorker = worker?.validPassword(password);

    if (!isWorker) {
      throw new Error("wrong name or password");
    }

    res.status(200).json({
      status: 200,
      message: "You have successfully logged in",
      access_token: jwt.sign({ id: worker.id, role: "worker" }),
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  GET,
  REGISTER,
  GET_BYID,
  LOGIN,
};
