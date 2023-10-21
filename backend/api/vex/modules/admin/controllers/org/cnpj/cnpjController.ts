import cnpjQuery from "../../../services/cnpj/cnpjService";

export const getCnpj = async (req: any, res: any, cnpj: any) => {
  try {
    return res.status(200).json(await new cnpjQuery(cnpj).GET());
  } catch (__) {
    return res
      .status(503)
      .json({ error: "there's an error to access api endpoint" });
  }
};
