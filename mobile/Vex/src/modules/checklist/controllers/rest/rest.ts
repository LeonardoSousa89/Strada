import Rest from "../../services/rest/rest";

export const insertDriver = async (data: any) => await new Rest(data).save();
export const getZipCode = async (zipCode: any) =>
  await new Rest().getById(zipCode);
