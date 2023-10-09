import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://django-env.eba-3dy6hujz.eu-west-3.elasticbeanstalk.com",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  timeout: 10000,
});

const requestSuccessInterceptor = async (config) => {
  const authToken = await AsyncStorage.getItem("auth_token");
  if (authToken) {
    config.headers.Authorization = "Token " + authToken;
  }
  return config;
};

api.interceptors.request.use(requestSuccessInterceptor);

export { api };
