import axios from "axios";

import * as dotenv from "dotenv";

dotenv.config();

async function ip(apiUrl: any) {
  try {
    const data = await axios.get(apiUrl);
    const ipData = data.data;

    return ipData;
  } catch (e) {
    return e;
  }
}

async function ipGeoLocation(apiUrl: any) {
  try {
    const data = await axios.get(apiUrl);
    const ipData = data.data;

    return ipData;
  } catch (e) {
    return e;
  }
}

async function ipDataResponse(geoIpApiUrl: string) {
  try {
    //somente ipv4
    const ipGeoData = await ipGeoLocation(geoIpApiUrl);

    const public_ip_client_data = ipGeoData.ip;

    return { public_ip_client_data, ip_client_data_provider: ipGeoData };
  } catch (e) {
    return e;
  }
}

export async function clientMachineIp() {
  const ipApiUrl = `${process.env.USER_IP_API_URL_BASE}`;
  const userIp = await ip(ipApiUrl);
  const geoIpApiUrl = `${process.env.GEO_IP_API_URL_BASE}/${userIp}/json`;
  const ipData: any = await ipDataResponse(geoIpApiUrl);

  const dataMachine: any = ipData.ip_client_data_provider;

  return dataMachine;
}
