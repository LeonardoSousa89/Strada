import express from "express";
import {
  deleteAllDriverContact,
  deleteDriverContactById,
  getDriverContact,
  getDriverContactById,
  saveDriverContact,
  updateDriverContact,
} from "../controllers/driver/driverContactController";

const driverContactRoute = express.Router();

driverContactRoute.route("/org/driver/contact/save").post(async (req, res) => {
  saveDriverContact(req, res);
});

driverContactRoute
  .route("/org/driver/contact/update/:id")
  .put(async (req, res) => {
    updateDriverContact(req, res);
  });

driverContactRoute
  .route("/org/driver/contact/get-all")
  .get(async (req, res) => {
    getDriverContact(req, res);
  });

driverContactRoute
  .route("/org/driver/contact/get-by-id/:id")
  .get(async (req, res) => {
    getDriverContactById(req, res);
  });

driverContactRoute
  .route("/org/driver/contact/delete-all")
  .delete(async (req, res) => {
    deleteAllDriverContact(req, res);
  });

driverContactRoute
  .route("/org/driver/contact/delete-by-id/:id")
  .delete(async (req, res) => {
    deleteDriverContactById(req, res);
  });

export { driverContactRoute };
