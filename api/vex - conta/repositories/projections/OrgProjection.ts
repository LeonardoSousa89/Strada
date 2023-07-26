const organizationProjection: Array<string> = [

    'org.org_id',
    'org.fantasy_name',
    'org.corporate_name',
    'org.cnpj',
    'org.org_status',
    'org.cnae_main_code',
    'org.open_date'
]

const joinOrgAndAddressProjection: Array<string> = [

    'org_address.org_address_id',
    'org_address.zip_code',
    'org_address.street_type',
    'org_address.public_place',
    'org_address.org_number',
    'org_address.complement',
    'org_address.neighborhood',
    'org_address.county',
    'org_address.country'
]

const joinOrgAndContactProjection: Array<string> = [

    'org_contact.org_contact_id',
    'org_contact.ddd',
    'org_contact.telephone',
    'org_contact.email'
]

const joinOrgAndDriverProjection: Array<string> = [

    'driver.driver_id',
    'driver.first_name',
    'driver.last_name',
    'driver.email'
]

export { organizationProjection,
         joinOrgAndAddressProjection, 
         joinOrgAndContactProjection,
         joinOrgAndDriverProjection } 