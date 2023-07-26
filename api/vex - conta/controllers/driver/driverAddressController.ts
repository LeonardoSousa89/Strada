import express from 'express'

import HandleError from '../../interface/error/handleError'
import DriverAddressService from '../../services/driver/driverAddressService'
import axios from 'axios'

const driverAddressController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
driverAddressController.route('/org/driver/address/search/zip-code').get(async (req, res)=>{

   const Org = { ...req.query }

   if(!Org.ZipCode) return res.status(400).json({error: 'query params required'})

   try{

      const url = `https://brasilapi.com.br/api/cep/v2/${Org.ZipCode}`
   
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

   const Org = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Org.zip_code, 'zip code is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.state, 'state is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.city, 'city is undefined or null')
  
      err.exceptionFieldIsEmpty(Org.zip_code.trim(), 'zip code can not be empty')
      err.exceptionFieldIsEmpty(Org.state.trim(), 'state can not be empty')
      err.exceptionFieldIsEmpty(Org.city.trim(), 'city can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   try{

      const driverAddress = new DriverAddressService(Org.zip_code, 
                                       Org.state,
                                       Org.city)

      await driverAddress.save()

      return res.status(201).json({ msg: 'driver address saved' })

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverAddressController.route('/org/driver/address/update/:id').put(async (req, res)=>{

   const Org = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Org.zip_code, 'zip code is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.state, 'state is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.city, 'city is undefined or null')
  
      err.exceptionFieldIsEmpty(Org.zip_code.trim(), 'zip code can not be empty')
      err.exceptionFieldIsEmpty(Org.state.trim(), 'state can not be empty')
      err.exceptionFieldIsEmpty(Org.city.trim(), 'city can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   try{

      const driverAddress = new DriverAddressService(Org.zip_code, 
                                       Org.state,
                                       Org.city)

      await driverAddress.update(req.params.id)

      return res.status(201).json({ msg: 'driver address update' })
   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverAddressController.route('/org/driver/address/get-all').get(async (req, res)=>{

   try{
      const driverAddress = new DriverAddressService()

      const data = await driverAddress.getAll()

      if(data.length === 0)  return res.status(404)
                                           .json({
                                             error: 'no data'
                                           }) 

      return res.status(200).json(data)

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverAddressController.route('/org/driver/address/get-by-id/:id').get(async(req, res)=>{

   try{

      const driverAddress = new DriverAddressService()
      const data = await driverAddress.getById(req.params.id)

      if(data.length === 0) return res.status(404)
                                      .json({
                                          error: 'driver address not found'
                                       })

      return res.status(200).json(data)
   }catch(__){

      return res.status(500)
                .json({ 
                  error: 'i am sorry, there is an error with server' 
               })

   }
})

driverAddressController.route('/org/driver/address/delete-all').delete(async (req, res)=>{

   try{
      const driverAddress = new DriverAddressService()

      const driverAddressExistsOrNotExists = await driverAddress.getAll()

      if(driverAddressExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await driverAddress.deleteAll()

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverAddressController.route('/org/driver/address/delete-by-id/:id').delete(async (req, res)=>{

   const Org = { ...req.params }
   
   try{
      
      const driverAddress = new DriverAddressService()

      const driverExistsOrNotExists = await driverAddress.getById(Org.id)

      if(driverExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'driver address not found'
                                                         })

      await driverAddress.deleteById(Org.id)

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { driverAddressController }
