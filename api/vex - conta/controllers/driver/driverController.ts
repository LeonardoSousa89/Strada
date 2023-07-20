import express from 'express'

const driverController = express.Router()

driverController.route('/driver/test').get(async (req, res)=>{

   res.status(200).send('driver')
})

export { driverController }
