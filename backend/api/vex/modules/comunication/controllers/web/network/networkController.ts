import { clientMachineIp } from "../../../services/web/network/networkService";

export const getClientMachineIp = async (req: any, res: any) => {
  try {
    const clientMachine = await clientMachineIp();
    return res.status(200).json(clientMachine);
  } catch (__) {
    return res
      .status(500)
      .json({ error: "there's an error to access api endpoint" });
  }
};
