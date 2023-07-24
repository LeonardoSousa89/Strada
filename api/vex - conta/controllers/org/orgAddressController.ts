import express from 'express'
import OrgAddressService from '../../services/org/orgAddressService'
import HandleError from '../../interface/error/handleError'

const orgAddressController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */

orgAddressController.route('/org/address/save').post(async(req, res)=> {

    const OrgAddress = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(OrgAddress.zip_code, 'zip code is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.street_type, 'street type is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.public_place, 'public place is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.org_number, 'number is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.neighborhood, 'neighborhood is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.county, 'county is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.country, 'country is undefined or null')
    
        err.exceptionFieldIsEmpty(OrgAddress.zip_code.trim(), 'zip code can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.street_type.trim(), 'street type can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.public_place.trim(), 'public place can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.org_number.trim(), 'number can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.neighborhood.trim(), 'neighborhood can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.county.trim(), 'county can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.country.trim(), 'country can not be empty')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const response = new OrgAddressService(OrgAddress.zip_code,
                                           OrgAddress.street_type,
                                           OrgAddress.public_place,
                                           OrgAddress.org_number,
                                           OrgAddress.complement,
                                           OrgAddress.neighborhood,
                                           OrgAddress.county,
                                           OrgAddress.country).save()

    return await response.then(__ => res.status(201)
                                        .json({ 
                                            msg: 'organization address saved' 
                                        }))
                                        .catch(__ => res.status(500)
                                                        .json({ 
                                                            error: 'i am sorry, there is an error with server'+__ 
                                                        }))                                         
})

orgAddressController.route('/org/address/update/:id').put(async(req, res)=> {

    const OrgAddress = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(OrgAddress.zip_code, 'zip code is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.street_type, 'street type is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.public_place, 'public place is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.org_number, 'number is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.neighborhood, 'neighborhood is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.county, 'county is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.country, 'country is undefined or null')
    
        err.exceptionFieldIsEmpty(OrgAddress.zip_code.trim(), 'zip code can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.street_type.trim(), 'street type can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.public_place.trim(), 'public place can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.org_number.trim(), 'number can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.neighborhood.trim(), 'neighborhood can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.county.trim(), 'county can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.country.trim(), 'country can not be empty')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new OrgAddressService().verifyId(req.params.id)

    const dataIdDbResponse = await verificationId.then(e => e)
    
    if(dataIdDbResponse === false) return res.status(404)
                                             .json({ 
                                                error: 'organization address not found' 
                                            }) 

    const response = new OrgAddressService(OrgAddress.zip_code,
                                           OrgAddress.street_type,
                                           OrgAddress.public_place,
                                           OrgAddress.org_number,
                                           OrgAddress.complement,
                                           OrgAddress.neighborhood,
                                           OrgAddress.county,
                                           OrgAddress.country).update(req.params.id)
                                                                                  
    return await response.then(__ => res.status(201)
                                        .json({ 
                                            msg: 'organization address saved' 
                                        }))
                                        .catch(__ => res.status(500)
                                                        .json({ 
                                                            error: 'i am sorry, there is an error with server'+__ 
                                                        }))                                         
})

orgAddressController.route('/org/address/get-all').get(async(req, res)=>{

    const response = new OrgAddressService().getAll()
    
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

orgAddressController.route('/org/address/get-by-id/:id').get(async(req, res)=>{

    const response = new OrgAddressService().getById(req.params.id)
    
    await response.then(data => {
    
        if(data.length === 0) return res.status(404)
                                        .json({ 
                                            error: 'organization address not found' 
                                        })
            
        return res.status(200).json(data)
    
        })
        .catch(__ => res.status(500)
                        .json({  
                            error: 'i am sorry, there is an error with server'  
                        }))
})

orgAddressController.route('/org/address/delete-by-id/:id').delete(async(req, res)=>{

    const OrgAddress = { ...req.params }

    const response = new OrgAddressService().deleteById(OrgAddress.id)
    
    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new OrgAddressService().verifyId(OrgAddress.id)

    const dataIdDbResponse = await verificationId.then(e => e)
    
    if(dataIdDbResponse === false) return res.status(404)
                                             .json({ 
                                                error: 'organization address not found' 
                                            }) 

    await response.then(__ => {
    
        return res.status(204).json({})
    
        })
        .catch(__ => res.status(500)
                        .json({  
                            error: 'i am sorry, there is an error with server'  
                        }))
})

export { orgAddressController }
