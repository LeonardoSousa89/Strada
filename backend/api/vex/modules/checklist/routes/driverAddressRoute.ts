import express from "express";
import { deleteAllDriverAddress, deleteDriverAddressById, getDriverAddress, getDriverAddressById, getZipCode, saveDriverAddress, updateDriverAddress } from "../controllers/driver/driverAddressController";

const driverAddressRoute = express.Router();

driverAddressRoute
  .route("/org/driver/address/search/zip-code")
  .get(async (req, res) => {
    getZipCode(req, res);
  });

driverAddressRoute
  .route("/org/driver/address/save")
  .post(async (req, res) => {
    saveDriverAddress(req, res);
  });

driverAddressRoute
  .route("/org/driver/address/update/:id")
  .put(async (req, res) => {
    updateDriverAddress(req, res);
  });

driverAddressRoute
  .route("/org/driver/address/get-all")
  .get(async (req, res) => {
    getDriverAddress(req, res);
  });

driverAddressRoute
  .route("/org/driver/address/get-by-id/:id")
  .get(async (req, res) => {
    getDriverAddressById(req, res);
  });

driverAddressRoute
  .route("/org/driver/address/delete-all")
  .delete(async (req, res) => {
    deleteAllDriverAddress(req, res);
  });

driverAddressRoute
  .route("/org/driver/address/delete-by-id/:id")
  .delete(async (req, res) => {
    deleteDriverAddressById(req, res);
  });

export { driverAddressRoute };
