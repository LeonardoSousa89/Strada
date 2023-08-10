export interface DbOperations {

    save(): void  
    update(): void
    getAll(): any  
    getById(): any
    deleteAll(): void
    deleteById(): void
}

export interface Verifications {
    
    verify(): any
}