import axios from "axios";
import qs from "qs"

let data = qs.stringify({
  email: "wpsadmin@wps.com",
  password: "wpsops2019live",
});

let config = {
  maxBodyLength: Infinity,
  baseURL:
    "http://ec2-100-21-24-56.us-west-2.compute.amazonaws.com:8080/antares-backend/public/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Bearer 17|kCbWP7B6ebKNDvaRkWAJy6mzaYxI2hvveL8yBxAo",
  },
  data: data,
};

const axiosInstance = axios.create(config);

export default axiosInstance;
