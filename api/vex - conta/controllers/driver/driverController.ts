import axios from 'axios'
import express from 'express'
import DriverService from '../../services/driver/driverService'

import HandleError from '../../interface/error/handleError'
import { cryptograph } from '../../security/cryptography/bcrypt'

const driverController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
driverController.route('/org/driver/save').post(async (req, res)=>{

   const Org = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Org.first_name, 'first name is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.last_name, 'last name is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.email, 'email place is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.password, 'password place is undefined or null')
  
      err.exceptionFieldIsEmpty(Org.first_name.trim(), 'first name can not be empty')
      err.exceptionFieldIsEmpty(Org.last_name.trim(), 'last name can not be empty')
      err.exceptionFieldIsEmpty(Org.email.trim(), 'email place can not be empty')
      err.exceptionFieldIsEmpty(Org.password.trim(), 'password place can not be empty')
      
      err.exceptionFieldValueLessToType(Org.password, 'password can not be less than 4')
   }catch(e){

      return res.status(400).json({ error: e })
   }

   const emailExistsOrNotExists = await new DriverService().verifyEmail(Org.email)

   if(emailExistsOrNotExists === true) return res.status(400)
                                                 .json({
                                                   error: 'email already exists'
                                                })

   Org.password = cryptograph(Org.password)
   
   try{

      const driver = new DriverService(Org.first_name, 
                                       Org.last_name,
                                       Org.email,
                                       Org.password)

      await driver.save()

      return res.status(201).json({ msg: 'driver saved' })

   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverController.route('/org/driver/update/:id').put(async (req, res)=>{

   const Org = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Org.first_name, 'first name is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.last_name, 'last name is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.email, 'email place is undefined or null')
      err.exceptionFieldNullOrUndefined(Org.password, 'password place is undefined or null')
  
      err.exceptionFieldIsEmpty(Org.first_name.trim(), 'first name can not be empty')
      err.exceptionFieldIsEmpty(Org.last_name.trim(), 'last name can not be empty')
      err.exceptionFieldIsEmpty(Org.email.trim(), 'email place can not be empty')
      err.exceptionFieldIsEmpty(Org.password.trim(), 'password place can not be empty')
      
      err.exceptionFieldValueLessToType(Org.password, 'password can not be less than 4')
   }catch(e){

      return res.status(400).json({ error: e })
   }

   Org.password = cryptograph(Org.password)
   
   try{

      const driver = new DriverService(Org.first_name, 
                                       Org.last_name,
                                       Org.email,
                                       Org.password)

      await driver.update(req.params.id)

      return res.status(201).json({ msg: 'driver update' })
   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverController.route('/org/driver/get-all').get(async (req, res)=>{

   try{
      const driver = new DriverService()

      const data = await driver.getAll()

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

driverController.route('/org/driver/delete-all').delete(async (req, res)=>{

   try{
      const driver = new DriverService()

      const driverExistsOrNotExists = await driver.getAll()

      if(driverExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await driver.deleteAll()

      return res.status(204).json({})

   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverController.route('/org/driver/delete-by-id/:id').delete(async (req, res)=>{

   const Org = { ...req.params }
   
   try{
      
      const driver = new DriverService()

      const driverExistsOrNotExists = await driver.getById(Org.id)

      if(driverExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'driver not found'
                                                         })

      await driver.deleteById(Org.id)

      return res.status(204).json({})

   }catch(e){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { driverController }
