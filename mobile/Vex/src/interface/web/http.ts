export interface HTTP {
  Get(url: string): any;
  Delete(url: string): any;
  Post(url: string, data: Object): any;
  Put(url: string, data: Object): any;
}
