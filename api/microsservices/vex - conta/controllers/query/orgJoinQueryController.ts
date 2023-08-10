import express from 'express'
import OrgJoinQueryService from '../../services/query/orgJoinQueryService'
import RedisOperations from '../../repositories/redis/cache/services/redis.cache.operation'

const OrgJoinQueryController = express.Router()

OrgJoinQueryController.route('/org/join/data').get(async(req, res)=>{

    const Org = { ...req.query }

    const orgJoinQueryService = new OrgJoinQueryService()
    
    const cache = new RedisOperations()

    if(!Org.org_id) return res.status(400)
                              .json({
                                    error: 'query params required'
                                })

    try{

        cache.connection()

        const orgJoinDataFromCache = await cache.getCache(`org_join_data_${Org.org_id}`)

        if(orgJoinDataFromCache) {

            const data = JSON.parse(orgJoinDataFromCache)
            
            res.status(200).json({
                                data: {
                                inCache: 'yes',
                                data 
                                }
                            })
             
                            
            await cache.disconnection()
                            
            return
        }
        
        const data = await orgJoinQueryService.getById(Number(Org.org_id))                        

        if(data.data.organization.length === 0){ 
            
            res.status(404).json({
                                error: 'organization not found'
                            })
            
            await cache.disconnection()
            
            return
        }

        await cache.setCache(`org_join_data_${Org.org_id}`, JSON.stringify(data), 300)

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

export { OrgJoinQueryController }
