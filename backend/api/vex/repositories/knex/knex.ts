import db from "../../database/knexfile";
import knex from "knex";

import { attachPaginate } from "knex-paginate";

attachPaginate();

export default knex(db["development"]);
