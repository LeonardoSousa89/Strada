import express from 'express'
import OrgContactService from '../../services/org/orgContactService'
import HandleError from '../../interface/error/handleError'

const orgContactController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */

orgContactController.route('/org/contact/save').post(async(req, res)=> {

    const OrgContact = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(OrgContact.telephone, 'telephone is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgContact.ddd, 'ddd is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgContact.email, 'email place is undefined or null')
    
        err.exceptionFieldIsEmpty(OrgContact.telephone.trim(), 'telephone can not be empty')
        err.exceptionFieldIsEmpty(OrgContact.ddd.trim(), 'ddd can not be empty')
        err.exceptionFieldIsEmpty(OrgContact.email.trim(), 'email place can not be empty')
    }catch(e){

        return res.status(400).json({ error: e })
    }
                                            
    const response = new OrgContactService(OrgContact.telephone,
                                           OrgContact.ddd,
                                           OrgContact.email).save()
    
    return await response.then(__ => res.status(201)
                                        .json({ 
                                            msg: 'organization contact save' 
                                        }))
                                        .catch(__ => res.status(500)
                                                        .json({ 
                                                            error: 'i am sorry, there is an error with server'+__ 
                                                        }))                                         
})

orgContactController.route('/org/contact/update/:id').put(async(req, res)=> {

    const OrgContact = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(OrgContact.telephone, 'telephone is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgContact.ddd, 'ddd is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgContact.email, 'email place is undefined or null')
    
        err.exceptionFieldIsEmpty(OrgContact.telephone.trim(), 'telephone can not be empty')
        err.exceptionFieldIsEmpty(OrgContact.ddd.trim(), 'ddd can not be empty')
        err.exceptionFieldIsEmpty(OrgContact.email.trim(), 'email place can not be empty')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new OrgContactService().verifyId(req.params.id)

    const dataIdDbResponse = await verificationId.then(e => e)
    
    if(dataIdDbResponse === false) return res.status(404)
                                             .json({ 
                                                error: 'organization contact not found' 
                                            }) 

    const response = new OrgContactService(OrgContact.telephone,
                                           OrgContact.ddd,
                                           OrgContact.email).update(req.params.id)
                                                                                  
    return await response.then(__ => res.status(201)
                                        .json({ 
                                            msg: 'organization contact update' 
                                        }))
                                        .catch(__ => res.status(500)
                                                        .json({ 
                                                            error: 'i am sorry, there is an error with server'+__ 
                                                        }))                                         
})

orgContactController.route('/org/contact/get-all').get(async(req, res)=>{

    const response = new OrgContactService().getAll()
    
    await response.then(data => {
    
        if(data.length === 0) return res.status(404)
                                        .json({ 
                                            error: 'no data' 
                                        })
            
        return res.status(200).json(data)
    
        })
        .catch(__ => res.status(500)
                        .json({  
                            error: 'i am sorry, there is an error with server'  
                        }))
})  

orgContactController.route('/org/contact/get-by-id/:id').get(async(req, res)=>{

    const response = new OrgContactService().getById(req.params.id)
    
    await response.then(data => {
    
        if(data.length === 0) return res.status(404)
                                        .json({ 
                                            error: 'organization contact not found' 
                                        })
            
        return res.status(200).json(data)
    
        })
        .catch(__ => res.status(500)
                        .json({  
                            error: 'i am sorry, there is an error with server'  
                        }))
})

orgContactController.route('/org/contact/delete-by-id/:id').delete(async(req, res)=>{

    const OrgContact = { ...req.params }

    const response = new OrgContactService().deleteById(OrgContact.id)
    
    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new OrgContactService().verifyId(OrgContact.id)

    const dataIdDbResponse = await verificationId.then(e => e)
    
    if(dataIdDbResponse === false) return res.status(404)
                                             .json({ 
                                                error: 'organization contact not found' 
                                            }) 

    await response.then(__ => {
    
        return res.status(204).json({})
    
        })
        .catch(__ => res.status(500)
                        .json({  
                            error: 'i am sorry, there is an error with server'  
                        }))
})

export { orgContactController }
