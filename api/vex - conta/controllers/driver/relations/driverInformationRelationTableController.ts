import express from 'express'
import driverInformationRelationTableService from '../../../services/driver/relations/driverInformationRelationTableService'
import HandleError from '../../../interface/error/handleError'
import DriverService from '../../../services/driver/driverService'
import InformationService from '../../../services/driver/information/informationService'
import OrgService from '../../../services/org/orgService'

const driverInformationRelationTableController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
*/

driverInformationRelationTableController.route('/org/driver/information/relation-table/save').post(async(req, res)=> {

    const Driver = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(Driver.driver_relation_id, 'driver id is undefined or null')
        err.exceptionFieldNullOrUndefined(Driver.information_relation_id, 'driver information id is undefined or null')
        err.exceptionFieldNullOrUndefined(Driver.org_relation_id, 'org id is undefined or null')
      
        err.exceptionFieldIsEqualZero(Driver.driver_relation_id, 'driver id can not be 0')
        err.exceptionFieldIsEqualZero(Driver.information_relation_id, 'driver information id can not be 0')
        err.exceptionFieldIsEqualZero(Driver.org_relation_id, 'org id can not be 0')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const verifyDriverIdExixts = await new DriverService()
                                            .verifyId(Driver.driver_relation_id)

    if(verifyDriverIdExixts == false) return res.status(404)
                                             .json({
                                                error: "driver id not found"
                                            })
    
    const verifyInformationIdExixts = await new InformationService()
                                                    .verifyId(Driver.information_relation_id)

    if(verifyInformationIdExixts == false) return res.status(404)
                                              .json({
                                                    error: "driver information id not found"
                                                })     
                                                
    const verifyOrgIdExixts = await new OrgService().verifyId(Driver.org_relation_id)

    if(verifyOrgIdExixts == false) return res.status(404)
                                              .json({
                                                    error: "org id not found"
                                                })                                             
    
    try{

        const driverAndInformationRelation = new driverInformationRelationTableService(Driver.driver_relation_id,
                                               Driver.information_relation_id,
                                               Driver.org_relation_id)
        
        await driverAndInformationRelation.save()
        
        return res.status(201)
                  .json({ 
                        msg: 'driver information relation save' 
                    })
    }catch(__){

        return res.status(500)
                  .json({ 
                        error: 'i am sorry, there is an error with server' 
                    })                                         
    }
})


driverInformationRelationTableController.route('/org/driver/information/relation-table/get-all').get(async(req, res)=>{

    try{

        const driverAndInformationRelation = new driverInformationRelationTableService()
    
        const data = await driverAndInformationRelation.getAll()
                
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


export { driverInformationRelationTableController }
