import express, { response } from 'express'

import HandleError from '../../../interface/error/handleError'

import axios from 'axios'

import * as dotenv from 'dotenv' 

import { cryptograph } from '../../../security/cryptography/bcrypt'

import { testDeleteByTimeInformation } from '../server/functions'
import { loadDataTest, loadDataTest2 } from '../../request/request.test'
import { connection, disconnection, getCache, setCache } from '../../cache/redis'

dotenv.config()

const orgTestsController = express.Router()

const err = new HandleError() 

//teste de cargas
orgTestsController.route('/tests').get(async(req, res)=>{

    try{

        // const data = testDeleteByTimeInformation()
    
        // console.log(data)
        
        // 40  requisições/s direto do banco de dados [gravação e leitura]
        const request = loadDataTest()
    
        console.log(request)
    
        const request2 = loadDataTest2()
    
        console.log(request2)
    
        return res.status(200).json({tests: 'testing Ok!'})
    }catch(__){

        return res.status(500).json({ error: 'ops! there is an error' })
    }
})

// testes de performance com cache utilizando o db redis
orgTestsController.route('/tests/redis-cache/on-storage').post(async(req, res)=>{

    try{

        await connection()

        await setCache(req.body.key, req.body.value, req.body.expiration)

        res.status(201).json({ msg: 'cache on storage' })
        
        await disconnection()
        
        return 
    }catch(__){

        return res.status(500).json({ error: 'ops! there is an error' })
    }
}).get(async(req, res)=>{

    try{

        await connection()

        const cache = await getCache(req.query.cache)

        res.status(200).json(cache)
        
        await disconnection()
        
        return 
    }catch(__){

        return res.status(500).json({ error: 'ops! there is an error' })
    }
})

export { orgTestsController }
