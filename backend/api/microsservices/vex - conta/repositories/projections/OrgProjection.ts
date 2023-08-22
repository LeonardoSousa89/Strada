const orgProjection: Array<string> = [

    'org.org_id',
    'org.fantasy_name',
    'org.corporate_name',
    'org.cnpj',
    'org.org_status',
    'org.cnae_main_code',
    'org.open_date',
    'org.cnae_main_description',
    'org.sector',
    'org.created_at AS account_created_at'
]

const orgAddressProjection: Array<string> = [

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

const orgContactProjection: Array<string> = [

    'org_contact.org_contact_id',
    'org_contact.ddd',
    'org_contact.telephone',
    'org_contact.email'
]

const orgIpDataProviderProjection: Array<string> = [
    'org_ip_data_provider.org_ip_data_provider_id',
    'org_ip_data_provider.ip AS public_client_ip',
    'org_ip_data_provider.hostname',
    'org_ip_data_provider.city',
    'org_ip_data_provider.region',
    'org_ip_data_provider.country',
    'org_ip_data_provider.loc',
    'org_ip_data_provider.org AS provider',
    'org_ip_data_provider.postal',
    'org_ip_data_provider.timezone',
    'org_ip_data_provider.readme'
]

export { orgProjection,
         orgAddressProjection,
         orgContactProjection,
         orgIpDataProviderProjection } 