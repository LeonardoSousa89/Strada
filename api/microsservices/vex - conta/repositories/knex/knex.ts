import db from '../../database/knexfile'
import knex from 'knex'

export default knex(db['production'])