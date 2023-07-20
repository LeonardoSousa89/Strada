import express, { response } from 'express'
import OrgService from '../../services/org/orgService'
import HandleError from '../../interface/error/handleError'

const orgController = express.Router()

const err = new HandleError()

orgController.route('/org/save').post(async (req, res)=>{

    const Org = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(Org.fantasy_name, 'fantasy name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.corporate_name, 'corporate name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnpj, 'cnpj is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.org_status, 'org status is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, 'cnae main code is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.open_date, 'open date is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.password, 'password is undefined or null')

        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), 'fantasy name can not be empty')
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), 'corporate name can not be empty')
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), 'cnpj can not be empty')
        err.exceptionFieldIsEmpty(Org.org_status.trim(), 'org status can not be empty')
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), 'cnae main code can not be empty')
        err.exceptionFieldIsEmpty(Org.open_date.trim(), 'open date can not be empty')
        err.exceptionFieldIsEmpty(Org.password.trim(), 'password can not be empty')
        
        err.exceptionFieldValueLessToType(Org.password.trim(), 'password must be greather than 4')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const response = new OrgService( 
                    Org.fantasy_name, 
                    Org.corporate_name,
                    Org.cnpj, 
                    Org.org_status, 
                    Org.cnae_main_code,
                    Org.open_date, 
                    Org.password).save()
        
    await response.then(__ => res.status(201).json({ msg: 'organization created' }))
})

orgController.route('/org/update/:id').put(async (req, res)=>{

    const Org = { ...req.body } 

    try{

        err.exceptionFieldNullOrUndefined(Org.fantasy_name, 'fantasy name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.corporate_name, 'corporate name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnpj, 'cnpj is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.org_status, 'org status is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, 'cnae main code is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.open_date, 'open date is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.password, 'password is undefined or null')

        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), 'fantasy name can not be empty')
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), 'corporate name can not be empty')
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), 'cnpj can not be empty')
        err.exceptionFieldIsEmpty(Org.org_status.trim(), 'org status can not be empty')
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), 'cnae main code can not be empty')
        err.exceptionFieldIsEmpty(Org.open_date.trim(), 'open date can not be empty')
        err.exceptionFieldIsEmpty(Org.password.trim(), 'password can not be empty')
        
        err.exceptionFieldValueLessToType(Org.password.trim(), 'password must be greather than 4')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const response = new OrgService(  
                    Org.fantasy_name, 
                    Org.corporate_name,
                    Org.cnpj, 
                    Org.org_status, 
                    Org.cnae_main_code,
                    Org.open_date, 
                    Org.password).update(req.params.id)

    await response.then(__ => res.status(201).json({ msg: 'organization updated' }))
})

orgController.route('/org/get-all').get(async (req, res)=>{

    const response = new OrgService().getAll()

    await response.then(data => res.status(200).json(data))
})

orgController.route('/org/get-by-id/:id').get(async (req, res)=>{

    const response = new OrgService().getById(req.params.id)  
    
    await response.then(data => res.status(200).json(data))
})

orgController.route('/org/delete-by-id/:id').delete(async (req, res)=>{

    const response = new OrgService().deleteByid(req.params.id)  
    
    await response.then(__ => res.status(204).json())
})

export { orgController }
