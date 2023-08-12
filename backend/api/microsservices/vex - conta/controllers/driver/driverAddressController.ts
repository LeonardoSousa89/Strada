import express from 'express'

import HandleError from '../../interface/error/handleError'
import DriverAddressService from '../../services/driver/driverAddressService'
import axios from 'axios'
import * as dotenv from 'dotenv' 
import RedisOperations from '../../repositories/redis/cache/services/redis.cache.operation'

dotenv.config()

const driverAddressController = express.Router()

const err = new HandleError()

driverAddressController.route('/org/driver/address/search/zip-code').get(async (req, res)=>{

   const DriverAddress = { ...req.query }

   if(!DriverAddress.ZipCode) return res.status(400).json({error: 'query params required'})

   try{

      const url = `${process.env.CEP_API_URL_BASE}/api/cep/v2/{DriverAddress.ZipCode}`
      
      const verifyZipCode = new DriverAddressService()
      
      const getZipCode = await verifyZipCode.getZipCode(axios, url)

      return res.status(200).json(getZipCode)
   }catch(__){

      return res.status(500)
                .json({ 
                  error: 'i am sorry, there is an error with server'
               })
   }
})

driverAddressController.route('/org/driver/address/save').post(async (req, res)=>{

   const DriverAddress = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(DriverAddress.zip_code, 'zip code is undefined or null')
      err.exceptionFieldNullOrUndefined(DriverAddress.state, 'state is undefined or null')
      err.exceptionFieldNullOrUndefined(DriverAddress.city, 'city is undefined or null')
  
      err.exceptionFieldIsEmpty(DriverAddress.zip_code.trim(), 'zip code can not be empty')
      err.exceptionFieldIsEmpty(DriverAddress.state.trim(), 'state can not be empty')
      err.exceptionFieldIsEmpty(DriverAddress.city.trim(), 'city can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   try{

      const driverAddressService = new DriverAddressService(DriverAddress.zip_code, 
                                       DriverAddress.state,
                                       DriverAddress.city)

      await driverAddressService.save()

      return res.status(201).json({ msg: 'driver address saved' })

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverAddressController.route('/org/driver/address/update/:id').put(async (req, res)=>{

   const DriverAddress = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(DriverAddress.zip_code, 'zip code is undefined or null')
      err.exceptionFieldNullOrUndefined(DriverAddress.state, 'state is undefined or null')
      err.exceptionFieldNullOrUndefined(DriverAddress.city, 'city is undefined or null')
  
      err.exceptionFieldIsEmpty(DriverAddress.zip_code.trim(), 'zip code can not be empty')
      err.exceptionFieldIsEmpty(DriverAddress.state.trim(), 'state can not be empty')
      err.exceptionFieldIsEmpty(DriverAddress.city.trim(), 'city can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   const driverAddressIdExistsOnDb = await new DriverAddressService()
                                                .verifyId(req.params.id)
   
   if(driverAddressIdExistsOnDb === false) return res.status(404)
                                                   .json({
                                                      error: 'driver not found'
                                                   }) 

   try{

      const driverAddressService = new DriverAddressService(DriverAddress.zip_code, 
                                       DriverAddress.state,
                                       DriverAddress.city)

      await driverAddressService.update(req.params.id)

      return res.status(201).json({ msg: 'driver address updated' })
   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverAddressController.route('/org/driver/address/get-all').get(async (req, res)=>{

   const driverAddressService = new DriverAddressService()

   const cache = new RedisOperations()
   
   try{
      
      cache.connection()

      const driverAddressFromCache = await cache.getCache(`driverAddress`)

      if(driverAddressFromCache) {

         const data = JSON.parse(driverAddressFromCache)
         
         res.status(200).json({
                             data: { inCache: 'yes', data }
                         })
          
         await cache.disconnection()
                         
         return
     }

      const data = await driverAddressService.getAll()

      if(data.length === 0){

         res.status(404).json({
                           error: 'no data'
                        }) 
         
         await cache.disconnection()

         return 
      }  

      await cache.setCache(`driverAddress`, JSON.stringify(data), 300)

      res.status(200).json({ 
                        data: { inCache: 'no', data }
                     })

      await cache.disconnection()

      return 

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverAddressController.route('/org/driver/address/get-by-id/:id').get(async(req, res)=>{

   const DriverAddress = { ...req.params }

   const driverAddressService = new DriverAddressService()
   
   const cache = new RedisOperations()

   try{

      cache.connection()

      const driverAddressFromCache = await cache.getCache(`driverAddress_${DriverAddress.id}`)

      if(driverAddressFromCache) {

          const data = JSON.parse(driverAddressFromCache)
          
          res.status(200).json({
                              data: { inCache: 'yes', data }
                          })
              
          await cache.disconnection()
                          
          return
      }

      const data = await driverAddressService.getById(DriverAddress.id)

      if(data.length === 0) {

         res.status(404).json({
                           error: 'driver address not found'
                        })
         
         await cache.disconnection()             
                        
         return 
      }

      await cache.setCache(`driverAddress_${DriverAddress.id}`, JSON.stringify(data), 300)

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

driverAddressController.route('/org/driver/address/delete-all').delete(async (req, res)=>{

   const driverAddressService = new DriverAddressService()
   
   try{
      
      const driverAddressExistsOrNotExists = await driverAddressService.getAll()

      if(driverAddressExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await driverAddressService.deleteAll()

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverAddressController.route('/org/driver/address/delete-by-id/:id').delete(async (req, res)=>{

   const DriverAddress = { ...req.params }
   
   const driverAddressService = new DriverAddressService()
   
   try{   

      const driverExistsOrNotExists = await driverAddressService.getById(DriverAddress.id)

      if(driverExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'driver address not found'
                                                         })

      await driverAddressService.deleteById(DriverAddress.id)

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { driverAddressController }
