import express from "express";
import {
  deleteOrgAddressRelationTable,
  deleteOrgAddressRelationTableById,
  getOrgAddressRelationTable,
  getOrgAddressRelationTableById,
  saveOrgAddressRelationTable,
} from "../../controllers/org/relations/orgAddressRelationTableController";

const orgAddressRelationTableRoute = express.Router();

orgAddressRelationTableRoute
  .route("/org/address/relation-table/save")
  .post(async (req, res) => {
    saveOrgAddressRelationTable(req, res);
  });

orgAddressRelationTableRoute
  .route("/org/address/relation-table/get-all")
  .get(async (req, res) => {
    getOrgAddressRelationTable(req, res);
  });

orgAddressRelationTableRoute
  .route("/org/address/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getOrgAddressRelationTableById(req, res);
  });

orgAddressRelationTableRoute
  .route("/org/address/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteOrgAddressRelationTable(req, res);
  });
orgAddressRelationTableRoute
  .route("/org/address/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteOrgAddressRelationTableById(req, res);
  });

export { orgAddressRelationTableRoute };
