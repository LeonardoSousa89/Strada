import express from 'express'
import OrgAddressService from '../../services/org/orgAddressServices'
import HandleError from '../../interface/error/handleError'

const orgAddressController = express.Router()

const err = new HandleError()

/**
 * erro do knex-paginate usado em mais de um arquivo:
 * 
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */

orgAddressController.route('/org/address/save').post(async(req, res)=> {

    const OrgAddress = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(OrgAddress.zip_code, 'zip code is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.street_type, 'street type is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.public_place, 'public place is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.number, 'number is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.neighborhood, 'neighborhood is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.county, 'county is undefined or null')
        err.exceptionFieldNullOrUndefined(OrgAddress.country, 'country is undefined or null')
    
        err.exceptionFieldIsEmpty(OrgAddress.zip_code.trim(), 'zip code can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.street_type.trim(), 'street type can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.public_place.trim(), 'public place can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.number.trim(), 'number can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.neighborhood.trim(), 'neighborhood can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.county.trim(), 'county can not be empty')
        err.exceptionFieldIsEmpty(OrgAddress.country.trim(), 'country can not be empty')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const response = new OrgAddressService(OrgAddress.zip_code,
                                           OrgAddress.street_type,
                                           OrgAddress.public_place,
                                           OrgAddress.number,
                                           OrgAddress.complement,
                                           OrgAddress.neighborhood,
                                           OrgAddress.county,
                                           OrgAddress.country).save()

    return await response.then(__ => res.status(201)
                                        .json({ 
                                            msg: 'organization address saved' 
                                        }))
                                        .catch(__ => res.status(500)
                                                        .json({ 
                                                            error: 'i am sorry, there is an error with server' 
                                            }))                                         
})

export { orgAddressController }
