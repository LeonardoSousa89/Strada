import bcrypt from "bcrypt";

export const cryptograph = (password: any) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
