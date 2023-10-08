import axios from "axios";

export async function ip(apiUrl: any) {
  try {
    const data = await axios.get(apiUrl);
    const ipData = data.data;

    return ipData;
  } catch (e) {
    return e;
  }
}

export async function ipGeoLocation(apiUrl: any) {
  try {
    const data = await axios.get(apiUrl);
    const ipData = data.data;

    return ipData;
  } catch (e) {
    return e;
  }
}

export async function ipDataResponse(geoIpApiUrl: string) {
  try {
    
    //somente ipv4
    const ipGeoData = await ipGeoLocation(geoIpApiUrl);

    const public_ip_client_data = ipGeoData.ip
    
    return{ public_ip_client_data, ip_client_data_provider: ipGeoData }
  } catch (e) {
    return e;
  }
}
