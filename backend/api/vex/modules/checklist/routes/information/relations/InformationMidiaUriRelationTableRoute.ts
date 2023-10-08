import express from "express";
import {
  deleteAllInformationMidiaUriRelationTable,
  deleteInformationMidiaUriRelationTableById,
  getInformationMidiaUriRelationTable,
  getInformationMidiaUriRelationTableById,
  saveInformationMidiaUriRelationTable,
} from "../../../controllers/driver/information/relations/informationMidiaUriRelationTableController";

const informationMidiaUriRelationTableRoute = express.Router();

informationMidiaUriRelationTableRoute
  .route("/org/driver/information/midia/uri/relation-table/save")
  .post(async (req, res) => {
    saveInformationMidiaUriRelationTable(req, res);
  });

informationMidiaUriRelationTableRoute
  .route("/org/driver/information/midia/uri/relation-table/get-all")
  .get(async (req, res) => {
    getInformationMidiaUriRelationTable(req, res);
  });

informationMidiaUriRelationTableRoute
  .route("/org/driver/information/midia/uri/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    getInformationMidiaUriRelationTableById(req, res);
  });

informationMidiaUriRelationTableRoute
  .route("/org/driver/information/midia/uri/relation-table/delete/all")
  .delete(async (req, res) => {
    deleteAllInformationMidiaUriRelationTable(req, res);
  });

informationMidiaUriRelationTableRoute
  .route("/org/driver/information/midia/uri/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    deleteInformationMidiaUriRelationTableById(req, res);
  });

export { informationMidiaUriRelationTableRoute };
