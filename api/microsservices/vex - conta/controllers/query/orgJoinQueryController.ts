import express from 'express'
import OrgJoinQueryService from '../../services/query/orgJoinQueryService'
import HandleError from '../../interface/error/handleError'

const OrgJoinQueryController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
OrgJoinQueryController.route('/org/join/data').get(async(req, res)=>{

    const Org = { ...req.query }

    if(!Org.org_id) return res.status(400)
                              .json({
                                    error: 'query params required'
                                })

    const response = new OrgJoinQueryService().getById(Number(Org.org_id))
    
    await response.then(data => {

        if(data.data.organization.length === 0) return res.status(404)
                                                          .json({
                                                            error: 'organization not found'
                                                          })

        return res.status(200).json(data)
    
        })
        .catch(__ => res.status(500)
                        .json({  
                            error: 'i am sorry, there is an error with server'
                        }))
})

export { OrgJoinQueryController }
