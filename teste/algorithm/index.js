const http=require('http')
const https=require('https')

//mercado bahia (18136807000111)
//dl cargo IOS (07073589000369)
//dl cargo SAO (07073589000440)
//concept cargo SAO end1 (43756788000173)
//concept cargo SAO end2 (50131921000161)
//handytech SSA (00904969000278)
//livetech SSA (05917486000817)
//polo logística (09572902000177)
//solutis SSA, Caminho das Arvores (12023465000147)
//solutis SSA, Comercio (12023465000570)

/**	qualquer cnpj deve ser inserido 
 * somente com números
 * */
let cnpj='43756788000173'

let url=`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`

let data=''
let empresa=[]

const formulario={
    cnpj: '',
    cnh: '000000000',
    celular: '71 996559865',
    nome: 'Leonardo',
    sobrenome: 'dos Santos Sousa',
    email: 'leoDev89@gmail.com',
    senha: 1234,
    confirmar_senha: 1234
}

https.get(url, (res)=>{

    res.on('data', (chunk)=>{
        
        data += chunk
    })

    res.on('end', ()=>{

        let dadosEmpresariais=JSON.parse(data)
        
        formulario.cnpj=dadosEmpresariais
        
        empresa.push(formulario)

        console.log(empresa)
    })

}).on('error', (e)=>{

    console.log('error: ' + e.message)
})

/**
 * referências: 
 * 
 * https://www.twilio.com/pt-br/blog/5-formas-de-fazer-chamadas-http-em-node-js-usando-async-await
 * https://www.youtube.com/watch?v=BE6LhjGIfrE&t=41s
 * https://apiconsultacnpj.com.br/
 * http://cnpj.info/
 * http://cnpj.info/busca
 * */