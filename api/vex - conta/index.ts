var port = 8765

import morgan from 'morgan'
import express from 'express'
import { orgController } from './controllers/org/orgController'
import { orgAddressController } from './controllers/org/orgAddressController'
import { orgContactController } from './controllers/org/orgContactController'
import { orgAddressRelationTableController } from './controllers/org/relations/orgAddressRelationTableController'
import { driverController } from './controllers/driver/driverController'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', [
              orgController, 
              orgAddressController,
              orgContactController,
              orgAddressRelationTableController,
              driverController
            ])

app.listen(port)
