import axios from "axios";
import { HTTP } from "../http";

export default class Http implements HTTP {
  async Get(url: string) {
    const response = await axios.get(url);
    return response.data;
  }
  async Delete(url: string) {
    const response = await axios.delete(url);
    return response.data;
  }
  async Post(url: string, data: Object) {
    const response = await axios.post(url, data);
    return response.data;
  }
  async Put(url: string, data: Object) {
    const response = await axios.put(url, data);
    return response.data;
  }
}
