import express from "express";
import {
  deleteOrgContactById,
  getOrgContact,
  getOrgContactById,
  saveOrgContact,
  updateOrgContact,
} from "../controllers/org/orgContactController";

const orgContactRoute = express.Router();

orgContactRoute.route("/org/contact/save").post(async (req, res) => {
  saveOrgContact(req, res);
});

orgContactRoute.route("/org/contact/update/:id").put(async (req, res) => {
  updateOrgContact(req, res);
});

orgContactRoute.route("/org/contact/get-all").get(async (req, res) => {
  getOrgContact(req, res);
});

orgContactRoute.route("/org/contact/get-by-id/:id").get(async (req, res) => {
  getOrgContactById(req, res);
});

orgContactRoute
  .route("/org/contact/delete-by-id/:id")
  .delete(async (req, res) => {
    deleteOrgContactById(req, res);
  });

export { orgContactRoute };
