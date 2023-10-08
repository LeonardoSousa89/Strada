import express from "express";
import {
  deleteOrgIpDataProviderById,
  getOrgIpDataProvider,
  getOrgIpDataProviderById,
  saveOrgIpDataProvider,
} from "../controllers/org/orgIpDataProviderController";

const orgIpDataProviderRoute = express.Router();

orgIpDataProviderRoute
  .route("/org/client/machine/data/provider/save")
  .post(async (req, res) => {
    saveOrgIpDataProvider(req, res);
  });

orgIpDataProviderRoute
  .route("/org/client/machine/data/provider/get/all")
  .get(async (req, res) => {
    getOrgIpDataProvider(req, res);
  });

orgIpDataProviderRoute
  .route("/org/client/machine/data/provider/get/by/id/:id")
  .get(async (req, res) => {
    getOrgIpDataProviderById(req, res);
  });

orgIpDataProviderRoute
  .route("/org/client/machine/data/provider/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteOrgIpDataProviderById(req, res);
  });

export { orgIpDataProviderRoute };
