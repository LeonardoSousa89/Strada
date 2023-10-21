import OrgTitle from "../../services/title/title";

export const getOrgData = async () => await new OrgTitle().getById();
