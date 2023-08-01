import express, { response } from 'express'

import HandleError from '../../../interface/error/handleError'

import axios from 'axios'

import * as dotenv from 'dotenv' 

import { cryptograph } from '../../../security/cryptography/bcrypt'

import { testDeleteByTimeInformation } from '../server/functions'
import { loadDataTest, loadDataTest2 } from '../../request/request.test'

dotenv.config()

const orgTestsController = express.Router()

const err = new HandleError() 

orgTestsController.route('/tests').get(async(req, res)=>{

    // const data = testDeleteByTimeInformation()

    // console.log(data)
    
    // 40  requisições/s direto do banco de dados [gravação e leitura]
    const request = loadDataTest()

    console.log(request)

    const request2 = loadDataTest2()

    console.log(request2)

    res.status(200).json({tests: 'testing Ok!'})
})

export { orgTestsController }
