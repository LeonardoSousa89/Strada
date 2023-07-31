import express from 'express'

import HandleError from '../../../interface/error/handleError'
import InformationService from '../../../services/driver/information/informationService'

const informationController = express.Router()

const err = new HandleError()

informationController.route('/org/driver/information/save').post(async (req, res)=>{

   const Information = { ...req.body }

   try{
      err.exceptionFieldNullOrUndefined(Information.plate, 'plate is undefined or null')
      err.exceptionFieldNullOrUndefined(Information.notes, 'notes is undefined or null')
  
      err.exceptionFieldIsEmpty(Information.plate.trim(), 'plate can not be empty')
      err.exceptionFieldIsEmpty(Information.notes.trim(), 'notes can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }

   const startingKmOrFinalKmBothIsIlegalCondition = new InformationService()
                                                .verifyInformation(Information.starting_km, 
                                                   Information.final_km)
   
   if(startingKmOrFinalKmBothIsIlegalCondition === false)  return res.status(400)
                                                          .json({
                                                            error: 'starting km and final km both can not be empty or null'
                                                         })                                               

   try{

      const date_time_registry = new InformationService().getTime()

      const informationService = new InformationService(Information.starting_km, 
                                       Information.final_km,
                                       Information.plate,
                                       Information.notes,
                                       date_time_registry)

      await informationService.save()

      return res.status(201).json({ msg: 'driver information saved' })

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

informationController.route('/org/driver/information/get-all').get(async (req, res)=>{

   const informationService = new InformationService()
   
   try{

      const data = await informationService.getAll()

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

   const Information = { ...req.params }

   const informationService = new InformationService()
   
   try{

      const data = await informationService.getById(Information.id)

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

   const informationService = new InformationService()
   
   try{

      const driverInformationExistsOrNotExists = await informationService.getAll()

      if(driverInformationExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await informationService.deleteAll()

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

informationController.route('/org/driver/information/delete-by-id/:id').delete(async (req, res)=>{

   const Information = { ...req.params }
   
   const informationService = new InformationService()
   
   try{

      const driverInformationExistsOrNotExists = await informationService.getById(Information.id)

      if(driverInformationExistsOrNotExists.length === 0) return res.status(404)
                                                                    .json({
                                                                        error: 'driver information not found'
                                                                  })

      await informationService.deleteById(Information.id)

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { informationController }
