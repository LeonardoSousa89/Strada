export interface DbOperations {
  save(): void;
  update(): void;
  getAll(): any;
  getById(): any;
  deleteAll(): void;
  deleteById(): void;
}

export interface Verifications {
  verify(): any;
}

export interface CacheOperations {
  connection(): any;
  disconnection(): any;
  setCache(key?: any, value?: any, expiration?: any): any;
  getCache(key?: any): any;
}
