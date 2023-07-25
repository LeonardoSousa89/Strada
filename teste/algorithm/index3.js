//exemplo de código para consulta de cep
const url = `https://brasilapi.com.br/api/cep/v2/${req.query.cep}`
  
try{
  
    const request = await axios.get(url)
    const response = await request.data
  
    return res.status(200).json(response)
}catch(e){
  
    return res.status(404).json(e)
}
  