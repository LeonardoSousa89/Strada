/**
 *  referência: 
 *  https://www.youtube.com/watch?v=avUCPbWppgQ
 */

/**
  expressão matemática para cálculo da paginação
  
  x = page 
  y = size
  
  x > 1 | x = (x * y) - y
**/ 
export default function calculatePage(page: any, size: any) {
  page = Number(page);

  if (page < 0) return (page = 0);

  if (page === 1) return (page = 0);

  if (page > 1) return (page = page * size - size);
}
