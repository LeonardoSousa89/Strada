import express from 'express'
import DriverAddressRelationTableService from '../../../services/driver/relations/driveAddressRelationTableService'
import HandleError from '../../../interface/error/handleError'
import DriverService from '../../../services/driver/driverService'
import DriverContactService from '../../../services/driver/driverContactService'
import OrgService from '../../../services/org/orgService'
import DriverContactRelationTableService from '../../../services/driver/relations/driverContactRelationTableService'

const driverContactRelationTableController = express.Router()

const err = new HandleError()

driverContactRelationTableController.route('/org/driver/contact/relation-table/save').post(async(req, res)=> {

    const Driver = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(Driver.driver_contact_relation_id, 'driver contact id is undefined or null')
        err.exceptionFieldNullOrUndefined(Driver.driver_relation_id, 'driver id is undefined or null')
        err.exceptionFieldNullOrUndefined(Driver.org_relation_id, 'org id is undefined or null')
      
        err.exceptionFieldIsEqualZero(Driver.driver_contact_relation_id, 'driver contact id code can not be 0')
        err.exceptionFieldIsEqualZero(Driver.driver_relation_id, 'driver id can not be 0')
        err.exceptionFieldIsEqualZero(Driver.org_relation_id, 'org id can not be 0')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const verifyDriverIdExixts = await new DriverService().verifyId(Driver.driver_relation_id)

    if(verifyDriverIdExixts == false) return res.status(404)
                                             .json({
                                                error: "driver id not found"
                                            })
    
    const verifyDriverContactIdExixts = await new DriverContactService().verifyId(Driver.driver_contact_relation_id)

    if(verifyDriverContactIdExixts == false) return res.status(404)
                                              .json({
                                                    error: "driver contact id not found"
                                                })     
                                                
    const verifyOrgIdExixts = await new OrgService().verifyId(Driver.org_relation_id)

    if(verifyOrgIdExixts == false) return res.status(404)
                                              .json({
                                                    error: "org id not found"
                                                })                                             
    
    const verifyRelationshipExists = await new DriverContactRelationTableService()
                                                    .verifyRelationshipExists(Driver.driver_contact_relation_id)

    if(verifyRelationshipExists == true) return res.status(400)
                                                   .json({ 
                                                        error: "relationship already exists"
                                                    })

    try{

        const driverAndContactRelation = new DriverContactRelationTableService(Driver.driver_contact_relation_id,
                                               Driver.driver_relation_id,
                                               Driver.org_relation_id)
        
        await driverAndContactRelation.save()
        
        return res.status(201)
                  .json({ 
                        msg: 'driver contact relation saved' 
                    })
    }catch(__){

        return res.status(500)
                  .json({ 
                        error: 'i am sorry, there is an error with server' 
                    })                                         
    }
})


driverContactRelationTableController.route('/org/driver/contact/relation-table/get-all').get(async(req, res)=>{

    const driverAndContactRelation = new DriverContactRelationTableService()
    
    try{
    
        const data = await driverAndContactRelation.getAll()
                
        if(data.length === 0) return res.status(404)
                                        .json({
                                            error: 'no data relationship'
                                        })

        return res.status(200).json(data)
    }catch(__){

        return res.status(500)
                  .json({  
                    error: 'i am sorry, there is an error with server'  
                })
    }
})  


export { driverContactRelationTableController }
