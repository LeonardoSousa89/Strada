const joinOrgAndAddressRelationProjection: Array<string> = [
    'org_address_relation_table.org_address_relation_table_id',
    'org_address_relation_table.org_address_relation_id',
    'org_address_relation_table.org_relation_id'
]

const joinOrgAndContactRelationProjection: Array<string> = [
    'org_contact_relation_table.org_contact_relation_table_id',
    'org_contact_relation_table.org_contact_relation_id',
    'org_contact_relation_table.org_relation_id'
]

const joinOrgAndOrgIpDataProviderRelationProjection: Array<string> = [
    'org_ip_data_provider_relation_table.org_ip_data_provider_relation_table_id',
    'org_ip_data_provider_relation_table.org_ip_data_provider_relation_id',
    'org_ip_data_provider_relation_table.org_relation_id'
]

const joinOrgAndDriverRelationProjection: Array<string> = [
    'org_driver_relation_table.org_driver_relation_table_id',
    'org_driver_relation_table.driver_relation_id',
    'org_driver_relation_table.org_relation_id'
]

const joinDriverAndAddressRelationProjection: Array<string> = [
    'driver_address_relation_table.driver_address_relation_table_id',
    'driver_address_relation_table.driver_address_relation_id',
    'driver_address_relation_table.driver_relation_id',
    'driver_address_relation_table.org_relation_id'
]

const joinDriverAndContactRelationProjection: Array<string> = [
    'driver_contact_relation_table.driver_contact_relation_table_id',
    'driver_contact_relation_table.driver_contact_relation_id',
    'driver_contact_relation_table.driver_relation_id',
    'driver_contact_relation_table.org_relation_id'
]

const joinDriverAndDocumentRelationProjection: Array<string> = [
    'driver_document_relation_table.driver_document_relation_table_id',
    'driver_document_relation_table.driver_document_relation_id',
    'driver_document_relation_table.driver_relation_id',
    'driver_document_relation_table.org_relation_id'
]

const joinDriverAndInformationRelationProjection: Array<string> = [
    'driver_information_relation_table.driver_information_relation_table_id',
    'driver_information_relation_table.driver_relation_id',
    'driver_information_relation_table.information_relation_id',
    'driver_information_relation_table.org_relation_id'
]

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
    'information.date_time_registry',
    'driver.driver_id'
]

export { joinOrgAndAddressRelationProjection,
         joinOrgAndContactRelationProjection,
         joinOrgAndDriverRelationProjection,
         joinOrgAndOrgIpDataProviderRelationProjection,
         joinDriverAndAddressRelationProjection,
         joinDriverAndContactRelationProjection,
         joinDriverAndDocumentRelationProjection,
         joinDriverAndInformationRelationProjection,
         joinDriverAndAddressProjection,
         joinDriverAndContactProjection,
         joinDriverAndDocumentProjection,
         joinDriverAndInformationProjection } 