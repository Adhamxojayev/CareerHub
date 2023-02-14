import { Application } from "../models/index.js";

const GET = async (req, res, next) => {
  try {
    const application = await Application.findAll();

    res.status(200).json(application);
  } catch (error) {
    return next(error);
  }
};

const POST = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    if(role === 'worker'){
      const { jobId } = req.body;
      const application = await Application.create({workerId: id, jobId});

      res.status(200).json(application);
    }else{
      throw new Error("You are not eligible to apply");
    }
  } catch (error) {
    return next(error);
  }
};

export default {
  GET,
  POST
}
