const joinDriverAndAddressProjection: Array<string> = [

    'driver_address.driver_address_id',
    'driver_address.zip_code ',
    'driver_address.state',
    'driver_address.city',
    'driver.driver_id'
]

const joinDriverAndContactProjection: Array<string> = [

    'driver_contact.driver_contact_id',
    'driver_contact.telephone',
    'driver.driver_id'
]

const joinDriverAndDocumentProjection: Array<string> = [

    'driver_document.driver_document_id',
    'driver_document.cnh',
    'driver.driver_id'
]

const joinDriverAndInformationProjection: Array<string> = [

    'information.information_id',
    'information.starting_km',
    'information.final_km',
    'information.plate',
    'information.notes',
    'driver.driver_id'
]

export { joinDriverAndAddressProjection,
         joinDriverAndContactProjection,
         joinDriverAndDocumentProjection,
         joinDriverAndInformationProjection } 