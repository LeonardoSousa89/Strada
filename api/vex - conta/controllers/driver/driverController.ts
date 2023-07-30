import express from 'express'
import DriverService from '../../services/driver/driverService'

import HandleError from '../../interface/error/handleError'
import { cryptograph } from '../../security/cryptography/bcrypt'

const driverController = express.Router()

const err = new HandleError()

driverController.route('/org/driver/save').post(async (req, res)=>{

   const Driver = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Driver.first_name, 'first name is undefined or null')
      err.exceptionFieldNullOrUndefined(Driver.last_name, 'last name is undefined or null')
      err.exceptionFieldNullOrUndefined(Driver.email, 'email place is undefined or null')
      err.exceptionFieldNullOrUndefined(Driver.password, 'password place is undefined or null')
  
      err.exceptionFieldIsEmpty(Driver.first_name.trim(), 'first name can not be empty')
      err.exceptionFieldIsEmpty(Driver.last_name.trim(), 'last name can not be empty')
      err.exceptionFieldIsEmpty(Driver.email.trim(), 'email place can not be empty')
      err.exceptionFieldIsEmpty(Driver.password.trim(), 'password place can not be empty')
      
      err.exceptionFieldValueLessToType(Driver.password, 'password can not be less than 4')
   }catch(e){

      return res.status(400).json({ error: e })
   }

   const emailIdExistsOnDb = await new DriverService().verifyEmail(Driver.email)

   if(emailIdExistsOnDb === true) return res.status(400)
                                                 .json({
                                                   error: 'email already exists'
                                                })

   Driver.password = cryptograph(Driver.password)
   
   try{

      const driverService = new DriverService(Driver.first_name, 
                                       Driver.last_name,
                                       Driver.email,
                                       Driver.password)

      await driverService.save()

      return res.status(201).json({ msg: 'driver saved' })

   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverController.route('/org/driver/update/:id').put(async (req, res)=>{

   const Driver = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Driver.first_name, 'first name is undefined or null')
      err.exceptionFieldNullOrUndefined(Driver.last_name, 'last name is undefined or null')
      err.exceptionFieldNullOrUndefined(Driver.email, 'email place is undefined or null')
      err.exceptionFieldNullOrUndefined(Driver.password, 'password place is undefined or null')
  
      err.exceptionFieldIsEmpty(Driver.first_name.trim(), 'first name can not be empty')
      err.exceptionFieldIsEmpty(Driver.last_name.trim(), 'last name can not be empty')
      err.exceptionFieldIsEmpty(Driver.email.trim(), 'email place can not be empty')
      err.exceptionFieldIsEmpty(Driver.password.trim(), 'password place can not be empty')
      
      err.exceptionFieldValueLessToType(Driver.password, 'password can not be less than 4')
   }catch(e){

      return res.status(400).json({ error: e })
   }

   Driver.password = cryptograph(Driver.password)
   
   try{

      const driverService = new DriverService(Driver.first_name, 
                                       Driver.last_name,
                                       Driver.email,
                                       Driver.password)

      await driverService.update(req.params.id)

      return res.status(201).json({ msg: 'driver update' })
   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverController.route('/org/driver/get-all').get(async (req, res)=>{

   const driverService = new DriverService()
   
   try{

      const data = await driverService.getAll()

      if(data.length === 0)  return res.status(404)
                                           .json({
                                             error: 'driver not found'
                                           }) 

      return res.status(200).json(data)

   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverController.route('/org/driver/get-by-id/:id').get(async (req, res)=>{

   const Driver ={ ...req.params }
   
   const driverService = new DriverService()  
   
   try{

       const data = await driverService.getById(Driver.id)

       if(data.length === 0) return res.status(404)
                                       .json({
                                           error: 'driver not found'
                                       })

       return res.status(200).json(data)
   }catch(__){
      
       return res.status(500)
                 .json({  
                   error: 'i am sorry, there is an error with server'  
               })
   }

})

driverController.route('/org/driver/delete-all').delete(async (req, res)=>{

   const driverService = new DriverService()

   try{

      const driverIdExistsOnDb = await driverService.getAll()

      if(driverIdExistsOnDb.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await driverService.deleteAll()

      return res.status(204).json({})

   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverController.route('/org/driver/delete-by-id/:id').delete(async (req, res)=>{

   const driverService = new DriverService()
   
   const Driver = { ...req.params }
   
   try{   

      const driverIdExistsOnDb = await driverService.getById(Driver.id)

      if(driverIdExistsOnDb.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'driver not found'
                                                         })

      await driverService.deleteById(Driver.id)

      return res.status(204).json({})

   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { driverController }
