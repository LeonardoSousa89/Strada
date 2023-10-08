import express from "express";
import { deleteOrgContactRelationTable, deleteOrgContactRelationTableById, getOrgContactRelationTable, getOrgContactRelationTableById, saveOrgContactRelationTable } from "../../controllers/org/relations/orgContactRelationTableController";

const orgContactRelationTableRoute = express.Router();

orgContactRelationTableRoute
  .route("/org/contact/relation-table/save")
  .post(async (req, res) => {
    saveOrgContactRelationTable(req, res);
  });

orgContactRelationTableRoute
  .route("/org/contact/relation-table/get-all")
  .get(async (req, res) => {
    getOrgContactRelationTable(req, res);
  });

orgContactRelationTableRoute
  .route("/org/contact/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getOrgContactRelationTableById(req, res);
  });

orgContactRelationTableRoute
  .route("/org/contact/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteOrgContactRelationTable(req, res);
  });
orgContactRelationTableRoute
  .route("/org/contact/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteOrgContactRelationTableById(req, res);
  });

export { orgContactRelationTableRoute };
