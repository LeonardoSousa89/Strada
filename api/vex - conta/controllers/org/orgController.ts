import express from 'express'
import OrgService from '../../services/org/orgService'
import HandleError from '../../interface/error/handleError'
import axios from 'axios'

import * as dotenv from 'dotenv' 

import { cryptograph } from '../../security/cryptography/bcrypt'

dotenv.config()

const orgController = express.Router()

const err = new HandleError()

/* [ controlador de verificação de existência do cnpj] */
orgController.route('/org/verify-cnpj').get(async (req, res)=>{

    let Org = { ...req.query }

    let url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${Org.cnpj}`

    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    await axios.get(url).then(response => {
        
       if(response.data.error){

            res.status(404).json({

                organizationExists: false
            })
       }
       
       else{

            res.status(200).json({

                organizationExists: true
            })
       }

    }).catch(_ => res.status(500)
                     .json({ 
                        error: 'i am sorry, there is an error with server'
                    }))
})

orgController.route('/org/save').post(async (req, res)=>{

    const Org = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(Org.fantasy_name, 'fantasy name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.corporate_name, 'corporate name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnpj, 'cnpj is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.org_status, 'org status is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, 'cnae main code is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.open_date, 'open date is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.password, 'password is undefined or null')

        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), 'fantasy name can not be empty')
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), 'corporate name can not be empty')
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), 'cnpj can not be empty')
        err.exceptionFieldIsEmpty(Org.org_status.trim(), 'org status can not be empty')
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), 'cnae main code can not be empty')
        err.exceptionFieldIsEmpty(Org.open_date.trim(), 'open date can not be empty')
        err.exceptionFieldIsEmpty(Org.password.trim(), 'password can not be empty')
        
        err.exceptionFieldValueLessToType(Org.password.trim(), 'password must be greather than 4')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    //verifica se o cnpj passado na url da requisição, existe através de uma api externa
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    let cnpj = { ...req.query }

    let url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${cnpj.cnpj}`
    
    let cnpjRequestResponse: any = ''

    try{

        cnpjRequestResponse = await axios.get(url)
    }catch(__){

        return res.status(500)
                  .json({ 
                    error: 'i am sorry, there is an error with server' 
                })
    }
 
    if(cnpjRequestResponse.data.error) return res.status(404)
                                                 .json({ error: 'cnpj not found' })

    //verifica se o cnpj no body da requisição já está cadastrado no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationCnpj = new OrgService().verifyCnpj(Org.cnpj)

    const cnpjDbResponse = await verificationCnpj.then(e => e)
    
    if(cnpjDbResponse === true) return res.status(400)
                                          .json({ 
                                            error: 'cnpj already exists' 
                                        }) 

    try{
    
    Org.password = cryptograph(Org.password)

    const response = new OrgService( 
                    Org.fantasy_name, 
                    Org.corporate_name,
                    Org.cnpj, 
                    Org.org_status, 
                    Org.cnae_main_code,
                    Org.open_date, 
                    Org.password).save()
    

        return await response.then(__ => res.status(201)
                                            .json({ 
                                                msg: 'organization created' 
                                            }))
    }catch(e){

        return res.status(500)
                  .json({ 
                    error: 'i am sorry, there is an error with server' 
                })
    }                                        
})

orgController.route('/org/update/:id').put(async (req, res)=>{

    const Org = { ...req.body } 

    try{

        err.exceptionFieldNullOrUndefined(Org.fantasy_name, 'fantasy name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.corporate_name, 'corporate name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnpj, 'cnpj is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.org_status, 'org status is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, 'cnae main code is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.open_date, 'open date is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.password, 'password is undefined or null')

        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), 'fantasy name can not be empty')
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), 'corporate name can not be empty')
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), 'cnpj can not be empty')
        err.exceptionFieldIsEmpty(Org.org_status.trim(), 'org status can not be empty')
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), 'cnae main code can not be empty')
        err.exceptionFieldIsEmpty(Org.open_date.trim(), 'open date can not be empty')
        err.exceptionFieldIsEmpty(Org.password.trim(), 'password can not be empty')
        
        err.exceptionFieldValueLessToType(Org.password.trim(), 'password must be greather than 4')
    }catch(e){

        return res.status(400).json({ error: e })
    } 

    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new OrgService().verifyId(req.params.id)

    const dataIdDbResponse = await verificationId.then(e => e)
    
    if(dataIdDbResponse === false) return res.status(404)
                                             .json({ 
                                                error: 'organization not found' 
                                        }) 

    try{
    
    Org.password = cryptograph(Org.password)

    const response = new OrgService( 
                    Org.fantasy_name, 
                    Org.corporate_name,
                    Org.cnpj, 
                    Org.org_status, 
                    Org.cnae_main_code,
                    Org.open_date, 
                    Org.password).update(req.params.id)

        return await response.then(__ => res.status(201)
                                            .json({ 
                                                msg: 'organization updated' 
                                            }))

    }catch(e){

        return res.status(500)
                  .json({ 
                    error: 'i am sorry, there is an error with server' 
                })
    }   
})

orgController.route('/org/get-all').get(async (req, res)=>{

    const response = new OrgService().getAll()

    
    await response.then(data => {
    
        if(data.length === 0) return res.status(404)
                                        .json({ 
                                            error: 'not data' 
                                        })
            
            return res.status(200).json(data)
    
        })
        .catch(__ => res.status(500)
                        .json({  
                            error: 'i am sorry, there is an error with server'  
                        }))
})

orgController.route('/org/get-by-id/:id').get(async (req, res)=>{

    const response = new OrgService().getById(req.params.id)  

    await response.then(data => {

        if(data.length === 0) return res.status(404)
                                        .json({
                                    error: 'organization not found'
                                })

        return res.status(200).json(data)
    }).catch(__ => res.status(500)
                      .json({  
                        error: 'i am sorry, there is an error with server'  
                    }))
})

orgController.route('/org/delete-by-id/:id').delete(async (req, res)=>{

    const Org = { ...req.params }

    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new OrgService().verifyId(Org.id)

    const dataIdDbResponse = await verificationId.then(e => e)
    
    if(dataIdDbResponse === false) return res.status(404)
                                             .json({ 
                                                error: 'organization not found' 
                                        })

    const response = new OrgService().deleteByid(Org.id)  

    return await response.then(__ => res.status(204)
                                        .json({}))
                                        .catch(__ => res.status(500)
                                                        .json({  
                                                            error: 'i am sorry, there is an error with server'  
                                                        }))
})

export { orgController }
