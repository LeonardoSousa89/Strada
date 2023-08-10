import express from 'express'
import OrgContactService from '../../services/org/orgContactService'
import HandleError from '../../interface/error/handleError'
import RedisOperations from '../../repositories/redis/cache/services/redis.cache.operation'

const orgContactController = express.Router()

const err = new HandleError()

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
                                            
    try{

        const orgContactService = new OrgContactService(OrgContact.telephone,
                                               OrgContact.ddd,
                                               OrgContact.email)

        await orgContactService.save()
        
        return res.status(201)
                  .json({ 
                    msg: 'organization contact saved' 
                })
    }catch(__){

        return res.status(500)
                  .json({ 
                        error: 'i am sorry, there is an error with server' 
                  }) 
    }                                        
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

    const verifyId = new OrgContactService().verifyId(req.params.id)

    const dataIdDbResponse = await verifyId.then(e => e)
    
    if(dataIdDbResponse === false) return res.status(404)
                                             .json({ 
                                                error: 'organization contact not found' 
                                            }) 
 
    try{

        const orgContactService = new OrgContactService(OrgContact.telephone,
                                                        OrgContact.ddd,
                                                        OrgContact.email)
                                                           
        await orgContactService.update(req.params.id) 

        return res.status(201)
                  .json({ 
                        msg: 'organization contact updated' 
                  })
    }catch(__){

        return res.status(500)
                  .json({ 
                        error: 'i am sorry, there is an error with server' 
                    })   
    }
                                       
})

orgContactController.route('/org/contact/get-all').get(async(req, res)=>{

    const orgContactService = new OrgContactService()
    
    const cache = new RedisOperations()

    try{

        cache.connection()

        const orgContactFromCache = await cache.getCache(`orgContact`)
  
        if(orgContactFromCache) {
  
            const data = JSON.parse(orgContactFromCache)
            
            res.status(200).json({
                                data: { inCache: 'yes', data }
                            })
                
            await cache.disconnection()
                            
            return
        }

        const data = await orgContactService.getAll()
    
        if(data.length === 0) {

            res.status(404).json({ 
                                error: 'no data' 
                            })

            await cache.disconnection()
                            
            return
        }
                        
        await cache.setCache(`orgContact`, JSON.stringify(data), 300)

        res.status(200).json({ 
                            data: { inCache: 'no', data }
                       })
                        
        await cache.disconnection()
  
        return

    }catch(__){

        return res.status(500)
                  .json({  
                    error: 'i am sorry, there is an error with server'  
                  })
    }
})  

orgContactController.route('/org/contact/get-by-id/:id').get(async(req, res)=>{

    const OrgContact = { ...req.params }

    const orgContactService = new OrgContactService()
    
    const cache = new RedisOperations()

    try{

        cache.connection()

        const orgContactFromCache = await cache.getCache(`orgContact_${OrgContact.id}`)
  
        if(orgContactFromCache) {
  
            const data = JSON.parse(orgContactFromCache)
            
            res.status(200).json({
                                data: { inCache: 'yes', data }
                            })
                
            await cache.disconnection()
                            
            return
        }

        const data = await orgContactService.getById(OrgContact.id)
    
        if(data.length === 0) {

            res.status(404).json({ 
                                error: 'organization contact not found' 
                            })

            await cache.disconnection()
                            
            return
        }
                
        await cache.setCache(`orgContact_${OrgContact.id}`, JSON.stringify(data), 300)

        res.status(200).json({ 
                            data: { inCache: 'no', data }
                       })
                        
        await cache.disconnection()
  
        return

    }catch(__){

        return res.status(500)
                  .json({  
                    error: 'i am sorry, there is an error with server'  
                  })
    }
})

orgContactController.route('/org/contact/delete-by-id/:id').delete(async(req, res)=>{

    const OrgContact = { ...req.params }

    const orgContactService = new OrgContactService()
    
    try{

        const verifyId = new OrgContactService()

        const orgContactIdExistsOnDb = await verifyId.verifyId(OrgContact.id)
        
        if(orgContactIdExistsOnDb === false) return res.status(404)
                                                       .json({ 
                                                            error: 'organization contact not found' 
                                                        }) 
    
        await orgContactService.deleteById(OrgContact.id)
        
        return res.status(204).json({})
    }catch(__){

        return res.status(500)
                  .json({  
                    error: 'i am sorry, there is an error with server'  
                  })
    }
})

export { orgContactController }
