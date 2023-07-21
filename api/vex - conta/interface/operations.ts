export interface DbOperations {

    save(): void  
    update(id: number | string): void
    getAll(): any  
    getById(id: number | string): any
    deleteByid(id: number | string): void,
}

export interface Verifications {
    
    verify(elementToBeVerified?: any, 
           elementInDatabase?: any, 
           table?: any, 
           url?: string,
           callback?: any): any
           
}