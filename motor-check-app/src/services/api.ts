import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'http://26.190.140.131:3333',
});

api.interceptors.request.use(
  async config => {

    const token = await AsyncStorage.getItem('@token');

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);