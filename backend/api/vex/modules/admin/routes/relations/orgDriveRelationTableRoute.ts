import express from "express";
import {
  deleteOrgDriverRelationTable,
  deleteOrgDriverRelationTableById,
  getOrgDriverRelationTable,
  getOrgDriverRelationTableById,
  saveOrgDriverRelationTable,
} from "../../controllers/org/relations/orgDriverRelationTableController";

const orgDriverRelationTableRoute = express.Router();

orgDriverRelationTableRoute
  .route("/org/driver/relation-table/save")
  .post(async (req, res) => {
    saveOrgDriverRelationTable(req, res);
  });

orgDriverRelationTableRoute
  .route("/org/driver/relation-table/get-all")
  .get(async (req, res) => {
    getOrgDriverRelationTable(req, res);
  });

orgDriverRelationTableRoute
  .route("/org/driver/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getOrgDriverRelationTableById(req, res);
  });

orgDriverRelationTableRoute
  .route("/org/driver/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteOrgDriverRelationTable(req, res);
  });
orgDriverRelationTableRoute
  .route("/org/driver/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteOrgDriverRelationTableById(req, res);
  });

export { orgDriverRelationTableRoute };
