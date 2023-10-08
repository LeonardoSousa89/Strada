import express from "express";
import {
  deleteOrgById,
  getCnpj,
  getOrg,
  getOrgById,
  saveOrg,
  updateOrg,
} from "../controllers/org/orgController";

const orgRoute = express.Router();

orgRoute.route("/org/verify-cnpj").get(async (req, res) => {
  getCnpj(req, res);
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
