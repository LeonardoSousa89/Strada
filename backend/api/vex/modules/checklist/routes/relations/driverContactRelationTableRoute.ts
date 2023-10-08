import express from "express";
import {
  deleteAllDriverContactRelationTable,
  deleteDriverContactRelationTableById,
  getDriverContactRelationTable,
  getDriverContactRelationTableById,
  saveDriverContactRelationTable,
} from "../../controllers/driver/relations/driverContactRelationTableController";

const driverContactRelationTableRoute = express.Router();

driverContactRelationTableRoute
  .route("/org/driver/contact/relation-table/save")
  .post(async (req, res) => {
    saveDriverContactRelationTable(req, res);
  });

driverContactRelationTableRoute
  .route("/org/driver/contact/relation-table/get-all")
  .get(async (req, res) => {
    getDriverContactRelationTable(req, res);
  });

driverContactRelationTableRoute
  .route("/org/driver/contact/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getDriverContactRelationTableById(req, res);
  });

driverContactRelationTableRoute
  .route("/org/driver/contact/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteAllDriverContactRelationTable(req, res);
  });

driverContactRelationTableRoute
  .route("/org/driver/contact/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteDriverContactRelationTableById(req, res);
  });

export { driverContactRelationTableRoute };
