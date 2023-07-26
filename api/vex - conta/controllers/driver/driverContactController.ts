import express from 'express'

import HandleError from '../../interface/error/handleError'
import DriverContactService from '../../services/driver/driverContactService'

const driverContactController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
driverContactController.route('/org/driver/contact/save').post(async (req, res)=>{

   const Driver = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Driver.telephone, 'telephone is undefined or null')

      err.exceptionFieldIsEmpty(Driver.telephone.trim(), 'telephone can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   try{

      const driverContact = new DriverContactService(Driver.telephone)

      await driverContact.save()

      return res.status(201).json({ msg: 'driver telephone save' })

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverContactController.route('/org/driver/contact/update/:id').put(async (req, res)=>{

   const Driver = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Driver.telephone, 'telephone is undefined or null')
  
      err.exceptionFieldIsEmpty(Driver.telephone.trim(), 'telephone can not be empty')
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

      const driverContact = new DriverContactService(Driver.telephone)

      await driverContact.update(req.params.id)

      return res.status(201).json({ msg: 'driver telephone update' })
   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverContactController.route('/org/driver/contact/get-all').get(async (req, res)=>{

   try{
      const driverContact = new DriverContactService()

      const data = await driverContact.getAll()

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

   try{

      const driverContact = new DriverContactService()
      const data = await driverContact.getById(req.params.id)

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

   try{
      const driverContact = new DriverContactService()

      const driverContactExistsOrNotExists = await driverContact.getAll()

      if(driverContactExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await driverContact.deleteAll()

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverContactController.route('/org/driver/contact/delete-by-id/:id').delete(async (req, res)=>{

   const Driver = { ...req.params }
   
   try{
      
      const driverContact = new DriverContactService()

      const driverExistsOrNotExists = await driverContact.getById(Driver.id)

      if(driverExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'driver telephone not found'
                                                         })

      await driverContact.deleteById(Driver.id)

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { driverContactController }
