import express from "express";
import {
  deleteOrgAddressById,
  getOrgAddress,
  getOrgAddressById,
  saveOrgAddress,
  updateOrgAddress,
} from "../controllers/org/orgAddressController";

const orgAddressRoute = express.Router();

orgAddressRoute.route("/org/address/save").post(async (req, res) => {
  saveOrgAddress(req, res);
});

orgAddressRoute.route("/org/address/update/:id").put(async (req, res) => {
  updateOrgAddress(req, res);
});

orgAddressRoute.route("/org/address/get-all").get(async (req, res) => {
  getOrgAddress(req, res);
});

orgAddressRoute.route("/org/address/get-by-id/:id").get(async (req, res) => {
  getOrgAddressById(req, res);
});

orgAddressRoute
  .route("/org/address/delete-by-id/:id")
  .delete(async (req, res) => {
    deleteOrgAddressById(req, res);
  });

export { orgAddressRoute };
