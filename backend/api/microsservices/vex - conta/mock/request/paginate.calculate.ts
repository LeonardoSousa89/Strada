export default function calculatePage(page: any, size: any){
    
    page = Number(page)

    if(page < 0) return page = 0
  
    if(page === 1) return page = 0
  
    if(page > 1) return page = (page * size) - size
}

