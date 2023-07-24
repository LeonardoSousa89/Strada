export interface DbOperations {

    save(): void  
    update(id: number | string): void
    getAll(): any  
    getById(id: number | string): any
    deleteById(id: number | string): void,
}

export interface Verifications {
    
    verify(): any
}