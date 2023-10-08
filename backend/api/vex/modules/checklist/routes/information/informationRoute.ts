import express from "express";
import {
  deleteAllInformation,
  deleteInformationById,
  getInformation,
  getInformationById,
  saveInformation,
} from "../../controllers/driver/information/informationController";

const informationRoute = express.Router();

informationRoute
  .route("/org/driver/information/save")
  .post(async (req, res) => {
    saveInformation(req, res);
  });

informationRoute
  .route("/org/driver/information/get-all")
  .get(async (req, res) => {
    getInformation(req, res);
  });

informationRoute
  .route("/org/driver/information/get-by-id/:id")
  .get(async (req, res) => {
    getInformationById(req, res);
  });

informationRoute
  .route("/org/driver/information/delete-all")
  .delete(async (req, res) => {
    deleteAllInformation(req, res);
  });

informationRoute
  .route("/org/driver/information/delete-by-id/:id")
  .delete(async (req, res) => {
    deleteInformationById(req, res);
  });

export { informationRoute };
