var port = 8765

import morgan from 'morgan'
import express from 'express'
import { orgController } from './controllers/org/orgController'
import { driverController } from './controllers/driver/driverController'
import { orgAddressController } from './controllers/org/orgAddressController'
import { orgContactController } from './controllers/org/orgContactController'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', [
              orgController, 
              orgAddressController,
              orgContactController,
              driverController
            ])

app.listen(port)
