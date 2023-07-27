import express from 'express'

import HandleError from '../../interface/error/handleError'
import DriverDocumentService from '../../services/driver/driverDocumentService'

const driverDocumentController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
driverDocumentController.route('/org/driver/document/save').post(async (req, res)=>{

   const Driver = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Driver.cnh, 'document is undefined or null')

      err.exceptionFieldIsEmpty(Driver.cnh.trim(), 'document can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   const driverDocumentExistsOrNotExists = await new DriverDocumentService()
                                                         .verifyDocument(Driver.cnh)

   if(driverDocumentExistsOrNotExists === true) return res.status(400)
                                                            .json({
                                                               error: 'driver document already exists'
                                                            })

   try{

      const driverDocument = new DriverDocumentService(Driver.cnh)

      await driverDocument.save()

      return res.status(201).json({ msg: 'driver document save' })

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverDocumentController.route('/org/driver/document/update/:id').put(async (req, res)=>{

   const Driver = { ...req.body }

   try{

      err.exceptionFieldNullOrUndefined(Driver.cnh, 'document is undefined or null')
  
      err.exceptionFieldIsEmpty(Driver.cnh.trim(), 'document can not be empty')
   }catch(e){

      return res.status(400).json({ error: e })
   }
   
   const driverDocumentExistsOrNotExists = await new DriverDocumentService()
                                                         .verifyId(req.params.id)

   if(driverDocumentExistsOrNotExists === false) return res.status(404)
                                                            .json({
                                                               error: 'driver document not found'
                                                            })

   try{

      const driverDocument = new DriverDocumentService(Driver.telephone)

      await driverDocument.update(req.params.id)

      return res.status(201).json({ msg: 'driver document update' })
   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverDocumentController.route('/org/driver/document/get-all').get(async (req, res)=>{

   try{
      const driverDocument = new DriverDocumentService()

      const data = await driverDocument.getAll()

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

driverDocumentController.route('/org/driver/document/get-by-id/:id').get(async(req, res)=>{

   try{

      const driverDocument = new DriverDocumentService()
      const data = await driverDocument.getById(req.params.id)

      if(data.length === 0) return res.status(404)
                                      .json({
                                          error: 'driver document not found'
                                       })

      return res.status(200).json(data)
   }catch(__){

      return res.status(500)
                .json({ 
                  error: 'i am sorry, there is an error with server' 
               })

   }
})

driverDocumentController.route('/org/driver/document/delete-all').delete(async (req, res)=>{

   try{
      const driverDocument = new DriverDocumentService()

      const driverDocumentExistsOrNotExists = await driverDocument.getAll()

      if(driverDocumentExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'no data'
                                                         })

      await driverDocument.deleteAll()

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

driverDocumentController.route('/org/driver/document/delete-by-id/:id').delete(async (req, res)=>{

   const Driver = { ...req.params }
   
   try{
      
      const driverDocument = new DriverDocumentService()

      const driverDocumentExistsOrNotExists = await driverDocument.getById(Driver.id)

      if(driverDocumentExistsOrNotExists.length === 0) return res.status(404)
                                                         .json({
                                                            error: 'driver document not found'
                                                         })

      await driverDocument.deleteById(Driver.id)

      return res.status(204).json({})

   }catch(__){

      return res.status(500)
                .json({ error: 'i am sorry, there is an error with server' })
   }
})

export { driverDocumentController }
