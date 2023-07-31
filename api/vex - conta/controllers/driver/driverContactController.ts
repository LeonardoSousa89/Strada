import express from 'express'

import HandleError from '../../interface/error/handleError'
import DriverContactService from '../../services/driver/driverContactService'

const driverContactController = express.Router()

const err = new HandleError()

driverContactController.route('/org/driver/contact/save').post(async (req, res)=>{

   const DriverContact = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(DriverContact.telephone, 'telephone is undefined or null')

      err.exceptionFieldIsEmpty(DriverContact.telephone.trim(), 'telephone can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   try{

      const driverContactService = new DriverContactService(DriverContact.telephone)

      await driverContactService.save()

      return res.status(201).json({ msg: 'driver telephone save' })

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverContactController.route('/org/driver/contact/update/:id').put(async (req, res)=>{

   const DriverContact = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(DriverContact.telephone, 'telephone is undefined or null')
  
      err.exceptionFieldIsEmpty(DriverContact.telephone.trim(), 'telephone can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   const driverTelephoneExistsOrNotExists = await new DriverContactService()
                                                         .verifyId(req.params.id)

   if(driverTelephoneExistsOrNotExists === false) return res.status(404)
                                                            .json({
                                                               error: 'driver telephone not found'
                                                            })

   try{

      const driverContactService = new DriverContactService(DriverContact.telephone)

      await driverContactService.update(req.params.id)

      return res.status(201).json({ msg: 'driver telephone update' })
   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverContactController.route('/org/driver/contact/get-all').get(async (req, res)=>{

   try{
      const driverContactService = new DriverContactService()

      const data = await driverContactService.getAll()

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

driverContactController.route('/org/driver/contact/get-by-id/:id').get(async(req, res)=>{

   const DriverContact = { ...req.params }

   const driverContactService = new DriverContactService()
   
   try{

      const data = await driverContactService.getById(DriverContact.id)

      if(data.length === 0) return res.status(404)
                                      .json({
                                          error: 'driver telephone not found'
                                       })

      return res.status(200).json(data)
   }catch(__){

      return res.status(500)
                .json({ 
                  error: 'i am sorry, there is an error with server' 
               })

   }
})

driverContactController.route('/org/driver/contact/delete-all').delete(async (req, res)=>{

   const driverContactService = new DriverContactService()

   try{

      const driverContactExistsOrNotExists = await driverContactService.getAll()

      if(driverContactExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await driverContactService.deleteAll()

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverContactController.route('/org/driver/contact/delete-by-id/:id').delete(async (req, res)=>{

   const DriverContact = { ...req.params }
   
   const driverContactService = new DriverContactService()

   try{  

      const driverExistsOrNotExists = await driverContactService.getById(DriverContact.id)

      if(driverExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'driver telephone not found'
                                                         })

      await driverContactService.deleteById(DriverContact.id)

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { driverContactController }
