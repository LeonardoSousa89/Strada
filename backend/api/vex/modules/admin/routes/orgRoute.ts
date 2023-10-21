import express from "express";
import {
  deleteOrgById,
  verifyCnpj,
  getOrg,
  getOrgById,
  saveOrg,
  updateOrg,
} from "../controllers/org/orgController";
import { getCnpj } from "../controllers/org/cnpj/cnpjController";

const orgRoute = express.Router();

orgRoute.route("/org/verify-cnpj").get(async (req, res) => {
  verifyCnpj(req, res);
});
orgRoute.route("/org/get/data/cnpj").get(async (req, res) => {
  getCnpj(req, res, req.query.cnpj);
});

orgRoute.route("/org/save").post(async (req, res) => {
  saveOrg(req, res);
});

orgRoute.route("/org/update/:id").put(async (req, res) => {
  updateOrg(req, res);
});

orgRoute.route("/org/get-all").get(async (req, res) => {
  getOrg(req, res);
});

orgRoute.route("/org/get-by-id/:id").get(async (req, res) => {
  getOrgById(req, res);
});

orgRoute.route("/org/delete-by-id/:id").delete(async (req, res) => {
  deleteOrgById(req, res);
});

export { orgRoute };
