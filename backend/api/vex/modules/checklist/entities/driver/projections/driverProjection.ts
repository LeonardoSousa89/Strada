const driverProjection: Array<string> = [

    'driver.driver_id',
    'driver.first_name',
    'driver.last_name',
    'driver.email'
]

const driverAddressProjection: Array<string> = [

    'driver_address.driver_address_id',
    'driver_address.zip_code ',
    'driver_address.state',
    'driver_address.city'
]

const driverContactProjection: Array<string> = [

    'driver_contact.driver_contact_id',
    'driver_contact.telephone'
]

const driverDocumentProjection: Array<string> = [
    
    'driver_document.driver_document_id',
    'driver_document.cnh'
]

export { driverProjection,
         driverAddressProjection,
         driverContactProjection,
         driverDocumentProjection } 