import axios from "axios";

const url1 = 'http://localhost:8765/org/join/data?org_id=46'
const url2 = 'http://localhost:8765/org/driver/information/save'

/**
 * 
 * neste momento foi testado a carga suportada atual pela api,
 * 40 requisições/s de leitura e gravação diretos no banco de
 * dados, com a inserção do banco de caching, seu suporte, 
 * disponibilidade e velocidade, aumentaram consideravelmente.
 * 
 * dependendo dos testes atuais o app já possui capacidade para atender
 * entre 2 a 5 empresas pequenas de logística com o módulo de checklist 
 */

// 20 requisições/s, comunicação direta com o banco de dados [leitura]
export function loadDataTest() {
   

   const request =  setInterval(async ()=>{

        const org1  = await axios.get(url1)
        const org2  = await axios.get(url1)    
        const org3  = await axios.get(url1)    
        const org4  = await axios.get(url1)    
        const org5  = await axios.get(url1)    
        const org6  = await axios.get(url1)    
        const org7  = await axios.get(url1)    
        const org8  = await axios.get(url1)    
        const org9  = await axios.get(url1)    
        const org10 = await axios.get(url1)    

        const org11  = await axios.get(url1)
        const org12  = await axios.get(url1)    
        const org13  = await axios.get(url1)    
        const org14  = await axios.get(url1)    
        const org15  = await axios.get(url1)    
        const org16  = await axios.get(url1)    
        const org17  = await axios.get(url1)    
        const org18  = await axios.get(url1)    
        const org19  = await axios.get(url1)    
        const org20  = await axios.get(url1)    


        return{
            requestTest: {
                data: {
                    org1: org1.status, 
                    org2: org2.status, 
                    org3: org3.status, 
                    org4: org4.status, 
                    org5: org5.status, 
                    org6: org6.status, 
                    org7: org7.status, 
                    org8: org8.status, 
                    org9: org9.status, 
                    org10: org10.status,
                    org11: org11.status, 
                    org12: org12.status, 
                    org13: org13.status, 
                    org14: org14.status, 
                    org15: org15.status, 
                    org16: org16.status, 
                    org17: org17.status, 
                    org18: org18.status, 
                    org19: org19.status, 
                    org20: org20.status 
                }
            }
        }
    }, 1000)
    

    return request
}

// 20 requisições/s direto do banco de dados [gravação]
export function loadDataTest2() {


    const request =  setInterval(async ()=>{
        
         const data1 = {

            starting_km: "89568",
            final_km: null,
            plate:"rdn-7d95",
            notes:"**"
         }

         const data2 = {

            starting_km: null,
            final_km: "98568",
            plate:"rdn-7d95",
            notes:"pneu careca!"
         }

         const org1   = await axios.post(url2, data1)
         const org11  = await axios.post(url2, data2)
         const org2   = await axios.post(url2, data1)    
         const org12  = await axios.post(url2, data2)    
         const org3   = await axios.post(url2, data1)    
         const org13  = await axios.post(url2, data2)    
         const org4   = await axios.post(url2, data1)    
         const org14  = await axios.post(url2, data2)    
         const org5   = await axios.post(url2, data1)    
         const org15  = await axios.post(url2, data2)    
         
         const org6   = await axios.post(url2, data1)    
         const org16  = await axios.post(url2, data2)    
         const org7   = await axios.post(url2, data1)    
         const org17  = await axios.post(url2, data2)    
         const org8   = await axios.post(url2, data1)    
         const org18  = await axios.post(url2, data2)    
         const org9   = await axios.post(url2, data1)    
         const org19  = await axios.post(url2, data2)    
         const org10  = await axios.post(url2, data1)    
         const org20  = await axios.post(url2, data2)    
 
 
         
         return{
             requestTest: {
                 data: {
                     org1: org1.status, 
                     org2: org2.status, 
                     org3: org3.status, 
                     org4: org4.status, 
                     org5: org5.status, 
                     org6: org6.status, 
                     org7: org7.status, 
                     org8: org8.status, 
                     org9: org9.status, 
                     org10: org10.status,
                     org11: org11.status, 
                     org12: org12.status, 
                     org13: org13.status, 
                     org14: org14.status, 
                     org15: org15.status, 
                     org16: org16.status, 
                     org17: org17.status, 
                     org18: org18.status, 
                     org19: org19.status, 
                     org20: org20.status 
                 }
             }
         }
     }, 1000)
     
 
     return request
 }
