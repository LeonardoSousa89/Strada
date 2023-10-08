import express from "express";
import {
  deleteAllMidia,
  deleteMidiaById,
  getMidia,
  getMidiaById,
  saveMidia,
} from "../../controllers/driver/information/midiaController";

const midiaRoute = express.Router();

midiaRoute
  .route("/org/driver/information/midia/uri/save")
  .post(async (req, res) => {
    saveMidia(req, res);
  });

midiaRoute
  .route("/org/driver/information/midia/uri/get-all")
  .get(async (req, res) => {
    getMidia(req, res);
  });

midiaRoute
  .route("/org/driver/information/midia/uri/get-by-id/:id")
  .get(async (req, res) => {
    getMidiaById(req, res);
  });

midiaRoute
  .route("/org/driver/information/midia/uri/delete-all")
  .delete(async (req, res) => {
    deleteAllMidia(req, res);
  });

midiaRoute
  .route("/org/driver/information/midia/uri/delete-by-id/:id")
  .delete(async (req, res) => {
    deleteMidiaById(req, res);
  });

export { midiaRoute };
