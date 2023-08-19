import axios from 'axios';
import { API_ENDPOINT } from './envValues';

export const apiClient = axios.create({ withCredentials: true });

export const userApiBase = `${API_ENDPOINT}/user`;
