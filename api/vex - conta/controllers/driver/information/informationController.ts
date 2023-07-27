import express from 'express'

import HandleError from '../../../interface/error/handleError'
import InformationService from '../../../services/driver/information/informationService'

const informationController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */

informationController.route('/org/driver/information/save').post(async (req, res)=>{

   const Driver = { ...req.body }

   try{
      err.exceptionFieldNullOrUndefined(Driver.plate, 'plate is undefined or null')
      err.exceptionFieldNullOrUndefined(Driver.notes, 'notes is undefined or null')
  
      err.exceptionFieldIsEmpty(Driver.plate.trim(), 'plate can not be empty')
      err.exceptionFieldIsEmpty(Driver.notes.trim(), 'notes can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }

   const startingKmOrFinalKmBothIsIlegalCondition = new InformationService()
                                                .verifyInformation(Driver.starting_km, 
                                                   Driver.final_km)
   
   if(startingKmOrFinalKmBothIsIlegalCondition === false)  return res.status(400)
                                                          .json({
                                                            error: 'starting km and final km both can not be empty or null'
                                                         })                                               

   try{

      const driverInformation = new InformationService(Driver.starting_km, 
                                       Driver.final_km,
                                       Driver.plate,
                                       Driver.notes)

      await driverInformation.save()

      return res.status(201).json({ msg: 'driver information save' })

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

informationController.route('/org/driver/information/get-all').get(async (req, res)=>{

   try{
      const driverInformation = new InformationService()

      const data = await driverInformation.getAll()

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

informationController.route('/org/driver/information/get-by-id/:id').get(async(req, res)=>{

   try{

      const driverInformation = new InformationService()
      const data = await driverInformation.getById(req.params.id)

      if(data.length === 0) return res.status(404)
                                      .json({
                                          error: 'driver information not found'
                                       })

      return res.status(200).json(data)
   }catch(__){

      return res.status(500)
                .json({ 
                  error: 'i am sorry, there is an error with server' 
               })

   }
})

informationController.route('/org/driver/information/delete-all').delete(async (req, res)=>{

   try{
      const driverInformation = new InformationService()

      const driverInformationExistsOrNotExists = await driverInformation.getAll()

      if(driverInformationExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await driverInformation.deleteAll()

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

informationController.route('/org/driver/information/delete-by-id/:id').delete(async (req, res)=>{

   const Driver = { ...req.params }
   
   try{
      
      const driverInformation = new InformationService()

      const driverInformationExistsOrNotExists = await driverInformation.getById(Driver.id)

      if(driverInformationExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'driver information not found'
                                                         })

      await driverInformation.deleteById(Driver.id)

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { informationController }
