import express from "express";
import {
  deleteAllDriverAddressRelationTable,
  deleteDriverAddressRelationTableById,
  getDriverAddressRelationTable,
  getDriverAddressRelationTableById,
  saveDriverAddressRelationTable,
} from "../../controllers/driver/relations/driverAddressRelationTableController";

const driverAddressRelationTableRoute = express.Router();

driverAddressRelationTableRoute
  .route("/org/driver/address/relation-table/save")
  .post(async (req, res) => {
    saveDriverAddressRelationTable(req, res);
  });

driverAddressRelationTableRoute
  .route("/org/driver/address/relation-table/get-all")
  .get(async (req, res) => {
    getDriverAddressRelationTable(req, res);
  });

driverAddressRelationTableRoute
  .route("/org/driver/address/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getDriverAddressRelationTableById(req, res);
  });

driverAddressRelationTableRoute
  .route("/org/driver/address/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteAllDriverAddressRelationTable(req, res);
  });

driverAddressRelationTableRoute
  .route("/org/driver/address/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteDriverAddressRelationTableById(req, res);
  });

export { driverAddressRelationTableRoute };
