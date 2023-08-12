import express, { json, response } from 'express'

import HandleError from '../../../interface/error/handleError'

import axios from 'axios'

import * as dotenv from 'dotenv' 

import { cryptograph } from '../../../security/cryptography/bcrypt'

import { testDeleteByTimeInformation } from '../server/functions'
import { loadDataTest, 
         loadDataTest2 } from '../../request/request.test'
import { connection, disconnection, getCache, setCache } from '../../cache/redis'
import InformationService from '../../../services/driver/information/informationService'
import e from 'express'
import OrgJoinQuery from '../../../services/query/orgJoinQueryService'
import { cipherDataAndSave, decipherDataAndGet } from '../../security/crypto'

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

        return res.status(500).json({ error: 'ops! there is an error'+__ })
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

        return res.status(500).json({ error: 'ops! there is an error'+__ })
    }
}).get(async(req, res)=>{

    try{

        await connection()

        const cache = await getCache(req.query.cache)

        res.status(200).json(cache)
        
        await disconnection()
        
        return 
    }catch(__){

        return res.status(500).json({ error: 'ops! there is an error'+__ })
    }
})

orgTestsController.route('/tests/redis-cache/get/org/data/:id').get(async(req, res)=>{

    try{

        await connection()
             
        const orgDataFromCache = await getCache(`org_data_${req.params.id}`)

        if(orgDataFromCache) {

            const data = JSON.parse(orgDataFromCache)
            
            res.status(200).json({
                                data: {
                                inCache: 'yes',
                                data 
                                }
                            })
                
            await disconnection()
    
            return
        }

        const query = new OrgJoinQuery()

        const data = await query.getById(Number(req.params.id))
        
        if(data.data.organization.length === 0){

            res.status(404)
               .json({
                    msg: 'no data'
                })

            await disconnection()

            return
        }

        // 60 * 60 * 24 * 7 (expiration: 7 dias)
        //a lógica é a seguinte: a informação será salva,
        // na api de registro, no database de registro e no banco de cache
        // o usuário de nível gratuito, somente acessará os dados em cache,
        // com ttl equivalente a 1 semana, após isso os dados em cache serão 
        // eliminados e a API de registro somente será acessível a administração
        // do app, para fins de consulta ou jurídico, será eliminar primeiro a
        // associação da informação e logo após a informação, ambos estarão 
        // em cache
        await setCache(`org_data_${req.params.id}`, JSON.stringify(data), 300)
                 
           
        // neste ponto a tentativa de parse levaria a erros continuos,
        // pois aqui o valor da value de informationFromCache é null 
        // e a tentativa de parse para JSON, seria o mesmo que 
        // converter um valor null em JSON.
        // então se na chamada não houver dados em cache, 
        // os dados obtidos na requisição REST serão salvos no redis e
        // apresentados ao usuário, na próxima chamada o valor já será
        // diferente de null, aí sim poderá ser parseado para JSON
        // e obtido do banco de dados de cache. 

        res.status(200).json({
                            data:{
                                inCache: 'no',
                                data
                            }
                        })
        
        await disconnection()

        return 
    }catch(__){

        res.status(500)
           .json({ 
                error: 'i am sorry, there is an error with server'+__
            })
        
        await disconnection()
        
        return 
        
    }
})

orgTestsController.route('/tests/org/crypted/save').post(async(req, res)=>{

    try{

        const data = { ...req.body }

        cipherDataAndSave(data)

        return res.json({ data: 'crypted with success' })
    }catch(__){

        res.status(500)
        .json({ 
             error: 'i am sorry, there is an error with server'+__
         })
    }
})

orgTestsController.route('/tests/org/crypted/data').get(async(req, res)=>{

    try{

        const data = await decipherDataAndGet()

        return res.json(data)
    }catch(__){

        res.status(500)
        .json({ 
             error: 'i am sorry, there is an error with server'+__
         })
    }
})

export { orgTestsController }
