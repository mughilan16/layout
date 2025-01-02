import axios from "axios";

export const getConfig = () => {
  const token = "";
  if (!token) {
    return undefined;
  }
  const config = {
    iaxBodyLength: Infinity,
    baseURL:
      "http://ec2-100-21-24-56.us-west-2.compute.amazonaws.com:8080/antares-backend/public/api/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token,
    }
  }
  return axios.create(config);
}
