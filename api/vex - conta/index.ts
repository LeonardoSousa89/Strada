var port = 8765

import morgan from 'morgan'
import express from 'express'
import { orgController } from './controllers/org/orgController'
import { OrgJoinQueryController } from './controllers/query/orgJoinQueryController'
import { orgAddressController } from './controllers/org/orgAddressController'
import { orgContactController } from './controllers/org/orgContactController'
import { orgAddressRelationTableController } from './controllers/org/relations/orgAddressRelationTableController'
import { orgContactRelationTableController } from './controllers/org/relations/orgContactRelationTableController'
import { orgDriverRelationTableController } from './controllers/relations/orgDriverRelationTableController'
import { driverController } from './controllers/driver/driverController'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', [
              orgController, 
              OrgJoinQueryController,
              orgAddressController,
              orgContactController,
              orgAddressRelationTableController,
              orgContactRelationTableController,
              orgDriverRelationTableController,
              driverController
            ])

app.listen(port)
