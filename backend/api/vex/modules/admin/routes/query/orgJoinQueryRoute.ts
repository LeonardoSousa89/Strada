import express from "express";
import { getOrgJoinQuery } from "../../controllers/org/query/orgJoinQueryController";

const orgJoinQueryRoute = express.Router();

orgJoinQueryRoute.route("/org/join/data").get(async (req, res) => {
  getOrgJoinQuery(req, res);
});

export { orgJoinQueryRoute };
