import express from "express";
import { getClientMachineIp } from "../controllers/web/network/networkController";

const networkRoute = express.Router();

networkRoute.route("/get/client/machine/ip").get(async (req, res) => {
  getClientMachineIp(req, res);
});

export { networkRoute };
