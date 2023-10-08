import express from "express";
import {
  deleteAllDriverInformationRelationTable,
  deleteDriverInformationRelationTableById,
  getDriverInformationRelationTable,
  getDriverInformationRelationTableById,
  saveDriverInformationRelationTable,
} from "../../controllers/driver/relations/driverInformationRelationTableController";

const driverInformationRelationTableRoute = express.Router();

driverInformationRelationTableRoute
  .route("/org/driver/information/relation-table/save")
  .post(async (req, res) => {
    saveDriverInformationRelationTable(req, res);
  });

driverInformationRelationTableRoute
  .route("/org/driver/information/relation-table/get-all")
  .get(async (req, res) => {
    getDriverInformationRelationTable(req, res);
  });

driverInformationRelationTableRoute
  .route("/org/driver/information/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getDriverInformationRelationTableById(req, res);
  });

driverInformationRelationTableRoute
  .route("/org/driver/information/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteAllDriverInformationRelationTable(req, res);
  });

driverInformationRelationTableRoute
  .route("/org/driver/information/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteDriverInformationRelationTableById(req, res);
  });

export { driverInformationRelationTableRoute };
