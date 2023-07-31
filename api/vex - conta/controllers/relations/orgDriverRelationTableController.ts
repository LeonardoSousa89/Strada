import express from 'express'
import HandleError from '../../interface/error/handleError'
import OrgService from '../../services/org/orgService'
import DriverService from '../../services/driver/driverService'
import OrgDriverRelationTableService from '../../services/relations/OrgDriverRelationTableService'

const orgDriverRelationTableController = express.Router()

const err = new HandleError()

orgDriverRelationTableController.route('/org/driver/relation-table/save').post(async(req, res)=> {

    const Org = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(Org.driver_relation_id, 'org driver id is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.org_relation_id, 'org id is undefined or null')
    
        err.exceptionFieldIsEqualZero(Org.driver_relation_id, 'org driver id code can not be 0')
        err.exceptionFieldIsEqualZero(Org.org_relation_id, 'org id can not be 0')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const verifyOrgIdExixts = await new OrgService()
                                            .verifyId(Org.org_relation_id)

    if(verifyOrgIdExixts == false) return res.status(404)
                                             .json({
                                                error: "organization id not found"
                                            })
    
    const verifyOrgContactIdExixts = await new DriverService()
                                                    .verifyId(Org.driver_relation_id)

    if(verifyOrgContactIdExixts == false) return res.status(404)
                                                    .json({
                                                        error: "organization driver id not found"
                                                     })                                                                
    
    const verifyRelationIdExists = await new OrgDriverRelationTableService()
                                                .verifyRelationIdExists(Org.driver_relation_id)

    if(verifyRelationIdExists == true) return res.status(404)
                                                 .json({
                                                        error: "relationship already exists"
                                                    })  

    try{
                                                        
        const driverAndOrganizationRelationShip = new OrgDriverRelationTableService(Org.driver_relation_id,
                                                                                    Org.org_relation_id)

        await driverAndOrganizationRelationShip.save()    

        return res.status(201).json({
                                    msg: 'organizaton driver relationship save'
                                })
    }catch(e){

        return res.status(500)
                  .json({
                    error: 'i am sorry, there is an error with server'
                })
    }
})


orgDriverRelationTableController.route('/org/driver/relation-table/get-all').get(async(req, res)=>{

    const driver = new OrgDriverRelationTableService()
    
    try{

        const data = await driver.getAll()

        if(data.length === 0) return res.status(404)
                                        .json({
                                            error: 'no data relashionship'    
                                        })

        return res.status(200).json(data)
    }catch(e){

        return res.status(500)
                  .json({
                    error: 'i am sorry, there is an error with server'
                })
    }
    
})  


export { orgDriverRelationTableController }
