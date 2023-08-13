import axios from 'axios';
import { apiUrl } from './envValues';

export const apiClient = axios.create({ withCredentials: true });

export const userApiBase = `${apiUrl}/user`;
