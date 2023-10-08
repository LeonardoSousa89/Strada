import express from "express";
import {
  deleteAllDriverDocumentRelationTable,
  deleteDriverDocumentRelationTableById,
  getDriverDocumentRelationTable,
  getDriverDocumentRelationTableById,
  saveDriverDocumentRelationTable,
} from "../../controllers/driver/relations/driverDocumentRelationTableController";

const driverDocumentRelationTableRoute = express.Router();

driverDocumentRelationTableRoute
  .route("/org/driver/document/relation-table/save")
  .post(async (req, res) => {
    saveDriverDocumentRelationTable(req, res);
  });

driverDocumentRelationTableRoute
  .route("/org/driver/document/relation-table/get-all")
  .get(async (req, res) => {
    getDriverDocumentRelationTable(req, res);
  });

driverDocumentRelationTableRoute
  .route("/org/driver/document/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getDriverDocumentRelationTableById(req, res);
  });

driverDocumentRelationTableRoute
  .route("/org/driver/document/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteAllDriverDocumentRelationTable(req, res);
  });

driverDocumentRelationTableRoute
  .route("/org/driver/document/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteDriverDocumentRelationTableById(req, res);
  });

export { driverDocumentRelationTableRoute };
