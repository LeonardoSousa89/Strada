import express from "express";
import {
  deleteAllDriver,
  deleteDriverById,
  getDriver,
  getDriverById,
  saveDriver,
  updateDriver,
} from "../controllers/driver/driverController";

const driverRoute = express.Router();

driverRoute.route("/org/driver/save").post(async (req, res) => {
  saveDriver(req, res);
});

driverRoute.route("/org/driver/update/:id").put(async (req, res) => {
  updateDriver(req, res);
});

driverRoute.route("/org/driver/get-all").get(async (req, res) => {
  getDriver(req, res);
});

driverRoute.route("/org/driver/get-by-id/:id").get(async (req, res) => {
  getDriverById(req, res);
});

driverRoute.route("/org/driver/delete-all").delete(async (req, res) => {
  deleteAllDriver(req, res);
});

driverRoute.route("/org/driver/delete-by-id/:id").delete(async (req, res) => {
  deleteDriverById(req, res);
});

export { driverRoute };
