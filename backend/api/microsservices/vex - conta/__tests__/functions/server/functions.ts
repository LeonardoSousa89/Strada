import knex from '../../../repositories/knex/knex'

export function testDeleteByTimeInformation(){

    const time = setInterval(()=> console.log('time'), 3000)

    return time
}