import express from "express";
import {
  deleteOrgAndOrgIpDataProviderRelationTable,
  deleteOrgAndOrgIpDataProviderRelationTableById,
  getOrgAndOrgIpDataProviderRelationTable,
  getOrgAndOrgIpDataProviderRelationTableById,
  saveOrgAndOrgIpDataProviderRelationTable,
} from "../../controllers/org/relations/orgAndOrgIpDataProviderRelationTableController";

const orgAndOrgIpDataProviderRelationTableRoute = express.Router();

orgAndOrgIpDataProviderRelationTableRoute
  .route("/org/machine/client/ip/and/provider/relation-table/save")
  .post(async (req, res) => {
    saveOrgAndOrgIpDataProviderRelationTable(req, res);
  });

orgAndOrgIpDataProviderRelationTableRoute
  .route("/org/machine/client/ip/and/provider/relation-table/get-all")
  .get(async (req, res) => {
    getOrgAndOrgIpDataProviderRelationTable(req, res);
  });

orgAndOrgIpDataProviderRelationTableRoute
  .route("/org/machine/client/ip/and/provider/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getOrgAndOrgIpDataProviderRelationTableById(req, res);
  });

orgAndOrgIpDataProviderRelationTableRoute
  .route("/org/machine/client/ip/and/provider/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteOrgAndOrgIpDataProviderRelationTable(req, res);
  });
orgAndOrgIpDataProviderRelationTableRoute
  .route("/org/machine/client/ip/and/provider/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteOrgAndOrgIpDataProviderRelationTableById(req, res);
  });

export { orgAndOrgIpDataProviderRelationTableRoute };
