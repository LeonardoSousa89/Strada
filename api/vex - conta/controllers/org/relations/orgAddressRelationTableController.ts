import express from 'express'
import OrgAddressRelationTableService from '../../../services/org/relations/orgAddressRelationTableService'
import HandleError from '../../../interface/error/handleError'
import OrgService from '../../../services/org/orgService'
import OrgAddressService from '../../../services/org/orgAddressService'

const orgAddressRelationTableController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */

orgAddressRelationTableController.route('/org/address/relation-table/save').post(async(req, res)=> {

    const Org = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(Org.org_address_id, 'org address id is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.org_id, 'org id is undefined or null')
    
        err.exceptionFieldIsEqualZero(Org.org_address_id, 'org address id code can not be 0')
        err.exceptionFieldIsEqualZero(Org.org_id, 'org id can not be 0')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const verifyOrgIdExixts = await new OrgService().verifyId(Org.org_id)

    if(verifyOrgIdExixts == false) return res.status(404)
                                             .json({
                                                error: "organization id not found"
                                            })
    
    const verifyOrgAddressIdExixts = await new OrgAddressService().verifyId(Org.org_address_id)

    if(verifyOrgAddressIdExixts == false) return res.status(404)
                                              .json({
                                                    error: "organization address id not found"
                                                })                                                                

    const response = new OrgAddressRelationTableService(Org.org_address_id,
                                           Org.org_id).save()

    return await response.then(__ => res.status(201)
                                        .json({ 
                                            msg: 'organization address relation saved' 
                                        }))
                                        .catch(__ => res.status(500)
                                                        .json({ 
                                                            error: 'i am sorry, there is an error with server' 
                                                        }))                                         
})


orgAddressRelationTableController.route('/org/address/relation-table/get-all').get(async(req, res)=>{

    const response = new OrgAddressRelationTableService().getAll()
    
    await response.then(data => {
    
        if(data.length === 0) return res.status(404)
                                        .json({ 
                                            error: 'no data relationship' 
                                        })
            
        return res.status(200).json(data)
    
        })
        .catch(__ => res.status(500)
                        .json({  
                            error: 'i am sorry, there is an error with server'  
                        }))
})  


export { orgAddressRelationTableController }
