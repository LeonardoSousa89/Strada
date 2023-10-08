import express from "express";
import {
  deleteAllDriverDocument,
  deleteDriverDocumentById,
  getDriverDocument,
  getDriverDocumentById,
  saveDriverDocument,
  updateDriverDocument,
} from "../controllers/driver/driverDocumentController";

const driverDocumentRoute = express.Router();

driverDocumentRoute
  .route("/org/driver/document/save")
  .post(async (req, res) => {
    saveDriverDocument(req, res);
  });

driverDocumentRoute
  .route("/org/driver/document/update/:id")
  .put(async (req, res) => {
    updateDriverDocument(req, res);
  });

driverDocumentRoute
  .route("/org/driver/document/get-all")
  .get(async (req, res) => {
    getDriverDocument(req, res);
  });

driverDocumentRoute
  .route("/org/driver/document/get-by-id/:id")
  .get(async (req, res) => {
    getDriverDocumentById(req, res);
  });

driverDocumentRoute
  .route("/org/driver/document/delete-all")
  .delete(async (req, res) => {
    deleteAllDriverDocument(req, res);
  });

driverDocumentRoute
  .route("/org/driver/document/delete-by-id/:id")
  .delete(async (req, res) => {
    deleteDriverDocumentById(req, res);
  });

export { driverDocumentRoute };
