import * as dotenv from 'dotenv' 

dotenv.config()

export default {

  development: {
    client:     process.env.DEV_CLIENT,
    connection: {
      database: process.env.DEV_DATABASE,
      user:     process.env.DEV_USER,
      password: process.env.DEV_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client:     process.env.PROD_CLIENT,
    connection: {
      host: process.env.PROD_HOST,
      database: process.env.PROD_DATABASE,
      user:     process.env.PROD_USER,
      password: process.env.PROD_PASSWORD
      
    },
    pool: {
      min: 2,
      max: 10
    },
  }
  
};